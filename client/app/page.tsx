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
    <main className="flex bg-red-50 w-full">
      <div className="w-2/12 h-screen">
        <div className="bg-white m-8 p-4 shadow-lg rounded-lg">
          <ListCategories/>
        </div>
      </div>

     <section className="w-8/12 h-screen">
     
      <div className="py-4">
        <h3 className="pb-4 text-2xl font-medium ">Productos Destacados</h3>
        <div className="flex r gap-x-4 flex-wrap">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
      <div className="py-4">
        <h3 className=" pb-4 text-2xl font-medium ">Productos Destacados</h3>
        <div className="grid grid-cols-3 gap-4">
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
        </div>
      </div>

      <div className="py-4">
        <h3 className=" pb-4 text-2xl font-medium ">Bebidas</h3>
        <div className="grid grid-cols-3 gap-4">
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
          <HorizontalProductCard/>
        </div>
      </div>
        
     </section>
    <div className="w-3/12 h-screen">
      <div className=" bg-white m-8 p-4 shadow-lg rounded-lg">
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
