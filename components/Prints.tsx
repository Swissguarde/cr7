import Container from "./Container";
import Product from "./Product";
import Link from "next/link";
import Featured from "./Featured";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  categories: Category[];
  products: Product[];
}

const Prints = ({ categories, products }: Props) => {
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => (
        <div key={product._id}>
          <Product product={product} key={product._id} />
        </div>
      ));
  };

  return (
    <AnimatePresence>
      <Container>
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 70 }}
          className="mx-auto max-w-fit pt-10 pb-2 sm:px-4"
        >
          <h2 className="titleText">ORIGINALS</h2>
          <div className="printTab">{showProducts(0)}</div>
          <Link
            href="/shop"
            className="mb-32 mt-8 flex w-full items-center justify-center border border-teal-300 p-2"
          >
            SHOP ALL
          </Link>
          {/* <div className="my-10">
          <Featured
            product={products[Math.floor(Math.random() * products.length)]}
          />
        </div> */}
          <h2 className="titleText">LIMITED EDITIONS</h2>
          <div className="printTab">{showProducts(1)}</div>
          <Link
            href="/shop"
            className="mb-32 mt-8 flex w-full items-center justify-center border border-teal-300 p-2"
          >
            SHOP ALL
          </Link>
          <h2 className="titleText">FEATURED</h2>
          <div className="printTab">{showProducts(2)}</div>
          <Link
            href="/shop"
            className="mb-32 mt-8 flex w-full items-center justify-center border border-teal-300 p-2"
          >
            SHOP ALL
          </Link>
          <h2 className="titleText">LATEST PRINTS</h2>
          <div className="printTab">{showProducts(3)}</div>
          <Link
            href="/shop"
            className="mb-32 mt-8 flex w-full items-center justify-center border border-teal-300 p-2"
          >
            SHOP ALL
          </Link>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
};
export default Prints;
