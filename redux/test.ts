import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "./cartSlice";
import { store } from "./store";
export function useInitStore() {
  const dispatch = useDispatch();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "");
    if (items) {
      dispatch(setItems(items));
    }
  }, []);
}

export function useSyncStore() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      localStorage.setItem(
        "items",
        JSON.stringify(store.getState().cart.items)
      );
    });
    return unsubscribe;
  }, []);
}
