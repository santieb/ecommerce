'use client'
import React from 'react'
import { useCartStore } from "../state/Products";

const Order = () => {
  const cart = useCartStore((state) => state.cart)
  console.log(cart)
 
  return (
    <div className="w-3/12 sticky top-0 h-screen">
      <div className=" bg-white m-8 p-4 shadow-lg rounded-lg ">
        Mi Pedido
        {cart.length > 0 ? <div>
        {cart.map(orderDetail => (
        <div key={orderDetail.id}>
         {orderDetail.amount} x {orderDetail.name} $600
        </div>
        ))}
        <button
            type="button"
            className="inline-block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Hacer Pedido
          </button>
        </div>
        : 
          <div className=" text-center">
          <img className="m-auto w-20" src="https://cdn-icons-png.flaticon.com/512/5058/5058446.png"></img>
          Tu pedido esta vacio
      </div>
        }
       
        <p></p>
      </div>
    </div>
  )
}

export default Order