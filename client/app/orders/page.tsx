'use client';
import { useEffect, useState } from 'react';

type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'payment_failed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

type Order = {
  id: string | number;
  status: OrderStatus;
  Total?: number;
  preferenceId?: string | null;
};

const ENV_API = process.env.NEXT_PUBLIC_API_BASE;
// relativo por defecto para evitar CORS en prod
const API = ENV_API ?? '/api';
const token = () =>
  (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

// helper: solo incluye credentials si es same-origin
function buildFetchOpts(tok: string | null) {
  const headers: Record<string, string> = {};
  if (tok) headers.Authorization = `Bearer ${tok}`;

  let withCreds = false;
  if (typeof window !== 'undefined') {
    try {
      const apiUrl = API.startsWith('http')
        ? new URL(API)
        : new URL(API, window.location.origin);
      withCreds = apiUrl.origin === window.location.origin;
    } catch {
      withCreds = false;
    }
  }

  return {
    headers,
    ...(withCreds ? { credentials: 'include' as const } : {}),
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const tok = token();
      const opts = buildFetchOpts(tok);
      const res = await fetch(`${API}/orders/myorders`, opts);

      if (!res.ok) {
        console.warn('GET /orders/myorders -> HTTP', res.status);
        setOrders([]);
        return;
        }
      
      const data = (await res.json()) as Order[];
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching /orders/myorders:', e);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const payNow = async (orderId: string | number) => {
    try {
      const tok = token();
      const opts = buildFetchOpts(tok);
      const res = await fetch(`${API}/payments/from-order/${orderId}`, {
        method: 'POST',
        ...opts,
      });
      if (!res.ok) {
        alert('No se pudo iniciar el pago');
        return;
      }
      const pref = await res.json();
      const url = pref?.sandbox_init_point ?? pref?.init_point;
      if (!url) return alert('No se pudo iniciar el pago');
      window.location.href = url;
    } catch (e) {
      console.error('Error creando preferencia de pago:', e);
      alert('No se pudo iniciar el pago');
    }
  };

  // (opcional) map de colorcitos por estado
  const statusClasses: Record<OrderStatus, string> = {
    pending_payment: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    paid: 'bg-green-50 text-green-700 border-green-200',
    payment_failed: 'bg-red-50 text-red-700 border-red-200',
    processing: 'bg-blue-50 text-blue-700 border-blue-200',
    shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-gray-50 text-gray-700 border-gray-200',
    refunded: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Mis pedidos</h1>
      {loading && <p className="mt-4 text-gray-500">Cargando…</p>}
      <div className="mt-6 space-y-3">
        {orders.map((o) => (
          <div
            key={String(o.id)}
            className="border rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">Pedido #{String(o.id)}</div>
              <div className="mt-1 text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded border ${statusClasses[o.status]}`}
                >
                  {o.status}
                </span>
              </div>
              {o.Total != null && (
                <div className="text-sm text-gray-600 mt-1">
                  Total: ${o.Total}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {o.status === 'pending_payment' ? (
                <button
                  onClick={() => payNow(o.id)}
                  className="px-3 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                  Pagar ahora
                </button>
              ) : (
                <a
                  href={`/orders/${o.id}`}
                  className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                >
                  Ver seguimiento
                </a>
              )}
            </div>
          </div>
        ))}
        {!loading && orders.length === 0 && (
          <p className="text-gray-500">No tenés pedidos todavía.</p>
        )}
      </div>
    </div>
  );
}
