import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";

const preloadedState = {
  cart: { items: [], totalItems: 0, totalAmount: 0 },
};
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
  preloadedState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
