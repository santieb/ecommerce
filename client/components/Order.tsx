'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useCartStore } from "../state/Products";
import { MdOutlineClose } from 'react-icons/md'
import truncateString from '../utils/truncateString';
import Image from 'next/image'

/** ====== Config mínima ====== */
const API_URL = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3000/api'
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)

/** -------- Modal (lista + Dirección + Teléfono) -------- */
function SimpleAddressModal({
  open,
  onClose,
  onConfirm,
  cart,
  calculateTotal,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  onConfirm: (payload: { address: string; phone?: string }) => void
  cart: Array<{ product: any; amount: number; notes?: string }>
  calculateTotal: number
  onRemove: (product: any) => void
}) {
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)

  const confirm = () => {
    if (!address.trim()) {
      setError('Ingresá la dirección (calle y número).')
      return
    }
    // 👇 faltaba llamar a onConfirm
    onConfirm({ address: address.trim(), phone: phone.trim() || undefined })
  }

  if (!open) return null

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative w-full my-6 mx-auto max-w-4xl">
          <div className="flex border-0 rounded-xl shadow-2xl relative flex-col w-full bg-orange-50 max-h-[90vh] overflow-y-auto">
            {/* header */}
            <div className="bg-white flex p-4 border-b border-slate-200 rounded-t items-center sticky top-0 z-10">
              <button className="px-2 text-2xl" onClick={onClose}>×</button>
              <h3 className="flex-1 text-center font-semibold text-lg">Confirmá tu pedido</h3>
              <span className="w-6" />
            </div>

            {/* body */}
            <div className="p-6 space-y-4">
              {/* lista de productos */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="pb-2 text-lg font-medium">Mi pedido</h4>
                {cart.length > 0 ? (
                  <>
                    {cart.map((orderDetail) => (
                      <div key={orderDetail.product.id} className="flex py-3 justify-between">
                        <div className="flex-initial flex">
                          <p className="ml-1">{`${orderDetail.amount}x`}</p>
                          <p className="ml-2 italic">{truncateString(orderDetail.product.name)}</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <p className="font-medium">{`$${orderDetail.amount * orderDetail.product.price}`}</p>
                          <span
                            onClick={() => onRemove(orderDetail.product)}
                            className="cursor-pointer"
                            title="Quitar"
                          >
                            <MdOutlineClose className="text-sm bg-orange-200 rounded" />
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="text-xl flex font-medium pt-2 justify-between border-t mt-2">
                      <p>Total</p>
                      <p>{`$${calculateTotal}`}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Tu carrito está vacío.</p>
                )}
              </div>

              {/* dirección */}
              <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-slate-600">Dirección (calle y número)</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 block w-full px-3 py-3 bg-orange-50 border border-gray-300 rounded-lg focus:bg-white focus:border-blue-600 outline-none"
                      placeholder="Ej: Av. Siempre Viva 742"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-slate-600">Teléfono (opcional)</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 block w-full px-3 py-3 bg-orange-50 border border-gray-300 rounded-lg focus:bg-white focus:border-blue-600 outline-none"
                      placeholder="Ej: 11 5555-5555"
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
              </div>
            </div>

            {/* footer */}
            <div className="w-full flex justify-center p-5 border-t bg-white border-slate-200 rounded-b sticky bottom-0 z-10">
              <button
                className="w-2/3 flex items-center justify-center gap-2 text-white rounded-xl bg-orange-500 font-bold uppercase px-6 py-4 text-base"
                onClick={confirm}
              >
                Confirmar y pagar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

/** ------------------------ Componente ------------------------ */
const Order = () => {
  const cart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const calculateTotal = cart.reduce(
    (acu, order) => acu + order.product.price * order.amount,
    0
  )

  /** Nuevo: checkout usando orderId y /payments/from-order/:id */
  const handleCheckoutWithOrder = async (payload: { address: string; phone?: string }) => {
    if (cart.length === 0 || loading) return
    const token = getToken()
    if (!token) {
      alert('Necesitás iniciar sesión para finalizar la compra.')
      return
    }

    setLoading(true)
    try {
      // 1) Crear ORDEN (enviamos address como nota en el PRIMER item para la demo)
      const addressNote = `🧭 ENTREGA → ${payload.address}${payload.phone ? ' | Tel: ' + payload.phone : ''}`

      const orderDetails = cart.map((item, idx) => ({
        product: String(item.product.id),
        amount: Number(item.amount),
        note: idx === 0
          ? [item.notes, addressNote].filter(Boolean).join(' | ')
          : item.notes ?? undefined,
      }))

      const createOrderRes = await axios.post(
        `${API_URL}/orders`,
        { orderDetails },
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      )

      const orderId =
        createOrderRes.data?.newOrder?.id ??
        createOrderRes.data?.id ?? null

      if (!orderId) {
        console.error('Respuesta inesperada al crear orden:', createOrderRes.data)
        alert('No se pudo crear la orden')
        setLoading(false)
        return
      }

      // 2) Crear preferencia desde la orden
      const prefRes = await axios.post(
        `${API_URL}/payments/from-order/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const pref = prefRes.data
      const url = pref?.sandbox_init_point ?? pref?.init_point ?? null
      if (!url) {
        console.error('No se recibió init_point/sandbox_init_point', pref)
        alert('No se pudo iniciar el pago')
        setLoading(false)
        return
      }

      // 3) Redirigir a Mercado Pago
      window.location.href = url
    } catch (err: any) {
      if (err.response) {
        console.error('API ERROR', err.response.status, err.response.data)
        alert(`Error (${err.response.status}): ${JSON.stringify(err.response.data)}`)
      } else {
        console.error(err)
        alert('Error al iniciar el pago')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-3/12 sticky top-0 h-screen">
      <div className=" bg-white m-8 p-4 shadow-lg rounded-lg ">
        <h3 className="pb-2 text-xl font-medium">Mi pedido</h3>
        {cart.length > 0 ? (
          <>
            {cart.map(orderDetail => (
              <div key={orderDetail.product.id} className='flex py-4 justify-between'>
                <div className='flex-initial flex'>
                  <p className='ml-4'>{`${orderDetail.amount}x`}</p>
                  <p className='ml-2 italic'>{truncateString(orderDetail.product.name)}</p>
                </div>

                <div className='flex items-center justify-center gap-2'>
                  <p className='font-medium '>{`$${orderDetail.amount * orderDetail.product.price}`}</p>
                  <span onClick={() => removeProduct(orderDetail.product)} className='cursor-pointer '>
                    <MdOutlineClose className='text-sm bg-orange-200 rounded'/>
                  </span>
                </div>
              </div>
            ))}

            <div className='text-xl flex font-medium py-4 justify-between'>
              <p>Total</p>
              <p>{`$${calculateTotal}`}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              disabled={loading}
              className="mb-2 w-full inline-block py-2.5 mt-3 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-60"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              {loading ? 'Redirigiendo...' : 'Hacer Pedido'}
            </button>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center m-auto text-center">
            <Image width={130} height={130} src="https://i.imgur.com/ZAEXqd4.png" alt='cart empty' />
            <h3 className="pb-2 mt-5 text-md font-medium text-gray-600">Tu pedido esta vacio</h3>
          </div>
        )}
      </div>

      <SimpleAddressModal
        open={showModal}
        onClose={() => setShowModal(false)}
        cart={cart}
        calculateTotal={calculateTotal}
        onRemove={removeProduct}
        onConfirm={(addr) => { setShowModal(false); handleCheckoutWithOrder(addr); }}
      />
    </div>
  )
}

export default Order
