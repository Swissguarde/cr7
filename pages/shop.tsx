import Container from "../components/Container";
import { Tab } from "@headlessui/react";

import { fetchCategories } from "../utils/fetchCatgories";
import { fetchProducts } from "../utils/fetchProducts";
import type { GetServerSideProps } from "next";
import Seo from "../components/Seo";
import Header from "../components/Header";
import Product from "../components/Product";

interface Props {
  categories: Category[];
  products: Product[];
}

const Shop = ({ categories, products }: Props) => {
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => <Product product={product} key={product._id} />);
  };
  return (
    <div className="px-8 text-teal-700">
      <Seo title="SHOP - CR7" />
      <Header categories={categories} products={products} />

      <h2 className="mt-20 mb-14 text-center font-serif text-4xl uppercase tracking-[0.2em] antialiased">
        SHOP
      </h2>

      <Tab.Group>
        <Tab.List className="flex justify-center">
          {categories.map((category) => (
            <Tab
              key={category._id}
              id={category._id}
              className={({ selected }) =>
                `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                  selected
                    ? "borderGradient bg-teal-800 text-white"
                    : "border-b-2 border-teal-800 text-[#747474]"
                }`
              }
            >
              {category.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
          <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
          <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
          <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
          <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default Shop;

// Backend
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  return {
    props: {
      categories,
      products,
    },
  };
};
