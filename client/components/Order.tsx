'use client'
import React from 'react'
import { useCartStore } from "../state/Products";

const Order = () => {
  const cart = useCartStore((state) => state.cart)
  console.log(cart)
 
  return (
    <div className="w-3/12 h-screen">
      <div className=" bg-white m-8 p-4 shadow-lg rounded-lg ">
        Mi Pedido
        {cart.length > 0 ? cart.map(orderDetail => (
          <div key={orderDetail.id}>
            {orderDetail.name}
            {orderDetail.id}
            {orderDetail.amount}
          </div>
        )): 
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