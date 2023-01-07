import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt.auth.guard';
import { AddOrderDto } from '../dto/addOrder.dto';
import { OrdersService } from '../service/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addOrder(@Body() newOrder: AddOrderDto, @Req() req) {
    return this.ordersService.addOrder(newOrder, req.user);
  }
}
