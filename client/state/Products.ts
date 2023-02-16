import { create } from 'zustand'
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
    try {
      const user = await axios('http://localhost:3000/user/profile')
      set({user: user.data});
    } catch (error) {
      console.log(error)
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