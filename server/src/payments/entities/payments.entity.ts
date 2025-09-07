import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn, UpdateDateColumn, Index
} from 'typeorm';
import { OrdersEntity } from '../../orders/entities/orders.entity';

export type PaymentStatus =
  | 'created'
  | 'paid'
  | 'payment_failed'
  | 'cancelled';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => OrdersEntity, () => undefined, { onDelete: 'CASCADE', nullable: false })
  @Index()
  order!: OrdersEntity;

  @Column({ type: 'varchar', nullable: true })
  preferenceId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  initPoint!: string | null;

  @Column({ type: 'varchar', nullable: true })
  sandboxInitPoint!: string | null;

  @Column({ type: 'varchar', nullable: true })
  externalReference!: string | null;

  @Column({ type: 'varchar', default: 'created' })
  status!: PaymentStatus;

  @Column({ type: 'varchar', nullable: true })
  paymentId!: string | null;

  @Column({ type: 'int', default: 0 })
  totalAmount!: number;

  @Column({ type: 'varchar', default: 'ARS' })
  currency!: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  items!: Array<{
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: string;
    orderDetailId?: string | number | null;
    orderDetailName?: string | null;
  }>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
