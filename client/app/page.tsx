'use client'
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {

  useEffect(() => {
    
  }, []);

  return (
    <main className="flex w-full">
      <div className="w-1/4 h-screen">
        <div className="bg-slate-200 m-4 p-4">
          Categorias
          <ul>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
            <li>asdasdasfasf</li>
          </ul>
        </div>
      </div>

     <section className="w-2/4 h-screen">
     
      
      <div className="flex justify-center gap-x-4 flex-wrap">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
      
        
     </section>
    <div className="w-1/4 h-screen">
      <div className="bg-slate-200 m-4 p-4">
        Mi Pedido
        <div className=" text-center">
          <img className="m-auto w-20" src="https://cdn-icons-png.flaticon.com/512/5058/5058446.png"></img>
          Tu pedido esta vacio
        </div>
        
        <p></p>
      </div>
    </div>
    
    </main>
  )
}
