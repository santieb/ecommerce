'use client';
import { useEffect, useState } from 'react';

type OrderStatus = 'paid' | 'payment_failed' | 'in_preparation' | 'on_the_way' | 'delivered';
type AnyStatus = OrderStatus | 'pending_payment';

type Order = {
  id: string | number;
  status: AnyStatus;
  Total?: number;
  preferenceId?: string | null;
};

const API = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3000/api';
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

const LABEL: Record<AnyStatus, string> = {
  pending_payment: 'Pendiente de pago',
  paid: 'Pago recibido',
  payment_failed: 'Pago rechazado',
  in_preparation: 'En preparación',
  on_the_way: 'En camino',
  delivered: 'Entregado',
};

const BADGE: Record<AnyStatus, string> = {
  pending_payment: 'bg-yellow-50 text-yellow-700 border border-yellow-200 ring-1 ring-yellow-100',
  paid: 'bg-green-50 text-green-700 border border-green-200 ring-1 ring-green-100',
  payment_failed: 'bg-red-50 text-red-700 border border-red-200 ring-1 ring-red-100',
  in_preparation: 'bg-blue-50 text-blue-700 border border-blue-200 ring-1 ring-blue-100',
  on_the_way: 'bg-indigo-50 text-indigo-700 border border-indigo-200 ring-1 ring-indigo-100',
  delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200 ring-1 ring-emerald-100',
};

const fmtARS = (n?: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n as number) ? (n as number) : 0);

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const token = getToken();
      if (!token) {
        setErr('Tenés que iniciar sesión para ver tus pedidos.');
        setOrders([]);
        setLoading(false);
        return;
      }

      const res = await fetch(`${API}/orders/myorders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // <- Igual que tu curl
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        const msg = `Error ${res.status}`;
        setErr(msg);
        setOrders([]);
        setLoading(false);
        return;
      }

      const data = (await res.json()) as Order[];
      const arr = Array.isArray(data) ? data : [];
      // Orden simple: id desc (si es numérico o string)
      arr.sort((a, b) => String(b.id).localeCompare(String(a.id)));
      setOrders(arr);
    } catch (e) {
      setErr('No se pudo cargar tus pedidos.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mis pedidos</h1>
        <button
          onClick={load}
          className="px-3 py-2 rounded-xl border font-medium text-gray-700 hover:bg-gray-50"
          disabled={loading}
        >
          {loading ? 'Actualizando…' : 'Actualizar'}
        </button>
      </div>

      {err && (
        <div className="mt-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700">
          {err}
        </div>
      )}

      {/* Skeleton */}
      {loading && !orders.length && (
        <div className="mt-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white border rounded-2xl p-4 shadow-sm">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="mt-3 h-3 w-24 bg-gray-200 rounded" />
              <div className="mt-3 h-3 w-32 bg-gray-200 rounded" />
              <div className="mt-4 h-9 w-28 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Lista */}
      {!loading && (
        <div className="mt-6 space-y-3">
          {orders.map((o) => (
            <div
              key={String(o.id)}
              className="bg-white border rounded-2xl p-4 shadow-sm flex items-center justify-between"
            >
              <div className="min-w-0">
                <div className="font-medium text-gray-900 truncate">Pedido #{String(o.id)}</div>

                <div className="mt-2 text-sm">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ${BADGE[o.status]}`}>
                    <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                    {LABEL[o.status]}
                  </span>
                </div>

                {o.Total != null && (
                  <div className="text-sm text-gray-600 mt-2">Total: {fmtARS(o.Total)}</div>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                {/* Botón de pago si está pendiente y tenemos preferenceId */}
                {o.status === 'pending_payment' && o.preferenceId && (
                  <a
                    href={`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${o.preferenceId}`}
                    className="px-3 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600"
                  >
                    Pagar ahora
                  </a>
                )}

                <a
                  href={`/orders/${o.id}`}
                  className="px-3 py-2 rounded-xl border font-medium text-gray-700 hover:bg-gray-50"
                >
                  Ver seguimiento
                </a>
              </div>
            </div>
          ))}

          {orders.length === 0 && !err && (
            <p className="text-gray-500">No tenés pedidos todavía.</p>
          )}
        </div>
      )}
    </div>
  );
}
