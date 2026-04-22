import { create } from "zustand";

export type CartPlanType = "today" | "monthly";

export type CartItem = {
  id: string;
  cookId?: string;
  cookName: string;
  dishKey: string;
  dishName: string;
  dayLabel?: string;
  mealSlot?: "breakfast" | "lunch" | "dinner";
  unitPrice: number;
  quantity: number;
  monthMultiplier: number;
  planType: CartPlanType;
};

type AddCartItemInput = Omit<CartItem, "id">;

type CartState = {
  items: CartItem[];
  addItem: (input: AddCartItemInput) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

function buildCartItemId(input: AddCartItemInput): string {
  return [
    input.cookId ?? "cook",
    input.dishKey,
    input.planType,
    input.dayLabel ?? "today",
    input.mealSlot ?? "slot",
    String(input.monthMultiplier),
  ].join("::");
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (input) => {
    const nextId = buildCartItemId(input);

    set((state) => {
      const existingItem = state.items.find((item) => item.id === nextId);

      if (!existingItem) {
        return {
          items: [
            ...state.items,
            {
              ...input,
              id: nextId,
            },
          ],
        };
      }

      return {
        items: state.items.map((item) => {
          if (item.id !== nextId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + input.quantity,
          };
        }),
      };
    });
  },
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  clearCart: () => set({ items: [] }),
}));
