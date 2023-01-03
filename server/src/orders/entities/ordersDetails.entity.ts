import { ProductsEntity } from 'src/products/entities/products.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'order_details' })
export class OrdersDetailsEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  subtotal: number;

  @ManyToOne(() => OrdersEntity, (order) => order.orderDetails)
  order: OrdersEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.orderDetails)
  product: OrdersEntity;
}
