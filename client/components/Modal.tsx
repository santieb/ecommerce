import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi"
import { useCartStore } from "../state/Products";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({showModal, setShowModal, product}) {
  const [amount, setAmount] = useState(1)
  const [notes, setNotes] = useState('')
  
  const addCart = useCartStore((state) => state.addCart)

  const addToCart = (product, amount, notes) => {
    console.log(product)
    addCart(product, amount, notes)
    setShowModal(false)
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className=" flex border-0 rounded-lg shadow-lg relative flex-col w-full bg-orange-50 outline-none focus:outline-none">
                <div className=" bg-white flex p-3 border-b border-solid border-slate-200 rounded-t">
                <button
                    className=""
                    onClick={() => setShowModal(false)}
                  >
                  <span className="">
                    ×
                  </span>
                </button>
                <h3 className="flex-1 text-center font-semibold">
                  {product.name}
                </h3>
                 
              </div>
                <picture className="">
                  <img className='bg-cover w-full h-72 object-cover' src="https://images.deliveryhero.io/image/pedidosya/products/a61d673f-87d9-47e1-8cf9-b44ce5e42dec.jpg?quality=90&width=1920&webp=1"/>
                </picture>
                <div className="relative p-4 flex-auto">
                  <div className="p-4 bg-white rounded-lg mb-4 shadow-md">
                    <div className="flex  justify-between items-center">
                      <h5 className="font-medium text-lg">{product.name}</h5>
                      <h5 className="text-2xl font-medium">${product.price}</h5>
                    </div>
                     <p className="leading-tight  text-slate-500 text-sm">
                      I always felt like I could do anything. That’s the main
                      thing people are controlled by! Thoughts- their perception
                      of themselves! They're slowed down by their perception of
                      themselves. If you're taught you can’t do anything, you
                      won’t do anything. I was taught I could do everything.
                      {product.description}
                    </p>
                  </div>
                  <div className="">
                    <div className="flex p-4 items-center bg-white rounded-lg shadow-md justify-between">
                      <h5 className="font-semibold">Unidades</h5>
                      <div className="bg-orange-200 border-sm rounded-xl flex p-1">
                        <button onClick={() => setAmount(amount < 2 ? amount : amount-1)} className='flex items-center pl-2 pr-4'>
                          <BiMinus size="18"/>
                        </button> 
                          <span className=''>{amount}</span>
                        <button onClick={() => setAmount(amount+1)} className='flex items-center pr-2 pl-4'>
                          <BiPlus size="18"/>
                        </button>
                      </div>
                    </div>

                    <div >
                      <h5 className="font-medium pt-4 text-lg">Notas para este producto</h5>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Las seguiremos cuando la preparemos!
                      </p>
                        <input
                          onChange={(e) => setNotes(e.target.value)}
                          value={notes}
                          type="text"
                          className="my-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-orange-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"id="exampleFormControlInput1"placeholder="Escribe las instrucciones que necesites"/>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center p-4 border-t border-solid bg-white border-slate-200 rounded-b">
                  <button
                    className="w-2/3 flex items-center justify-between text-white border rounded-xl bg-orange-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none  "
                    type="button"
                    onClick={() => addToCart(product, amount, notes)}
                  >
                    <span>{amount}</span>
                    <span> Agregar a mi pedido </span>
                  <span className='font-bold'> ${amount * product.price}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}