'use client'
import React, { useEffect } from 'react'
import { useCartStore } from "../state/Products";
import truncateString from '../utils/truncateString';

const Order = () => {
  const cart = useCartStore((state) => state.cart)

  const calculateTotal = cart.reduce((acu, order) => acu + order.product.price * order.amount, 0)

  console.log("order", cart)
  return (
    <div className="w-3/12 sticky top-0 h-screen">
      <div className=" bg-white m-8 p-4 shadow-lg rounded-lg ">
        Mi Pedido
        <div className="h-0.5 bg-gray-200 my-2"></div>
        {cart.length > 0 ? <>
          {cart.map(orderDetail => (
            <div key={orderDetail.product.id} className='flex py-4 justify-between' >
              <p className='ml-4'>{`x${orderDetail.amount}`}</p>
              <p>{truncateString(orderDetail.product.name)}</p>
              <p>{`$ ${orderDetail.amount * orderDetail.product.price}`}</p>
            </div>
          ))}

          <div>
            <p>Total</p>
            <p>{`$ ${calculateTotal}`}</p>
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
          <div className=" text-center">
            <img className="m-auto w-20" src="https://cdn-icons-png.flaticon.com/512/5058/5058446.png"></img>
            Tu pedido esta vacio
          </div>
        }
      </div>
    </div>
  )
}

export default Order