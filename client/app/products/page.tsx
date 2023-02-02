/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from "react";
import HorizontalProductCard from "../../components/HorizontalProductCard";
import ListCategories from "../../components/ListCategories";
import Modal from "../../components/Modal";
import ProductCard from "../../components/ProductCard";
import { useCategoriesStore, useProductStore } from "../../state/Products";

export default function Home() {

  const getProducts = useProductStore((state) => state.getProducts)
  const products = useProductStore((state) => state.products)

  const getCategories = useCategoriesStore((state) => state.getCategories)
  const categories = useCategoriesStore((state) => state.categories)

  useEffect(() => {
    getProducts()
    getCategories()
  }, []);
  console.log(categories)

  return (
    <main className="flex bg-orange-50 w-full">

      <div className="w-3/12 h-screen">
        <div className=" m-8 p-4 shadow-lg rounded-lg">
          <ListCategories/>
        </div>
      </div>

     <section className="w-6/12 h-screen">
     
      <div className="py-4">
        <h3 className="pb-4 text-2xl font-medium ">Productos Destacados</h3>
        <div className="grid grid-cols-5 m-auto justify-items-center">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
      <div className="py-4">
        <h3 className=" pb-4 text-2xl font-medium ">Productos Destacados</h3>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {products.length > 0 ? products.map(product => (<HorizontalProductCard product={product} key={product.id}/>)) :
            'cargando...'
          }
        
        </div>
      </div>
      
    
     </section>
    <div className="w-3/12 h-screen">
      <div className=" bg-white m-8 p-4 shadow-lg rounded-lg ">
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
