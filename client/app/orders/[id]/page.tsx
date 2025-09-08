'use client';
import { useEffect, useRef, useState } from 'react';

type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'payment_failed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

const LABEL: Record<OrderStatus, string> = {
  pending_payment: 'Pendiente de pago',
  paid: 'Pago recibido',
  payment_failed: 'Pago rechazado',
  processing: 'En preparación',
  shipped: 'En camino',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  refunded: 'Reintegrado',
};

const STEPS: OrderStatus[] = ['paid', 'processing', 'shipped', 'delivered'];

const ENV_API = process.env.NEXT_PUBLIC_API_BASE;
const API = ENV_API ?? '/api';
const getToken = () =>
  (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

// Helper seguro para fetch
function buildFetchOpts(token: string | null) {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

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

  const patchStatusFromQueryParams = async () => {
    if (typeof window === 'undefined') return;
    const qs = new URLSearchParams(window.location.search);
    const mpStatus = qs.get('status'); // approved | rejected | pending
    if (!mpStatus) return;

    const map: Record<string, OrderStatus> = {
      approved: 'paid',
      rejected: 'payment_failed',
      pending: 'pending_payment',
    };
    const next = map[mpStatus];
    if (!next) return;

    const token = getToken();
    if (!token) return;

    setPatching(true);
    try {
      await fetch(`${API}/orders/${params.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: next }),
      });
    } catch {
      // ignoramos errores en demo
    } finally {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
      setPatching(false);
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const opts = buildFetchOpts(token);
      const res = await fetch(`${API}/orders/myorders`, opts);

      if (!res.ok) {
        console.warn('GET /orders/myorders -> HTTP', res.status);
        setOrder(null);
        return;
      }

      const list = (await res.json()) as OrderDto[];
      const current =
        list.find((o) => String(o.id) === String(params.id)) ?? null;
      setOrder(current);
    } catch (e) {
      console.error('Error fetching orders:', e);
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

    poll.current = window.setInterval(load, 5000);
    return () => {
      if (poll.current) window.clearInterval(poll.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const effectiveStatus: OrderStatus | undefined =
    order?.status === 'paid' ? 'processing' : order?.status;

  const total =
    order?.Total ??
    order?.orderDetails?.reduce((a, d) => a + Number(d.subtotal || 0), 0) ??
    0;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Pedido #{params.id}</h1>

      <p className="text-gray-600 mt-1">
        Estado actual:{' '}
        <span className="font-medium">
          {effectiveStatus ? LABEL[effectiveStatus] : '...'}
        </span>
        {(patching || loading) && (
          <span className="ml-2 text-sm text-gray-500">
            ({patching ? 'actualizando' : 'actualizando…'})
          </span>
        )}
      </p>

      {/* Timeline */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        {STEPS.map((step, idx) => {
          const activeIdx = effectiveStatus
            ? Math.max(0, STEPS.indexOf(effectiveStatus as any))
            : 0;
          const active = idx <= activeIdx;
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center border ${
                  active
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {idx + 1}
              </div>
              <div
                className={`mt-2 text-xs ${
                  active ? 'text-green-700 font-medium' : 'text-gray-500'
                }`}
              >
                {LABEL[step]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detalle del pedido */}
      <div className="mt-8 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium mb-2">Detalle del pedido</h2>
        {order ? (
          order.orderDetails?.length ? (
            <>
              <div className="divide-y">
                {order.orderDetails.map((d) => (
                  <div
                    key={String(d.id)}
                    className="py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-orange-100 text-orange-700 text-sm">
                        {d.amount}x
                      </span>
                      <span className="text-gray-800">{d.nameProduct}</span>
                    </div>
                    <div className="font-medium">
                      ${Number(d.subtotal).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="text-lg font-semibold">
                  ${Number(total).toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              No hay detalles para este pedido.
            </p>
          )
        ) : (
          <p className="text-sm text-gray-500">
            No encontramos este pedido en tu cuenta.
          </p>
        )}
      </div>

      <div className="mt-8">
        <a
          href="/orders"
          className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
        >
          Volver a mis pedidos
        </a>
      </div>
    </div>
  );
}
