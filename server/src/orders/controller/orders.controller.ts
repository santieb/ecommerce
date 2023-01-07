import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
<<<<<<< HEAD
=======
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
>>>>>>> 5bf39710b24e88a0852003b3d11d5960678e94e3
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
<<<<<<< HEAD
=======
  }

  @UseGuards(JwtAuthGuard)
  @Get('myorders')
  myOrders(@Req() req) {
    return this.ordersService.getMyOrders(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  allOrders() {
    return this.ordersService.getAllOrders();
>>>>>>> 5bf39710b24e88a0852003b3d11d5960678e94e3
  }
}
