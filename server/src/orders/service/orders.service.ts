// src/orders/service/orders.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm'; // 👈 agrega In si usás la variante 2 pasos

import { ProductsEntity } from 'src/products/entities/products.entity';
import { AddOrderDto } from '../dto/addOrder.dto';
import { OrdersEntity } from '../entities/orders.entity';
import { OrdersDetailsEntity } from '../entities/ordersDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private orderRepository: Repository<OrdersEntity>,

    @InjectRepository(OrdersDetailsEntity)
    private orderDetailRepository: Repository<OrdersDetailsEntity>,

    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
  ) {}

  async getAllOrders() {
    return await this.orderRepository.find({
      relations: ['user', 'orderDetails'],
    });
  }

  // ✅ Versión simple y eficiente: trae todo en una sola consulta
  async getMyOrders(user: any) {
    const userId = user?.id ?? user?.sub ?? user?.userId;
    if (!userId) {
      throw new HttpException('User id not found in token', HttpStatus.UNAUTHORIZED);
    }

    return this.orderRepository.find({
      where: { user: { id: String(userId) } },
      relations: ['orderDetails', 'orderDetails.product'], // agrega 'user' si querés
      order: { createdAt: 'DESC' } as any,
    });
  }

  async addOrder(order: AddOrderDto, { id: userId }) {
    let total = 0;

    for await (const orderDetail of order.orderDetails) {
      const productFound = await this.productRepository.findOne({
        where: { id: String(orderDetail.product) } as any,
      });
      if (!productFound) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      if (orderDetail.amount < 1) {
        throw new HttpException('Amount is not valid', HttpStatus.CONFLICT);
      }
      total += orderDetail.amount * Number(productFound.price);
    }

    let newOrder = this.orderRepository.create();
    newOrder.Total = total;
    newOrder.user = ({ id: String(userId) } as unknown) as any;
    newOrder.status = 'pending_payment';
    newOrder = await this.orderRepository.save(newOrder);

    const createOrderDetail = async ({
      amount,
      note,
      product,
    }: {
      amount: number;
      note?: string;
      product: string | number;
    }) => {
      const productFound = await this.productRepository.findOne({
        where: { id: String(product) } as any,
      });
      if (!productFound) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      const newOrderDetail = this.orderDetailRepository.create();
      newOrderDetail.amount = amount;
      newOrderDetail.note = note || undefined;
      newOrderDetail.nameProduct = productFound.name;
      newOrderDetail.product = productFound;
      newOrderDetail.order = newOrder;
      newOrderDetail.subtotal = Number(productFound.price) * amount;

      return await this.orderDetailRepository.save(newOrderDetail);
    };

    const orderDetails = await Promise.all(
      order.orderDetails.map((od) => createOrderDetail(od)),
    );

    return { newOrder, orderDetails };
  }

  async attachPreference(orderId: string | number, prefId: string) {
    await this.orderRepository.update(String(orderId) as any, {
      preferenceId: prefId,
    });
  }

  async updateStatus(orderId: string | number, nextStatus: OrdersEntity['status']) {
    const order = await this.orderRepository.findOne({
      where: { id: String(orderId) } as any,
    });
    if (!order) throw new NotFoundException('Order not found');

    await this.orderRepository.update(order.id as any, { status: nextStatus });
    return { id: order.id, status: nextStatus };
  }

  async getOne(orderId: string | number) {
    const order = await this.orderRepository.findOne({
      where: { id: String(orderId) } as any,
      relations: ['orderDetails', 'orderDetails.product', 'user'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
