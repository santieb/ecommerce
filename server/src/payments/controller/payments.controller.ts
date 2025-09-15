import { Controller, Post, Param, UseGuards, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentsService } from '../service/payments.service';
import { JwtAuthGuard } from 'src/users/helpers/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('from-order/:id')
  createFromOrder(@Param('id') id: string) {
    return this.paymentsService.createPreferenceFromOrder(id);
  }
}
