import { CartStoreActionsType, CartStoreStateType } from "@repo/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (product) =>
        set((state) => {
          const existingProductIndex = state.cart.findIndex(
            (p) => p.id === product.id,
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
                  quantity: product.quantity || 1,
                },
              ],
            };
          }
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    // 创建本地存储
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      //   防止闪烁
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);

export default useCartStore;
