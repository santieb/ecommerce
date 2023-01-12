import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
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

  async getMyOrders({ id: userId }) {
    const orders = await this.orderRepository
      .createQueryBuilder('orders')
      .where('orders.user = :id', { id: userId })
      .getMany();

    const orderWithDetails = [];
    for (const order of orders) {
      const orderDetail = await this.orderDetailRepository
        .createQueryBuilder('order_details')
        .where('order_details.order = :id', { id: order.id })
        .getMany();

      order.orderDetails = orderDetail;
      orderWithDetails.push(order);
    }

    return orderWithDetails;
  }

  async addOrder(order: AddOrderDto, { id: userId }) {
    let total = 0;

    for await (const orderDetail of order.orderDetails) {
      const productFound = await this.productRepository.findOne({
        where: { id: orderDetail.product },
      });
      if (!productFound)
        return new HttpException(
          'Product already exists',
          HttpStatus.NOT_FOUND,
        );
      if (orderDetail.amount < 1)
        return new HttpException('Amount is not valid', HttpStatus.CONFLICT);

      total = total + orderDetail.amount * productFound.price;
    }

    let newOrder = this.orderRepository.create();
    newOrder.Total = total;
    newOrder.user = userId;
    newOrder = await this.orderRepository.save(newOrder);

    const createOrderDetail = async ({ amount, note, product }) => {
      const productFound = await this.productRepository.findOne({
        where: { id: product },
      });

      const newOrderDetail = this.orderDetailRepository.create();
      newOrderDetail.amount = amount;
      newOrderDetail.note = note || undefined;
      newOrderDetail.nameProduct = productFound.name;
      newOrderDetail.product = product;
      newOrderDetail.order = newOrder;
      newOrderDetail.subtotal = productFound.price * amount;

      return await this.orderDetailRepository.save(newOrderDetail);
    };

    const orderDetails = await Promise.all(
      order.orderDetails.map((orderDetail) => createOrderDetail(orderDetail)),
    );

    return { newOrder, orderDetails };
  }
}
