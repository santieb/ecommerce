// src/orders/controller/orders.controller.ts (agregar endpoint)
import { Body, Controller, Post, UseGuards, Req, Get, Patch, Param } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { JwtAuthGuard } from 'src/users/helpers/jwt-auth.guard';
import { RolesGuard } from 'src/users/helpers/role.guard';
import { AddOrderDto } from '../dto/addOrder.dto';
import { OrderStatus } from '../entities/orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addOrder(@Body() newOrder: AddOrderDto, @Req() req) {
    return this.ordersService.addOrder(newOrder, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  setStatus(@Param('id') id: string, @Body() body: { status: OrderStatus }) {
    return this.ordersService.updateStatus(id, body.status);
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
