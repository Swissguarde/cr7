import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CartState {
  items: ProductSlug[];
  totalItems: number;
  totalAmount: number;
}
// const fetchFromLocalStorage = () => {
//     let cart = localStorage.getItem("cart");
//     if (cart) {
//       return JSON.parse(localStorage.getItem("cart") || "");
//     } else {
//       return [];
//     }
//   }

// const storeInLocalStorage = (data: ProductSlug[]) => {
//   localStorage.setItem("cart", JSON.stringify(data));
// };

const initialState: CartState = {
  // items: fetchFromLocalStorage(),
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<ProductSlug>) => {
      const tempItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (tempItem) {
        const tempCart = state.items.map((item) => {
          if (item._id === action.payload._id) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalPrice = newQty * item.price;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newTotalPrice,
            };
          } else {
            return item;
          }
        });
        state.items = tempCart;
        // storeInLocalStorage(state.items);
      } else {
        state.items.push(action.payload);
        // storeInLocalStorage(state.items);
      }
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      const tempCart = state.items.filter(
        (item) => item._id !== action.payload
      );
      state.items = tempCart;
      // storeInLocalStorage(state.items);
    },
    clearCart: (state: CartState) => {
      state.items = [];
      // storeInLocalStorage(state.items);
    },
    getCartTotal: (state: CartState) => {
      state.totalAmount = state.items.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalItems = state.items.length;
    },
    toggleCartQty: (
      state: CartState,
      action: PayloadAction<{ _id: string; type: string }>
    ) => {
      const tempCart = state.items.map((item) => {
        if (item._id === action.payload._id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.price;
          if (action.payload.type === "INC") {
            tempQty++;
            tempTotalPrice = tempQty * item.price;
          }
          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.price;
          }
          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });
      state.items = tempCart;
      // storeInLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  getCartTotal,
  clearCart,
  toggleCartQty,
} = cartSlice.actions;
export const selectAllProductsInCart = (state: RootState) => state.cart.items;

export const selectAllCartAmount = (state: RootState) => state.cart.totalAmount;

export const selectCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
