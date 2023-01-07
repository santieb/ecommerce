import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrdersEntity } from './orders.entity';
import { ProductsEntity } from '../../products/entities/products.entity';

@Entity({ name: 'order_details' })
export class OrdersDetailsEntity extends BaseEntity {
  @Column()
  amount: number;

  @Column({ default: null })
  note: string;

  @Column()
  subtotal: number;

  @ManyToOne(() => OrdersEntity, (order) => order.orderDetails)
  order: OrdersEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.orderDetails)
  product: ProductsEntity;
}
