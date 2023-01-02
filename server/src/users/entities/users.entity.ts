import { Column, Entity } from 'typeorm';
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
}
