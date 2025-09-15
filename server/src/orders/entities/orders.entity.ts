// src/orders/entities/orders.entity.ts
import { UsersEntity } from '../../users/entities/users.entity';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrdersDetailsEntity } from './ordersDetails.entity';

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'payment_failed'
  | 'in_preparation'
  | 'on_the_way'
  | 'delivered';

@Entity({ name: 'orders' })
export class OrdersEntity extends BaseEntity {
  @Column()
  Total: number;

  @Column({ type: 'varchar', length: 32, default: 'pending_payment' })
  status: OrderStatus;

  @Column({ type: 'varchar', nullable: true })
  preferenceId: string | null;

  @Column({ type: 'varchar', nullable: true })
  paymentId: string | null;

  @OneToMany(() => OrdersDetailsEntity, (orderDetails) => orderDetails.order)
  orderDetails: OrdersDetailsEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user: UsersEntity;
}
