import { HiMenuAlt4 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Container from "./Container";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed left-0 right-0 top-0 z-[60] flex h-12 border-b border-red-400 border-opacity-40 bg-orange-50 bg-opacity-80 font-normal backdrop-blur-lg"
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
            SHOP
          </button>

          <Link
            onClick={handleClick}
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
          <button className="flex items-center justify-center">
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
            className="fixed w-full border-b border-red-400 border-opacity-40 bg-orange-50 bg-opacity-80 py-10 font-normal"
          >
            <Container className="py-6">
              <div className="flex w-full grid-cols-2 items-center justify-between">
                <div className="mt-6 flex flex-col space-y-3 text-gray-700">
                  <Link href="/test">COLLECTIONS</Link>
                  <div className="text-xs">FEATURED PRODUCTS</div>
                  <div className="text-xs">ORIGINALS</div>
                  <div className="text-xs">LIMTED EDITIONS</div>
                </div>

                <div className="hidden space-x-4 sm:flex">
                  {" "}
                  <img
                    src="/ronaldo1.jpg"
                    className="h-40 w-40 object-cover"
                    alt=""
                  />
                  <img
                    src="/ronaldo2.jpg"
                    className="h-40 w-40 object-cover"
                    alt=""
                  />
                  <img
                    src="/ronaldo3.jpg"
                    className="h-40 w-40 object-cover"
                    alt=""
                  />
                </div>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;
