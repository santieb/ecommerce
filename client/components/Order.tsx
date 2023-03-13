'use client'
import React from 'react'
import { useCartStore } from "../state/Products";
import { MdOutlineClose } from 'react-icons/md'
import truncateString from '../utils/truncateString';
import Image from 'next/image'

const Order = () => {
  const cart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)

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
            <p>Totalaaaaa</p>
            <p>{`$${calculateTotal}`}</p>
          </div>

          <button
            type="button"
            className="mb-2 w-full inline-block py-2.5 mt-3 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Hacer Pedido
          </button>
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