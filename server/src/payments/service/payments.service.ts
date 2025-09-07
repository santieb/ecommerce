// src/payments/service/payments.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentsService {
  private preference: Preference;

  constructor(private readonly config: ConfigService) {
    const client = new MercadoPagoConfig({
      accessToken: this.config.get<string>('MP_ACCESS_TOKEN_SANDBOX')!, // tu TEST access token
    });
    this.preference = new Preference(client);
  }

  async createPreference(products: any[]) {
    const items = products.map((p: any, idx: number) => ({
      id: `sku-${idx + 1}`,
      title: p.name,
      quantity: Number(p.quantity ?? 1),
      unit_price: Number(p.price),
      currency_id: 'ARS',
    }));

    const pref = await this.preference.create({
      body: {
        items,
        binary_mode: true,
        payment_methods: {
          excluded_payment_types: [
            { id: 'ticket' },
            { id: 'atm' },
          ],
          installments: 1,
          default_installments: 1,
        },
        back_urls: {
          success: 'https://b46bc20757e5.ngrok-free.app/success',
          failure: 'https://b46bc20757e5.ngrok-free.app/failure',
          pending: 'https://b46bc20757e5.ngrok-free.app/pending',
        },
        auto_return: 'approved',
      },
    });

    return pref; 
  }
}
