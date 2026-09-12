import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  laundryId: string | null;
  laundryName: string | null;
  items: CartItem[];
  addItem: (laundryId: string, laundryName: string, item: Omit<CartItem, 'qty'>) => void;
  removeItem: (itemId: string) => void;
  updateQty: (itemId: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      laundryId: null,
      laundryName: null,
      items: [],

      addItem: (laundryId, laundryName, item) => set((state) => {
        // Prevent ordering from multiple laundries at once
        if (state.laundryId && state.laundryId !== laundryId) {
          if (!window.confirm('Adding items from a new laundry will clear your current cart. Continue?')) {
            return state;
          }
          return {
            laundryId,
            laundryName,
            items: [{ ...item, qty: 1 }]
          };
        }

        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            ...state,
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            ),
          };
        }

        return {
          laundryId,
          laundryName,
          items: [...state.items, { ...item, qty: 1 }],
        };
      }),

      removeItem: (itemId) => set((state) => {
        const newItems = state.items.filter((i) => i.id !== itemId);
        return {
          items: newItems,
          // Reset laundry if cart is empty
          laundryId: newItems.length === 0 ? null : state.laundryId,
          laundryName: newItems.length === 0 ? null : state.laundryName,
        };
      }),

      updateQty: (itemId, qty) => set((state) => {
        if (qty <= 0) {
          const newItems = state.items.filter((i) => i.id !== itemId);
          return {
            items: newItems,
            laundryId: newItems.length === 0 ? null : state.laundryId,
            laundryName: newItems.length === 0 ? null : state.laundryName,
          };
        }
        return {
          items: state.items.map((i) => (i.id === itemId ? { ...i, qty } : i)),
        };
      }),

      clearCart: () => set({ laundryId: null, laundryName: null, items: [] }),

      getTotal: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),
    }),
    {
      name: 'dhobigo-cart-storage',
    }
  )
);
