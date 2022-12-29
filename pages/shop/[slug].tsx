import { GetStaticPaths, GetStaticProps } from "next";
import { AnimatePresence, motion } from "framer-motion";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Seo from "../../components/Seo";
import Product from "../../components/Product";
import { sanityClient, urlFor } from "../../sanity";
import Footer from "../../components/Footer";
import { fetchCategories } from "../../utils/fetchCatgories";
import { fetchProducts } from "../../utils/fetchProducts";
interface Props {
  product: ProductSlug;
  products: Product[];
  categories: Category[];
}
interface IProps {
  text: string;
}
const ProductDetails = ({ product, products, categories }: Props) => {
  console.log(product);
  const { description, image, price, title } = product;
  return (
    <>
      <Seo title={`${title} - CR7`} />
      <Header categories={categories} products={products} />

      <div className="w-full max-w-screen-2xl px-4 pt-16 pb-12 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
          <div>
            <img
              className="flex h-[350px] w-[420px] border border-teal-300 object-cover p-8 md:h-[450px]"
              src={urlFor(image[0]).url()}
              alt={title}
            />
          </div>
          <div>
            <div className="max-w-md">
              <div className="mb-6 flex items-center justify-between">
                {" "}
                <div className="text-2xl uppercase text-green-600">{title}</div>
                <div>USD{price}</div>
              </div>

              <div>
                {description[0].children.map((child: IProps) => (
                  <h2 key={child.text} className="text-gray-500">
                    {child.text}
                  </h2>
                ))}
              </div>
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

  const categories = await fetchCategories();
  const products = await fetchProducts();

  return {
    props: {
      product,
      categories,
      products,
    },
  };
};
