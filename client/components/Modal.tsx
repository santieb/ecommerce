import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi"

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({showModal, setShowModal}: Props) {
  
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="flex border-0 rounded-lg shadow-lg relative flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex p-3 border-b border-solid border-slate-200 rounded-t">
                <button
                    className=""
                    onClick={() => setShowModal(false)}
                  >
                  <span className="">
                    ×
                  </span>
                </button>
                <h3 className="flex-1 text-center font-semibold">
                  Helado 1 kg
                </h3>
                 
              </div>
                <picture className="">
                  <img className='bg-cover w-full h-72 object-cover' src="https://images.deliveryhero.io/image/pedidosya/products/a61d673f-87d9-47e1-8cf9-b44ce5e42dec.jpg?quality=90&width=1920&webp=1"/>
                </picture>
                <div className="relative p-4 flex-auto">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-lg">Helado 1 kg</h5>
                    <h5 className="text-2xl font-medium">$220.00</h5>
                  </div>
                  <div className="">
                    <p className="leading-tight text-slate-500 text-sm">
                      I always felt like I could do anything. That’s the main
                      thing people are controlled by! Thoughts- their perception
                      of themselves! They're slowed down by their perception of
                      themselves. If you're taught you can’t do anything, you
                      won’t do anything. I was taught I could do everything.
                    </p>

                    <div className="flex p-4 items-center bg-slate-100 justify-between">
                      Unidades 
                      <div className="bg-slate-300 border rounded-xl flex p-1">
                        <button className='flex items-center pl-2 pr-4'>
                          <BiMinus size="18"/>
                        </button> 
                          <span className=''>1</span>
                        <button className='flex items-center pr-2 pl-4'>
                          <BiPlus size="18"/>
                        </button>
                      </div>
                    </div>

                    <div className='bg-slate-100'>
                      <h5 className="font-medium text-lg">Notas para este producto</h5>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Las seguiremos cuando la preparemos!
                      </p>
                      <input
                        type="text"
                        className="my-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"id="exampleFormControlInput1"placeholder="Escribe las instrucciones que necesites"/>
                    </div>
                  </div>
                  
                 
                </div>
                {/*footer*/}
                <div className="w-full flex justify-center p-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="w-2/3 flex items-center justify-between text-white border rounded-xl bg-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none  "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <span> 2 </span>
                    <span> Agregar a mi pedido </span>
                    <span className='font-bold'> $220.00 </span>
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