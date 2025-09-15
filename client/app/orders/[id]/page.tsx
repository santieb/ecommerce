'use client';
import { useEffect, useRef, useState } from 'react';

type OrderStatus = 'paid' | 'payment_failed' | 'in_preparation' | 'on_the_way' | 'delivered';

const LABEL: Record<OrderStatus, string> = {
  paid: 'Pago recibido',
  payment_failed: 'Pago rechazado',
  in_preparation: 'En preparación',
  on_the_way: 'En camino',
  delivered: 'Entregado',
};

const STEPS: OrderStatus[] = ['paid', 'in_preparation', 'on_the_way', 'delivered'];

const API = process.env.NEXT_PUBLIC_API_BASE ?? '/api';
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

function buildFetchOpts(token: string | null) {
  const headers: Record<string, string> = { 'ngrok-skip-browser-warning': '1' };
  if (token) headers.Authorization = `Bearer ${token}`;

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

type OrderDetail = {
  id: string | number;
  nameProduct: string;
  amount: number;
  subtotal: number;
};
type OrderDto = {
  id: string | number;
  status: OrderStatus;
  Total?: number;
  orderDetails?: OrderDetail[];
  paymentId?: string | null;
  preferenceId?: string | null;
};

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [patching, setPatching] = useState(false);
  const poll = useRef<number | null>(null);
  const patchedOnce = useRef(false);

  const patchStatusFromQueryParams = async () => {
    if (typeof window === 'undefined' || patchedOnce.current) return;
    const qs = new URLSearchParams(window.location.search);
    const mpStatus = qs.get('status');
    if (!mpStatus) return;

    const map: Record<string, OrderStatus | undefined> = {
      approved: 'paid',
      rejected: 'payment_failed',
      pending: undefined,
    };
    const next = map[mpStatus];
    if (!next) {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
      patchedOnce.current = true;
      return;
    }

    const token = getToken();
    setPatching(true);
    try {
      await fetch(`${API}/orders/${params.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '1',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: next }),
      });
    } catch {}
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
    patchedOnce.current = true;
    setPatching(false);
  };

  const load = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const opts = buildFetchOpts(token);
      const res = await fetch(`${API}/orders/myorders?ts=${Date.now()}`, opts);
      if (!res.ok) {
        setOrder(null);
        return;
      }
      const list = (await res.json()) as OrderDto[];
      const current = list.find((o) => String(o.id) === String(params.id)) ?? null;
      setOrder(current);
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await patchStatusFromQueryParams();
      await load();
    })();

    const startPolling = () => {
      if (poll.current) return;
      poll.current = window.setInterval(() => {
        if (document.visibilityState === 'visible') load();
      }, 5000);
    };
    const stopPolling = () => {
      if (poll.current) {
        window.clearInterval(poll.current);
        poll.current = null;
      }
    };

    startPolling();
    const vis = () => (document.visibilityState === 'visible' ? startPolling() : stopPolling());
    document.addEventListener('visibilitychange', vis);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', vis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (order?.status === 'delivered') {
      if (poll.current) {
        window.clearInterval(poll.current);
        poll.current = null;
      }
    }
  }, [order?.status]);

  const total =
    order?.Total ??
    order?.orderDetails?.reduce((a, d) => a + Number(d.subtotal || 0), 0) ??
    0;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Pedido #{params.id}</h1>

      <p className="text-gray-600 mt-1">
        Estado actual:{' '}
        <span className="font-medium">{order?.status ? LABEL[order.status] : '...'}</span>
        {(patching || loading) && (
          <span className="ml-2 text-sm text-gray-500">
            ({patching ? 'actualizando' : 'actualizando…'})
          </span>
        )}
      </p>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {STEPS.map((step, idx) => {
          const activeIdx = order?.status ? Math.max(0, STEPS.indexOf(order.status as any)) : 0;
          const active = idx <= activeIdx;
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center border ${
                  active ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {idx + 1}
              </div>
              <div className={`mt-2 text-xs ${active ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
                {LABEL[step]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium mb-2">Detalle del pedido</h2>
        {order ? (
          order.orderDetails?.length ? (
            <>
              <div className="divide-y">
                {order.orderDetails.map((d) => (
                  <div key={String(d.id)} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-orange-100 text-orange-700 text-sm">
                        {d.amount}x
                      </span>
                      <span className="text-gray-800">{d.nameProduct}</span>
                    </div>
                    <div className="font-medium">${Number(d.subtotal).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="text-lg font-semibold">${Number(total).toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">No hay detalles para este pedido.</p>
          )
        ) : (
          <p className="text-sm text-gray-500">No encontramos este pedido en tu cuenta.</p>
        )}
      </div>

      <div className="mt-8">
        <a href="/orders" className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">
          Volver a mis pedidos
        </a>
      </div>
    </div>
  );
}
