import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stripe } from "stripe";
import {
  selectAllProductsInCart,
  clearCart,
  removeFromCart,
  toggleCartQty,
  getCartTotal,
} from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { urlFor } from "../sanity";
import { fetchPostJSON } from "../utils/api-Helpers";
import getStripe from "../utils/get-stripejs";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const items = useSelector(selectAllProductsInCart);
  const router = useRouter();
  const dispatch = useDispatch();

  const pushTo = (route: string) => {
    router.push(route);
  };
  const { totalItems, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSelector((state: RootState) => state.cart)]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      { items: items }
    );

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);

    setLoading(false);
  };
  return (
    <>
      <motion.section
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed right-0 z-50 mt-12 mb-40 h-full w-full overflow-scroll border-x border-teal-500 border-opacity-40 bg-opacity-95 p-6 font-normal backdrop-blur-3xl sm:w-[45%]"
      >
        {items.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-base uppercase text-teal-800 sm:text-4xl">
              your cart is empty
            </div>
            <button
              onClick={() => pushTo("/shop")}
              className="my-2.5 bg-teal-800 p-2 text-white"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="relative h-full">
            <div className="text-center font-mono text-xl text-teal-800">
              CART SUMMARY
            </div>
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
                      <h2 className="mt-1 text-xs">
                        PRICE: ${product.price} ({product.quantity})
                      </h2>
                      <h2 className="my-1 text-xs">
                        SUB TOTAL:{" "}
                        <span className="font-bold">
                          ${product.price * product.quantity}
                        </span>
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
            <div className="my-20 w-full">
              <div className="my-4 flex justify-between border-y border-teal-800 p-2">
                <div>SUBTOTAL TOTAL: {totalItems} ITEM(S)</div>
                <div>
                  <span className="text-green-500">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full bg-teal-800 p-2 text-center text-white"
              >
                CLEAR CART
              </button>
              <div className="my-4 flex space-x-2 pb-40">
                <button
                  onClick={() => pushTo("/shop")}
                  className="w-full flex-1 bg-teal-400 p-2 text-white"
                >
                  CONTINUE SHOPPING
                </button>

                <button
                  onClick={createCheckoutSession}
                  className="cartBtn w-full flex-1"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.section>
    </>
  );
};
export default Cart;
