import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from 'src/orders/entities/orders.entity';
import { OrdersDetailsEntity } from 'src/orders/entities/ordersDetails.entity';
import { OrdersService } from 'src/orders/service/orders.service';
import { Payment } from '../entities/payments.entity';

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'payment_failed'
  | 'in_preparation'
  | 'ready'
  | 'on_the_way'
  | 'delivered';

@Injectable()
export class PaymentsService {
  private preference: Preference;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(OrdersEntity) private ordersRepo: Repository<OrdersEntity>,
    @InjectRepository(OrdersDetailsEntity) private detailsRepo: Repository<OrdersDetailsEntity>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    private readonly ordersService: OrdersService,
  ) {
    const client = new MercadoPagoConfig({
      accessToken: this.config.get<string>('MP_ACCESS_TOKEN_SANDBOX')!,
    });
    this.preference = new Preference(client);
  }

  private readonly frontendBase = 'https://a37be0797462.ngrok-free.app';

  async createPreferenceFromOrder(orderId: string | number) {
    const order = await this.ordersRepo.findOne({ where: { id: String(orderId) } as any });
    if (!order) throw new NotFoundException('Order not found');

    const details = await this.detailsRepo.find({ where: { order: { id: order.id } } });

    const items = details.map((d, idx) => {
      const qty = Math.max(1, Number(d.amount || 1));
      const unit = Math.round(Number(d.subtotal) / qty);
      return {
        id: `sku-${idx + 1}`,
        title: d.nameProduct,
        quantity: qty,
        unit_price: unit,
        currency_id: 'ARS',
      };
    });

    // Siempre redirigimos al FRONT: /orders/:id con un query ?status=...
    const success = `${this.frontendBase}/orders/${order.id}?status=approved`;
    const failure = `${this.frontendBase}/orders/${order.id}?status=rejected`;
    const pending = `${this.frontendBase}/orders/${order.id}?status=pending`;

    const pref = await this.preference.create({
      body: {
        items: items.map(({ id, title, quantity, unit_price, currency_id }) => ({
          id, title, quantity, unit_price, currency_id,
        })),
        binary_mode: true,
        payment_methods: {
          excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }],
          installments: 1,
          default_installments: 1,
        },
        back_urls: { success, failure, pending },
        auto_return: 'approved',
        external_reference: String(order.id),
      },
    });

    const payment = this.paymentRepo.create({
      order,
      preferenceId: pref.id ?? null,
      initPoint: (pref as any).init_point ?? null,
      sandboxInitPoint: (pref as any).sandbox_init_point ?? null,
      externalReference: String(order.id),
      status: 'created',
      totalAmount: items.reduce((acc, it) => acc + it.quantity * it.unit_price, 0),
      currency: 'ARS',
      items,
      paymentId: null,
    });

    await this.paymentRepo.save(payment);

    if (pref.id) {
      await this.ordersService.attachPreference(order.id, pref.id as string);
    }

    return pref;
  }

  async setPaymentResultByPreferenceId(
    preferenceId: string,
    status: 'paid' | 'payment_failed',
    paymentId?: string
  ) {
    const payment = await this.paymentRepo.findOne({ where: { preferenceId } });
    if (!payment) return;
    payment.status = status;
    if (paymentId) payment.paymentId = paymentId;
    await this.paymentRepo.save(payment);
  }
}
