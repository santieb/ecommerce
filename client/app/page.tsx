'use client'
import { useEffect } from "react";
import { BsCart4 } from 'react-icons/bs'

export default function Home() {

  useEffect(() => {
    
  }, []);

  return (
    <main >
      <div className="fixed top-4 right-4">
      <button className="inline text-orange-800 font-bold bg-orange-300 text-xl p-4">
        ver carrito <BsCart4/>
      </button>
      </div>
     <div className="w-full bg-orange-300 text-5xl">
      <span className="text-orange-600">COFFE</span> 
        <h1 className="text-white font-extrabold text-center uppercase">
          La mejor comida casera
          <br/>
          <span className="text-orange-600">caseritos</span> 
        </h1>
        <button className="margin-auto rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-orange-600 shadow-sm hover:bg-orange-100 sm:px-8">
          Shop  
        </button>
        
     </div>
 
     <section className="max-w-6xl mx-auto ">
      
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div className="bg-gray-100">
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
            
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
        <div>
          <img alt="product image" src="https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"/>
          <div className="mt-4 flex items-center justify-between font-medium text-gray-900">
            <h3>Ice Coffre</h3>
            <p>$4.00</p>
          </div>
          <p>
            descripcion de el cafe en cuestion
          </p>
        </div>
      </div>
     </section>
    
    </main>
  )
}
