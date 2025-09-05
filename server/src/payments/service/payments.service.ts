import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Injectable()
export class PaymentsService {
  constructor() {
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN_SANDBOX, // guardalo en tu .env
    });
  }

  async createPreference(products: any[]) {
    const items = products.map(p => ({
      title: p.name,
      unit_price: p.price,
      quantity: p.quantity ?? 1,
    }));

    const preference = {
      items,
      back_urls: {
        success: 'http://localhost:3001/success',
        failure: 'http://localhost:3001/failure',
        pending: 'http://localhost:3001/pending',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    return response.body;
  }
}
