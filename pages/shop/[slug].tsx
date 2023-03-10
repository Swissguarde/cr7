import { GetStaticPaths, GetStaticProps } from "next";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../components/Header";

import Seo from "../../components/Seo";
import { sanityClient, urlFor } from "../../sanity";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import { addToCart } from "../../redux/cartSlice";
import { selectCartOpenState } from "../../redux/modalSlice";
import Image from "next/image";
interface Props {
  product: ProductSlug;
}

interface IProps {
  text: string;
}
const ProductDetails = ({ product }: Props) => {
  const { description, image, price, title } = product;
  const { _id } = product;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const isCartOpen = useSelector(selectCartOpenState);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };
  const decreaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if (newQty < 1) {
        newQty = 1;
      }
      return newQty;
    });
  };

  const addItemToCart = (product: ProductSlug) => {
    let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
    toast.success(`${product.title} added to cart`, {
      position: "bottom-center",
      style: {
        background: "#115E59",
        color: "#FFF",
      },
    });
  };

  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Seo title={`${title} - CR7`} />
      <Header />
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 70 }}
        className={`${isCartOpen && "blurs"}`}
      >
        <div className="w-full max-w-screen-2xl px-4 pt-16 pb-12 sm:px-10 lg:px-32">
          <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
            <div>
              <motion.img
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.3,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 50,
                }}
                src={urlFor(image[index]).url()}
                className="flex h-[350px] w-[420px] border border-teal-300 object-cover p-4 md:h-[450px] md:p-8"
                alt={title}
              />

              <div className="my-2.5 flex items-center space-x-4">
                {image?.map((item, i) => (
                  <Image
                    key={i}
                    width={112}
                    height={112}
                    src={urlFor(item).url()}
                    className={`${
                      i === index && "border border-teal-800"
                    } h-28 w-28 cursor-pointer object-cover p-1`}
                    onMouseEnter={() => setIndex(i)}
                    alt="small_image"
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="max-w-md">
                <motion.div
                  initial={{ y: -130, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.3,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 55,
                  }}
                  className="mb-6 flex items-center justify-between"
                >
                  {" "}
                  <div className="font-mono text-2xl font-bold uppercase text-teal-800 sm:text-4xl">
                    {title}
                  </div>
                  <div className="text-2xl text-green-600 sm:text-2xl">
                    ${price}
                  </div>
                </motion.div>

                <div className="mb-4">
                  <div className="hidden sm:flex">
                    <motion.div
                      initial={{ y: 130, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1.3,
                        delay: 0.5,
                        type: "spring",
                        stiffness: 50,
                      }}
                      className="flex flex-1"
                    >
                      <button
                        onClick={() => decreaseQty()}
                        className="productBtn"
                      >
                        -
                      </button>
                      <div className="border-y border-teal-600 bg-teal-100/20 px-8 py-2.5">
                        {qty}
                      </div>
                      <button
                        onClick={() => increaseQty()}
                        className="productBtn"
                      >
                        +
                      </button>
                    </motion.div>

                    <motion.div
                      initial={{ y: 130, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1.4,
                        delay: 0.6,
                        type: "spring",
                        stiffness: 55,
                      }}
                    >
                      <button
                        onClick={() => addItemToCart(product)}
                        className="bg-teal-800 px-12 py-2.5 text-white outline-none transition duration-500 disabled:bg-teal-600 hover:bg-teal-900 disabled:hover:bg-teal-600"
                      >
                        ADD TO CART
                      </button>
                    </motion.div>
                  </div>

                  {/* Mobile */}
                  <motion.div
                    initial={{ y: 130, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1.3,
                      delay: 0.5,
                      type: "spring",
                      stiffness: 70,
                    }}
                    className="sm:hidden"
                  >
                    <div>
                      <div className="mb-4 flex ">
                        <button
                          onClick={() => decreaseQty()}
                          className="productBtn w-full flex-1"
                        >
                          -
                        </button>
                        <div className="flex-1 border-y border-teal-600 bg-teal-100/20 px-8 py-2.5 text-center">
                          {qty}
                        </div>
                        <button
                          onClick={() => increaseQty()}
                          className="productBtn w-full flex-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => addItemToCart(product)}
                        className="w-full bg-teal-800 px-12 py-2.5 text-white outline-none"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 130, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 80,
                  }}
                >
                  {description[0].children.map((child: IProps) => (
                    <h2 key={child.text} className="text-gray-500">
                      {child.text}
                    </h2>
                  ))}
                </motion.div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </motion.div>
    </>
  );
};
export default ProductDetails;

// Backend
export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug{current}
  }`;
  const products = await sanityClient.fetch(query);
  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const slug = params?.slug;
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await sanityClient.fetch(query);
  // const productsResp = await sanityClient.fetch(productsQuery);

  return {
    props: {
      product,
      // productsResp,
    },
  };
};
