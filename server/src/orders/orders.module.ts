import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controller/orders.controller';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersDetailsEntity } from './entities/ordersDetails.entity';
import { OrdersService } from './service/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity, OrdersDetailsEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
