import zustand, { create } from 'zustand'
import axios from 'axios'

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
      const config = { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios('http://localhost:3000/api/users/profile', config)
      console.log(data, 'zustand')
      set({user: data});
    } catch (e) {
      set({user: null});
    }  
  }
}))

export const useCartStore = create((set, get) => ({
  cart: [],
  addCart: (id, amount, name, notes) => {
    const { cart } = get();
    set({ cart: [...cart,  {id, amount, name, notes}]  })
  }
    
}))