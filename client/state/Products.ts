import { create } from 'zustand'
import axios from 'axios'

interface ProductState {
  products: [];
  getProducts: () => Promise<void>;
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