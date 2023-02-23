'use client'
import React from 'react'
import { useCartStore } from "../state/Products";
import { MdOutlineClose } from 'react-icons/md'
import truncateString from '../utils/truncateString';
import Image from 'next/image'
import { Button } from './Button';

const Order = () => {
  const cart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const addOrder = useCartStore((state) => state.addOrder)
  const calculateTotal = cart.reduce((acu, order) => acu + order.product.price * order.amount, 0)

  console.log("order", cart)
  return (
    <div className="w-3/12 sticky top-0 h-screen">
      <div className=" bg-white m-8 p-4 shadow-lg rounded-lg ">
        <h3 className="pb-2 text-xl font-medium">Mi pedido</h3>
        {cart.length > 0 ? <>
          {cart.map(orderDetail => (
            <div key={orderDetail.product.id} className='flex py-4 justify-between' >
              <div className='flex-initial flex'>
                <p className='ml-4'>{`${orderDetail.amount}x`}</p>
                <p className='ml-2 italic'>{truncateString(orderDetail.product.name)}</p>
              </div>

              <div className='flex items-center justify-center gap-2'>              
                <p className='font-medium '>{`$${orderDetail.amount * orderDetail.product.price}`}</p>
                <span onClick={() => removeProduct(orderDetail.product)} className='cursor-pointer '>
                  <MdOutlineClose  className='text-sm bg-orange-200 rounded'/>
                </span>
              </div>

            </div>
          ))}

          <div className='text-xl flex font-medium py-4 justify-between'>
            <p>Total</p>
            <p>{`$${calculateTotal}`}</p>
          </div>

          <Button
            type="button"
            theme='primary'
            onClick={addOrder}
          >
            Hacer Pedido
          </Button>
        </>
          :
          <div className="flex flex-col justify-center items-center m-auto text-center">
            <Image width={130} height={130} src="https://i.imgur.com/ZAEXqd4.png" alt='cart empty'></Image>
            <h3 className="pb-2 mt-5 text-md font-medium text-gray-600">Tu pedido esta vacio</h3>
          </div>
        }
      </div>
    </div>
  )
}

export default Order