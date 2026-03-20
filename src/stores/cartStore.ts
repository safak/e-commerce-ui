import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingProductIndex = state.cart.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor,
          );
          if (existingProductIndex !== -1) {
            // 产品已存在，更新数量
            const updatedCart = [...state.cart];
            updatedCart[existingProductIndex].quantity += product.quantity;
            return { cart: updatedCart };
          } else {
            // 产品不存在，添加到购物车
            return {
              cart: [
                ...state.cart,
                {
                  ...product,
                  quantity: product.quantity,
                  selectedSize: product.selectedSize,
                  selectedColor: product.selectedColor,
                },
              ],
            };
          }
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              item.id === product.id &&
              item.selectedSize === product.selectedSize &&
              item.selectedColor === product.selectedColor,
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    // 创建本地存储
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
