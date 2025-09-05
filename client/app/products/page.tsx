/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import HorizontalProductCard from "../../components/HorizontalProductCard";
import ListCategories from "../../components/ListCategories";
import Order from "../../components/Order";
import ProductCard from "../../components/ProductCard";

const api = axios.create({ baseURL: "http://localhost:3000" });

const fetchProducts = async () => {
  try {
    const { data } = await api.get("/api/products", { params: { t: Date.now() } });
    return data ?? [];
  } catch {
    return [];
  }
};

const fetchCategories = async () => {
  try {
    const { data } = await api.get("/api/categories", { params: { t: Date.now() } });
    return data ?? [];
  } catch {
    return [];
  }
};

async function Home() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <main className="flex bg-orange-50 w-full">
      <div className="w-3/12 h-screen">
        <div className=" m-8 p-4 bg-white shadow-lg rounded-lg">
          <ListCategories categories={categories ?? []}/>
        </div>
      </div>

      <section className="w-6/12">
        <div className="py-4">
          <h3 className="pb-4 text-2xl font-medium ">Productos Destacados</h3>
          <div className="flex m-auto justify-between">
            {products?.map(product =>
              (product?.category?.name === "Mas vendidos") && (
                <ProductCard key={product.id} product={product} />
              )
            )}
          </div>
        </div>

        {categories
          ?.filter(category => category?.name !== "Mas vendidos")
          .map(category => (
            <> 
              {products?.some(product => product?.category?.id === category?.id) && 
                <div className="py-4">
                  <h3 className=" pb-4 text-2xl font-medium ">{category?.name}</h3>
                  <div className="grid grid-cols-2 gap-4 justify-items-center">
                    {products?.map(product =>
                      (product?.category?.id === category?.id) && (
                        <HorizontalProductCard key={product.id} product={product} />
                      )
                    )}
                  </div>
                </div>
              }
            </> 
        ))}
      </section>

      <Order/>
    </main>
  );
}

export default Home;
