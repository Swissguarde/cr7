import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ModalState {
  isOpen: boolean;
  isCartOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  isCartOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state: ModalState) => {
      state.isOpen = !state.isOpen;
      if (state.isCartOpen) {
        state.isCartOpen = false;
      }
    },
    toggleCart: (state: ModalState) => {
      state.isCartOpen = !state.isCartOpen;
      if (state.isOpen) {
        state.isOpen = false;
      }
    },
  },
});

export const { toggleModal, toggleCart } = modalSlice.actions;
export const selectModalState = (state: RootState) => state.modal.isOpen;
export const selectCartState = (state: RootState) => state.modal.isCartOpen;
export default modalSlice.reducer;
