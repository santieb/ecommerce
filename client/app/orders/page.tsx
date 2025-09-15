'use client';
import { useEffect, useRef, useState } from 'react';

type OrderStatus = 'paid' | 'payment_failed' | 'in_preparation' | 'on_the_way' | 'delivered';

type Order = {
  id: string | number;
  status: OrderStatus | 'pending_payment';
  Total?: number;
  preferenceId?: string | null;
};

const API = process.env.NEXT_PUBLIC_API_BASE ?? '/api';
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

function buildFetchOpts(tok: string | null) {
  const headers: Record<string, string> = { 'ngrok-skip-browser-warning': '1' };
  if (tok) headers.Authorization = `Bearer ${tok}`;

  let withCreds = false;
  if (typeof window !== 'undefined') {
    try {
      const apiUrl = API.startsWith('http') ? new URL(API) : new URL(API, window.location.origin);
      withCreds = apiUrl.origin === window.location.origin;
    } catch {
      withCreds = false;
    }
  }

  return {
    headers,
    ...(withCreds ? { credentials: 'include' as const } : {}),
    cache: 'no-store' as const,
  };
}

const LABEL: Record<OrderStatus | 'pending_payment', string> = {
  pending_payment: 'Pendiente de pago',
  paid: 'Pago recibido',
  payment_failed: 'Pago rechazado',
  in_preparation: 'En preparación',
  on_the_way: 'En camino',
  delivered: 'Entregado',
};

const BADGE: Record<OrderStatus | 'pending_payment', string> = {
  pending_payment:
    'bg-yellow-50 text-yellow-700 border border-yellow-200 ring-1 ring-yellow-100',
  paid:
    'bg-green-50 text-green-700 border border-green-200 ring-1 ring-green-100',
  payment_failed:
    'bg-red-50 text-red-700 border border-red-200 ring-1 ring-red-100',
  in_preparation:
    'bg-blue-50 text-blue-700 border border-blue-200 ring-1 ring-blue-100',
  on_the_way:
    'bg-indigo-50 text-indigo-700 border border-indigo-200 ring-1 ring-indigo-100',
  delivered:
    'bg-emerald-50 text-emerald-700 border border-emerald-200 ring-1 ring-emerald-100',
};

const fmtARS = (n?: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(
    Number.isFinite(n as number) ? (n as number) : 0,
  );

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const poll = useRef<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const tok = getToken();
      const opts = buildFetchOpts(tok);
      const res = await fetch(`${API}/orders/myorders?ts=${Date.now()}`, opts);
      if (!res.ok) {
        setOrders([]);
        return;
      }
      const data = (await res.json()) as Order[];
      const sorted = (Array.isArray(data) ? data : []).sort((a, b) =>
        String(b.id).localeCompare(String(a.id)),
      );
      setOrders(sorted);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    const start = () => {
      if (poll.current) return;
      poll.current = window.setInterval(() => {
        if (document.visibilityState === 'visible') load();
      }, 5000);
    };
    const stop = () => {
      if (poll.current) {
        window.clearInterval(poll.current);
        poll.current = null;
      }
    };

    start();
    const vis = () => (document.visibilityState === 'visible' ? start() : stop());
    document.addEventListener('visibilitychange', vis);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);

  const payNow = async (orderId: string | number) => {
    try {
      const tok = getToken();
      const res = await fetch(`${API}/payments/from-order/${orderId}`, {
        method: 'POST',
        ...buildFetchOpts(tok),
      });
      if (!res.ok) {
        alert('No se pudo iniciar el pago');
        return;
      }
      const pref = await res.json();
      const url = pref?.sandbox_init_point ?? pref?.init_point;
      if (!url) {
        alert('No se pudo iniciar el pago');
        return;
      }
      window.location.href = url;
    } catch {
      alert('No se pudo iniciar el pago');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Mis pedidos</h1>

      {loading && (
        <div className="mt-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white border rounded-2xl p-4 shadow-sm"
            >
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="mt-3 h-3 w-24 bg-gray-200 rounded" />
              <div className="mt-3 h-3 w-32 bg-gray-200 rounded" />
              <div className="mt-4 h-9 w-28 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="mt-6 space-y-3">
          {orders.map((o) => (
            <div
              key={String(o.id)}
              className="bg-white border rounded-2xl p-4 shadow-sm flex items-center justify-between"
            >
              <div className="min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  Pedido #{String(o.id)}
                </div>
                <div className="mt-2 text-sm">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ${BADGE[o.status]}`}>
                    <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                    {LABEL[o.status]}
                  </span>
                </div>
                {o.Total != null && (
                  <div className="text-sm text-gray-600 mt-2">
                    Total: {fmtARS(o.Total)}
                  </div>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                {o.status === 'pending_payment' ? (
                  <button
                    onClick={() => payNow(o.id)}
                    className="px-3 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 active:bg-orange-800 shadow-sm"
                  >
                    Pagar ahora
                  </button>
                ) : (
                  <a
                    href={`/orders/${o.id}`}
                    className="px-3 py-2 rounded-xl border font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Ver seguimiento
                  </a>
                )}
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-gray-500">No tenés pedidos todavía.</p>
          )}
        </div>
      )}
    </div>
  );
}
