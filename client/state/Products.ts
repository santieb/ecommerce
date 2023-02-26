import zustand, { create } from 'zustand'
import api from '../utils/instance';

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
    if (!token) return console.log('no tiene token')

    try {
      const { data } = await api('/users/profile', { 
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data, 'zustand')
      set({user: data});
    } catch (e) {
      set({user: null});
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