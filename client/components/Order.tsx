'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { useCartStore } from "../state/Products";
import { MdOutlineClose } from 'react-icons/md'
import truncateString from '../utils/truncateString';
import Image from 'next/image'
import 'leaflet/dist/leaflet.css'

const API_URL = process.env.NEXT_PUBLIC_API_BASE ?? 'https://b46bc20757e5.ngrok-free.app/api'
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)

const api = axios.create({
  baseURL: API_URL,
  headers: { 'ngrok-skip-browser-warning': '1' },
})

const withAuth = (token?: string) => ({
  headers: token ? { Authorization: `Bearer ${token}` } : {},
})


const CITY_NAME = 'Río Grande, Tierra del Fuego, Argentina'
const RG_CENTER = { lat: -53.7877, lng: -67.7090 }

function MapPicker({
  address,
  onAddress,
}: {
  address: string
  onAddress: (addr: string) => void
}) {
  const mapEl = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const LeafletRef = useRef<any>(null)

  const DEFAULT_CENTER = useMemo(() => RG_CENTER, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const L = await import('leaflet')
      if (!mounted) return
      LeafletRef.current = L
      const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png'
      const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png'
      const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
      L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

      if (mapEl.current && !mapRef.current) {
        const map = L.map(mapEl.current, {
          center: [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
          zoom: 14,
        })
        map.setMinZoom(10)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19,
        }).addTo(map)

        map.on('click', async (e: any) => {
          const { lat, lng } = e.latlng
          placeMarker(L, map, lat, lng)
          const addr = await reverseGeocode(lat, lng)
          if (addr) onAddress(addr)
        })

        mapRef.current = map
      }
    })()
    return () => {
      mounted = false
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  const placeMarker = (L: any, map: any, lat: number, lng: number) => {
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng])
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(map)
    }
  }

  const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PedidosApp/1.0 (demo practicas)',
          'ngrok-skip-browser-warning': '1',
        },
      })
      if (!res.ok) return null
      const data = await res.json()
      return data?.display_name || null
    } catch {
      return null
    }
  }

  const forwardGeocode = async (query: string): Promise<{ lat: number; lon: number } | null> => {
    try {
      const q = `${query}, ${CITY_NAME}`
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=ar&limit=1&addressdetails=1`
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'PedidosApp/1.0 (demo practicas)',
          'ngrok-skip-browser-warning': '1',
        },
      })
      if (!res.ok) return null
      const list = await res.json()
      if (!Array.isArray(list) || list.length === 0) return null
      const best = list[0]
      return { lat: parseFloat(best.lat), lon: parseFloat(best.lon) }
    } catch {
      return null
    }
  }

  // Debounce input → mover mapa a la dirección tipeada
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const q = address.trim()
      if (!q || q.length < 4 || !mapRef.current || !LeafletRef.current) return
      const hit = await forwardGeocode(q)
      if (!hit || cancelled) return
      const { lat, lon } = hit
      mapRef.current.setView([lat, lon], 16, { animate: true })
      placeMarker(LeafletRef.current, mapRef.current, lat, lon)
    }
    const t = setTimeout(run, 400)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [address])

  const openInMapsHref = useMemo(() => {
    const q = address?.trim()
    if (!q || q.length < 4) return ''
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${q}, ${CITY_NAME}`)}`
  }, [address])

  return (
    <div className="space-y-2">
      <div ref={mapEl} className="w-full h-[420px] rounded-lg border bg-gray-100 overflow-hidden" />
      {openInMapsHref && (
        <a
          href={openInMapsHref}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-sm text-blue-600 hover:underline"
        >
          Abrir en Google Maps
        </a>
      )}
    </div>
  )
}

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

  useEffect(() => {
    if (!open) return
    try {
      const saved = localStorage.getItem('checkout_address')
      if (saved) {
        const { address: a, phone: p } = JSON.parse(saved)
        if (a) setAddress(a)
        if (p) setPhone(p)
      }
    } catch {}
  }, [open])

  useEffect(() => {
    try {
      localStorage.setItem('checkout_address', JSON.stringify({ address, phone }))
    } catch {}
  }, [address, phone])

  const confirm = () => {
    if (!address.trim()) {
      setError('Ingresá la dirección (calle y número).')
      return
    }
    onConfirm({ address: address.trim(), phone: phone.trim() || undefined })
  }

  if (!open) return null

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative w-full my-6 mx-auto max-w-5xl">
          <div className="flex border-0 rounded-xl shadow-2xl relative flex-col w-full bg-orange-50 max-h-[90vh] overflow-y-auto">
            <div className="bg-white flex p-4 border-b border-slate-200 rounded-t items-center sticky top-0 z-10">
              <button className="px-2 text-2xl" onClick={onClose}>×</button>
              <h3 className="flex-1 text-center font-semibold text-lg">Confirmá tu pedido</h3>
              <span className="w-6" />
            </div>

            <div className="p-6 space-y-4">
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

              <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-600">Dirección (calle y número)</label>
                      <input
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); if (error) setError(null) }}
                        className="mt-1 block w-full px-3 py-3 bg-orange-50 border border-gray-300 rounded-lg focus:bg-white focus:border-blue-600 outline-none"
                        placeholder="Ej: Av. San Martín 1234, Río Grande"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600">Teléfono (opcional)</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full px-3 py-3 bg-orange-50 border border-gray-300 rounded-lg focus:bg-white focus:border-blue-600 outline-none"
                        placeholder="Ej: 2964 555555"
                      />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                  </div>

                  {/* Mapa interactivo */}
                  <div>
                    <div className="text-sm text-slate-600 mb-2">Verificación y selección en mapa</div>
                    <MapPicker
                      address={address}
                      onAddress={(addr) => setAddress(addr)}
                    />
                  </div>
                </div>
              </div>
            </div>

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

const Order = () => {
  const cart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const calculateTotal = cart.reduce(
    (acu, order) => acu + order.product.price * order.amount,
    0
  )

  const handleCheckoutWithOrder = async (payload: { address: string; phone?: string }) => {
    if (cart.length === 0 || loading) return
    const token = getToken()
    if (!token) {
      alert('Necesitás iniciar sesión para finalizar la compra.')
      return
    }

    setLoading(true)
    try {
      const addressNote = `🧭 ENTREGA → ${payload.address}${payload.phone ? ' | Tel: ' + payload.phone : ''}`

      const orderDetails = cart.map((item, idx) => ({
        product: String(item.product.id),
        amount: Number(item.amount),
        note: idx === 0
          ? [item.notes, addressNote].filter(Boolean).join(' | ')
          : item.notes ?? undefined,
      }))

      const createOrderRes = await api.post(
        '/orders',
        { orderDetails },
        withAuth(token)
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

      const prefRes = await api.post(
        `/payments/from-order/${orderId}`,
        {},
        withAuth(token)
      )

      const pref = prefRes.data
      const url = pref?.sandbox_init_point ?? pref?.init_point ?? null
      if (!url) {
        console.error('No se recibió init_point/sandbox_init_point', pref)
        alert('No se pudo iniciar el pago')
        setLoading(false)
        return
      }

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
