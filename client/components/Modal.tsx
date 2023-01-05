import React from "react";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-8 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
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
                <div className="relative p-6 flex-auto">
                  <div className="flex justify-between">
                    <h5 className="font-medium text-lg">Helado 1 kg</h5>
                    <h5 className="text-2xl font-medium">$220.00</h5>
                  </div>
                  
                  <p className="my-1 text-slate-500 text-sm leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>

                  <div>
                    Unidades 
                    <button>+</button> 1 <button>-</button>
                  </div>

                  <div>
                    <h5 className="font-medium text-lg">Notas para este producto</h5>
                    <p className="my-3 text-slate-500 text-sm leading-relaxed">
                      Las seguiremos cuando la preparemos!
                    </p>
                    <textarea>

                    </textarea>
                  </div>
                 
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Agregar a mi pedido $220.00
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