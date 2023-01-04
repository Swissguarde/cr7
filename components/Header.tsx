import { HiMenuAlt4 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Container from "./Container";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProductsInCart } from "../redux/cartSlice";
import {
  toggleCart,
  toggleModal,
  selectCartOpenState,
  selectModalState,
} from "../redux/modalSlice";
import Cart from "./Cart";
import Image from "next/image";

const Header = () => {
  const isOpen = useSelector(selectModalState);
  const isCartOpen = useSelector(selectCartOpenState);
  const items = useSelector(selectAllProductsInCart);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleModal());
  };
  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="menu fixed left-0 right-0 top-0 z-[60] flex h-12 border-b border-teal-500 border-opacity-40 bg-teal-100 bg-opacity-95 font-normal"
      >
        <Container className="flex w-full items-center justify-between">
          <button
            onClick={handleClick}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <FaTimes className="mr-2" />
            ) : (
              <HiMenuAlt4 className="mr-2" />
            )}
            {isOpen ? "CLOSE" : "SHOP"}
          </button>

          <Link
            href="/"
            className="hidden font-serif text-base uppercase tracking-[0.2em] antialiased md:block"
          >
            CRISTIANO RONALDO
          </Link>
          <Link
            href="/"
            className="font-serif text-base uppercase tracking-[0.2em] antialiased sm:hidden"
          >
            CR7
          </Link>
          <button
            onClick={handleCartClick}
            className="flex items-center justify-center"
          >
            <AiOutlineShoppingCart className="mr-1" />
            {isCartOpen ? "CLOSE" : "CART"}
            <span className="ml-1 flex h-5 w-8 items-center justify-center rounded-full bg-zinc-700 p-2 text-xs text-orange-50">
              {items.length}
            </span>
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="menu fixed z-50 w-full border-b border-teal-800 border-opacity-40 py-10 font-normal backdrop-blur-md"
          >
            <Container className="py-6">
              <div className="relative flex w-full grid-cols-2 items-center justify-between px-8">
                <div className="mt-6 flex flex-col space-y-3 text-sm uppercase text-teal-700">
                  <h2 className="text-xl">COLLECTIONS</h2>
                  <Link onClick={handleClick} href="/shop">
                    Originals
                  </Link>
                  <Link onClick={handleClick} href="/shop">
                    Feeatured
                  </Link>
                  <Link onClick={handleClick} href="/shop">
                    Limited Editions
                  </Link>
                  <Link onClick={handleClick} href="/shop">
                    Latest Prints
                  </Link>
                </div>
                <div>
                  <Image
                    src="/hero.jpg"
                    className="rounded-full object-cover"
                    width={160}
                    height={160}
                    alt="hero"
                  />
                </div>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>
    </>
  );
};
export default Header;
