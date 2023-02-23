import zustand, { create } from 'zustand'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface UserStore {
  user: {};
  getUser: () => Promise<void>;
}

interface CartState {
  cart: [];
  addCart: () => void;
}

export const useUserStore = create((set) => ({
  user: {},
  getUser: async () => {
    const token = localStorage.getItem('token')
    if (!token) return 

    try {
      const config = { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios('http://localhost:3000/api/users/profile', config)
      set({user: data});
    } catch (e) {
      set({user: null});
    }  
  }
}))

export const useCartStore = create((set, get) => ({
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  addCart: (product, amount, notes) => {
    const { cart } = get();
    localStorage.setItem('cart', JSON.stringify( [...cart,  {product, amount, notes}]) )
    set({ cart: [...cart,  {product, amount, notes}]  })
  },
  updateCart: (product, amount: number, notes: string) => {
    set(state => ({
      cart: state.cart.map(order => order.product == product ? {...order, amount, notes} : order)
    }))
    const { cart } = get();
    localStorage.setItem('cart', JSON.stringify(cart))
  },
  removeProduct: (product) => {
    set(state => ({
      cart: state.cart.filter(order => order.product !== product)
      })
    )
    const { cart } = get();
    localStorage.setItem('cart', JSON.stringify(cart))
  },
  addOrder: () => {
    toast.error('Tu pedido esta en proceso !', {
      position: toast.POSITION.BOTTOM_CENTER
      });
    set({cart: []})
    localStorage.removeItem('cart')
  },
}))