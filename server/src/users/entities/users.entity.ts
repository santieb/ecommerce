import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { User } from '../../interfaces/user.interface';
import { ROLES } from '../../interfaces/roles';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements User {
  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;
}