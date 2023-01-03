import { Module } from '@nestjs/common';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
