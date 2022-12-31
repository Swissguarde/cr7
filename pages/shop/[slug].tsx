import { GetStaticPaths, GetStaticProps } from "next";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../components/Header";
import FlipMove from "react-flip-move";

import Seo from "../../components/Seo";
import { sanityClient, urlFor } from "../../sanity";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import { addToCart } from "../../redux/cartSlice";
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

      <div className="w-full max-w-screen-2xl px-4 pt-16 pb-12 sm:px-10 lg:px-32">
        <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
          <div>
            {/* <img
              className="flex h-[350px] w-[420px] border border-teal-300 object-cover p-8 md:h-[450px]"
              src={urlFor(image[0]).url()}
              alt={title}
            /> */}
            <img
              src={urlFor(image[index]).url()}
              className="flex h-[350px] w-[420px] border border-teal-300 object-cover p-8 md:h-[450px]"
              alt={title}
            />

            <div className="my-2.5 flex items-center space-x-4">
              {image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item).url()}
                  className={`${
                    i === index && "border border-teal-800"
                  } h-28 w-28 cursor-pointer rounded-md object-cover p-1`}
                  onMouseEnter={() => setIndex(i)}
                  alt="small_image"
                />
              ))}
            </div>
          </div>
          <div>
            <div className="max-w-md">
              <div className="mb-6 flex items-center justify-between">
                {" "}
                <div className="font-mono text-2xl font-bold uppercase text-teal-800 sm:text-4xl">
                  {title}
                </div>
                <div className="text-2xl text-green-600 sm:text-2xl">
                  ${price}
                </div>
              </div>

              <div className="mb-4">
                <div className="hidden sm:flex">
                  <div className="flex flex-1">
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
                  </div>

                  <div>
                    <button
                      onClick={() => addItemToCart(product)}
                      className="bg-teal-800 px-12 py-2.5 text-white outline-none transition duration-500 disabled:bg-teal-600 hover:bg-teal-900 disabled:hover:bg-teal-600"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* Mobile */}
                <div className="sm:hidden">
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
                </div>
              </div>

              <div>
                {description[0].children.map((child: IProps) => (
                  <h2 key={child.text} className="text-gray-500">
                    {child.text}
                  </h2>
                ))}
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
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

  return {
    props: {
      product,
    },
  };
};
