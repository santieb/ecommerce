'use client';
import { useEffect } from 'react';
const API = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3000/api';

export default function Success() {
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const orderId = qs.get('external_reference') || '';
    const paymentId = qs.get('payment_id') || '';
    const status = qs.get('status') || '';
    const preference_id = qs.get('preference_id') || '';

    fetch(`${API}/orders/callback?payment_id=${paymentId}&status=${status}&external_reference=${orderId}&preference_id=${preference_id}`)
      .catch(()=>{})
      .finally(() => {
        if (orderId) window.location.replace(`/orders/${orderId}`);
        else window.location.replace('/orders');
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Procesando pago…</p>
    </div>
  );
}
