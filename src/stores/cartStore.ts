import CartPage from '@/app/cart/page';
import { CartStoreActionsType, CartStoresStateType } from '@/types';
import { create } from 'zustand';

const useCartStore = create<CartStoresStateType & CartStoreActionsType>()((set) => ({
    cart: [],
    addToCart: (product) => set((state)=> ({cart: [...state.cart, product]})),
    removeFromCart: (product) => set((state)=> ({cart: state.cart.filter((p)=> p.id !== product.id) })),
    clearCart: ()=> ({cart: []}),
}));
export default useCartStore;