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
  updateCart: (productIndex: number, amount: number, notes: string) => {
    const { cart } = get();
    const cartUpdated = cart
    cartUpdated[productIndex].amount = amount
    cartUpdated[productIndex].notes = notes
    console.log("updated", cartUpdated)
    return set({cartUpdated})
  },
}))