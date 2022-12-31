import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProductsInCart,
  clearCart,
  removeFromCart,
  toggleCartQty,
  getCartTotal,
  selectCartState,
} from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { urlFor } from "../sanity";
const Cart = () => {
  const items = useSelector(selectAllProductsInCart);
  const router = useRouter();
  const dispatch = useDispatch();
  const pushToShop = () => {
    router.push("/shop");
  };
  // const totalAmount = useSelector(selectAllCartAmount);
  const {
    items: cartProducts,
    totalItems,
    totalAmount,
  } = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSelector((state: RootState) => state.cart)]);
  return (
    <>
      <motion.section
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed right-0 z-50 mt-12 h-full w-full border-x border-teal-500 border-opacity-40 bg-opacity-95 p-6 font-normal backdrop-blur-lg sm:w-[45%]"
      >
        {items.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-base uppercase text-teal-800 sm:text-4xl">
              your cart is empty
            </div>
            <button
              onClick={pushToShop}
              className="my-2.5 bg-teal-800 p-2 text-white"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="relative h-full">
            <div className="text-center font-mono text-xl">CART SUMMARY</div>
            <div className="mt-6 grid w-full grid-cols-1 gap-3">
              {items.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between space-x-6 p-4 shadow-lg"
                >
                  <div className="flex items-center space-x-7">
                    <img
                      src={urlFor(product.image[0]).url()}
                      className="h-28 w-28 object-cover"
                      alt=""
                    />

                    <div className="font-mono uppercase text-teal-800">
                      <h2>{product.title}</h2>
                      <h2 className="mt-1 text-xs">PRICE: ${product.price}</h2>
                      <h2 className="my-1 text-xs">
                        SUB TOTAL: ${product.price * product.quantity}
                      </h2>
                      <div className="flex flex-1">
                        <button
                          onClick={() =>
                            dispatch(
                              toggleCartQty({ _id: product._id, type: "DEC" })
                            )
                          }
                          className="smallCartBtn"
                        >
                          -
                        </button>
                        <div className="w-8 border-y border-teal-600 bg-teal-200 text-center">
                          {product.quantity}
                        </div>
                        <button
                          onClick={() =>
                            dispatch(
                              toggleCartQty({ _id: product._id, type: "INC" })
                            )
                          }
                          className="smallCartBtn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => dispatch(removeFromCart(product._id))}
                    className="cursor-pointer text-xs text-red-600 underline md:text-base"
                  >
                    REMOVE
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-12 w-full">
              <div>TOTAL ITEM(S): {totalItems}</div>
              <div className="my-4">
                SUBTOTAL TOTAL:{" "}
                <span className="text-green-500">${totalAmount}</span>
              </div>
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full bg-teal-800 p-2 text-center text-white"
              >
                CLEAR CART
              </button>
            </div>
          </div>
        )}
      </motion.section>
    </>
  );
};
export default Cart;
