import { UsersEntity } from '../../users/entities/users.entity';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrdersDetailsEntity } from './ordersDetails.entity';

@Entity({ name: 'orders' })
export class OrdersEntity extends BaseEntity {
  @Column()
  Total: number;

  @OneToMany(() => OrdersDetailsEntity, (orderDetails) => orderDetails.order)
  orderDetails: OrdersDetailsEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user: UsersEntity;
}
