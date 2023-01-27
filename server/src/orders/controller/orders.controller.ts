import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
<<<<<<< HEAD
=======
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
<<<<<<< HEAD
>>>>>>> 5bf39710b24e88a0852003b3d11d5960678e94e3
import { JwtAuthGuard } from 'src/users/jwt.auth.guard';
=======
import { RolesGuard } from 'src/users/helpers/role.guard';
import { JwtAuthGuard } from '../../users/helpers/jwt-auth.guard';
>>>>>>> 3f7e1e3a7bfb04667234a1dfac2d5eef4e6306c9
import { AddOrderDto } from '../dto/addOrder.dto';
import { OrdersService } from '../service/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addOrder(@Body() newOrder: AddOrderDto, @Req() req) {
    return this.ordersService.addOrder(newOrder, req.user);
<<<<<<< HEAD
=======
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
>>>>>>> 5bf39710b24e88a0852003b3d11d5960678e94e3
  }
}
