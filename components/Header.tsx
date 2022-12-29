import { HiMenuAlt4 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Container from "./Container";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { urlFor } from "../sanity";

import { useState } from "react";
import Cart from "./Cart";

interface Props {
  categories: Category[];
  products: Product[];
}

const Header = ({ categories, products }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setIsCartOpen(false);
  };
  const handleCartClick = () => {
    setIsCartOpen((prev) => !prev);
    setIsOpen(false);
  };
  const firstThreeProducts = products.slice(0, 3);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed left-0 right-0 top-0 z-[60] flex h-12 border-b border-teal-500 border-opacity-40 bg-teal-100 bg-opacity-95 font-normal"
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
            <AiOutlineShoppingCart className="mr-2" />
            CART
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
            className="fixed z-50 w-full border-b border-teal-800 border-opacity-40 py-10 font-normal backdrop-blur-md"
          >
            <Container className="py-6">
              <div className="relative flex w-full grid-cols-2 items-center justify-between px-8">
                <div className="mt-6 flex flex-col space-y-3 text-gray-700">
                  <Link href="/test">COLLECTIONS</Link>
                  {categories?.map((category) => (
                    <div key={category._id} className="text-xs uppercase">
                      {category.title}
                    </div>
                  ))}
                </div>

                <div className="hidden space-x-4 sm:flex">
                  {firstThreeProducts.map((product) => (
                    <div className="border border-teal-600 object-cover p-3">
                      <Link href={`/shop/${product.slug.current}`}>
                        <img
                          key={product._id}
                          src={urlFor(product.image[0]).url()}
                          alt=""
                          className="mx-auto h-60 w-48 object-cover"
                        />
                        <div className="flex justify-between space-x-3">
                          <div>{product.title}</div>
                          <div className="text-green-500">${product.price}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
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
