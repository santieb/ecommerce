// src/payments/controller/payments.controller.ts
import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from '../service/payments.service';
import { JwtAuthGuard } from 'src/users/helpers/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('from-order/:id')
  createFromOrder(@Param('id') id: string) {
    return this.paymentsService.createPreferenceFromOrder(id); // ✅ string
  }
}
