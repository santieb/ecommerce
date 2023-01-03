import { Controller, Get } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  helloWorld() {
    return this.ordersService.helloWorld();
  }
}
