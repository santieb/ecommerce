import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { RolesGuard } from 'src/users/helpers/role.guard';
import { JwtAuthGuard } from '../../users/helpers/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('myorders')
  myOrders(@Req() req) {
    return this.ordersService.getMyOrders(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  allOrders() {
    return this.ordersService.getAllOrders();
  }
}
