// src/payments/payments.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './controller/payments.controller';
import { PaymentsService } from './service/payments.service';
import { OrdersEntity } from 'src/orders/entities/orders.entity';
import { OrdersDetailsEntity } from 'src/orders/entities/ordersDetails.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { Payment } from './entities/payments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersEntity, OrdersDetailsEntity, Payment]),
    forwardRef(() => OrdersModule),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
