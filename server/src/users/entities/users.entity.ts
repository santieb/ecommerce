import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { User } from '../../interfaces/user.interface';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements User {
  @Column()
  firstName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;
}
