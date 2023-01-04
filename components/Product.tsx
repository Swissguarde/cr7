import { urlFor } from "../sanity";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  product: Product;
}

const Product = ({ product }: Props) => {
  const { slug } = product;
  return (
    <Link href={`/shop/${slug.current}`}>
      <motion.div
        initial={{ y: 130, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.3,
          delay: 0.5,
          type: "spring",
          stiffness: 50,
        }}
        className="border border-teal-700 p-3 text-teal-900"
      >
        <img
          className="flex h-72 w-full object-cover"
          src={urlFor(product.image[0]).url()}
          alt={product.title}
        />
        <div className="mt-2 flex justify-between">
          <span className="uppercase">{product.title}</span>
          <span className="text-green-700">${product.price}</span>
        </div>
      </motion.div>
    </Link>
  );
};
export default Product;
