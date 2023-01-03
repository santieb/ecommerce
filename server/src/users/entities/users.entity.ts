import { OrdersEntity } from 'src/orders/entities/orders.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];
}
