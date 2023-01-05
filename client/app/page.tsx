'use client'
import { useEffect } from "react";
import HorizontalProductCard from "../components/HorizontalProductCard";
import ListCategories from "../components/ListCategories";
import Modal from "../components/Modal";
import ProductCard from "../components/ProductCard";

export default function Home() {

  useEffect(() => {
    
  }, []);

  return (
    <main className="flex  w-full">
      <div className="w-2/12 h-screen">
        <div className="bg-slate-200 m-4 p-4">
          <ListCategories/>
        </div>
      </div>

     <section className="w-8/12 h-screen">
     
      <div className="py-4">
        <h3 className="pl-12 pb-4 text-2xl font-medium ">Productos Destacados</h3>
        <div className="flex justify-center gap-x-4 flex-wrap">
          <Modal/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
      <div className="py-4">
        <h3 className="pl-12 pb-4 text-2xl font-medium ">Productos Destacados</h3>
        <div className="grid grid-cols-3 gap-4">
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
        </div>
      </div>

      <div className="py-4">
        <h3 className="pl-12 pb-4 text-2xl font-medium ">Bebidas</h3>
        <div className="grid grid-cols-3 gap-4">
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
        </div>
      </div>
        
     </section>
    <div className="w-3/12 h-screen">
      <div className="   bg-slate-200 m-4 p-4">
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
