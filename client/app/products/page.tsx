/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import HorizontalProductCard from "../../components/HorizontalProductCard";
import ListCategories from "../../components/ListCategories";
import Order from "../../components/Order";
import ProductCard from "../../components/ProductCard";

const fetchProducts = async () => {
  const res =  await fetch('http://localhost:3000/api/products', {cache: 'no-store'})
  return await res.json()
}

const fetchCategories = async () => {
  const res =  await fetch('http://localhost:3000/api/categories', {cache: 'no-store'})
  return await res.json()
}

async function Home() {

  const products = await fetchProducts()
  const categories = await fetchCategories()
 
  return (
    <main className="flex bg-orange-50 w-full">

      <div className="w-3/12 h-screen">
        <div className=" m-8 p-4 shadow-lg rounded-lg">
          <ListCategories/>
        </div>
      </div>

     <section className="w-6/12">
     
      <div className="py-4">
        <h3 className="pb-4 text-2xl font-medium ">Productos Destacados</h3>
        <div className="flex m-auto ">
          {products.map(product => product.category.name === 'Productos Destacados' && <ProductCard product={product} />) }
        </div>
      </div>
      {categories.filter(category => (category.name !== 'Productos Destacados')).map(category => (
        <> 
          {products.some(product  => product.category.id === category.id) && 
          <div className="py-4">
            <h3 className=" pb-4 text-2xl font-medium ">{category.name}</h3>
              <div className="grid grid-cols-2 gap-4 justify-items-center">
                {products.map(product => product.category.id === category.id && <HorizontalProductCard product={product} />) }
              </div>
          </div>
          }
        </> 
      ))}
    
     </section>
    <Order/>

    </main>
  )
}

export default Home