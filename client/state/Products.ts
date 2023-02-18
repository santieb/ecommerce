import { create } from 'zustand'
import axios from 'axios'

interface ProductState {
  products: [];
  getProducts: () => Promise<void>;
}

interface CategoriesState {
  categories: [];
  getCategories: () => Promise<void>;
}

interface CartState {
  cart: [];
  addCart: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  getProducts: async () => {
    try {
      const products = await axios('http://localhost:3000/api/products')
      set({products: products.data});
    } catch (error) {
      console.log(error)
    }
  }
}))

export const useCategoriesStore = create<CategoriesState>(set => ({
  categories: [],
  getCategories: async () => {
    try {
      const categories = await axios('http://localhost:3000/api/categories')
      set({categories: categories.data});
    } catch (error) {
      console.log(error)
    }
  }
}))

export const useCartStore = create((set, get) => ({
  cart: [],
  addCart: (product, amount, notes) => {
    const { cart } = get();
    set({ cart: [...cart,  {product, amount, notes}]  })
  },
  updateCart: (product, amount: number, notes: string) => 
    set((state) => ({
      cart: state.cart.map(order => order.product == product ? {...order, amount, notes} : order)
    })),
  removeProduct: (product) => 
    set((state) => ({
    cart: state.cart.filter(order => order.product !== product)
    })),
}))