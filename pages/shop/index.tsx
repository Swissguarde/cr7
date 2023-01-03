import { GetServerSideProps } from "next";
import Container from "../../components/Container";
import FlipMove from "react-flip-move";
import Header from "../../components/Header";
import Seo from "../../components/Seo";
import { fetchCategories } from "../../utils/fetchCatgories";
import { fetchProducts } from "../../utils/fetchProducts";
import { Tab } from "@headlessui/react";
import Product from "../../components/Product";
import Marq from "../../components/Marq";
import Footer from "../../components/Footer";

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
    <div className=" text-teal-800">
      <Seo title="SHOP - CR7" />
      <Header />
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-10 lg:px-20">
        <div className="pt-20">
          <div className="text-center font-serif text-4xl text-teal-800 md:text-6xl">
            SHOP
          </div>

          <div className="mt-12">
            <Tab.Group>
              <div className="grid grid-cols-12">
                <Tab.List className="col-span-12 mb-6 h-fit border border-teal-800 p-6 md:col-span-3">
                  {categories.map((category) => (
                    <Tab
                      className={({ selected }) =>
                        `grid grid-cols-1 uppercase ${
                          selected && "text-teal-500"
                        }`
                      }
                      key={category._id}
                    >
                      {category.title}
                    </Tab>
                  ))}
                </Tab.List>
                <div className="col-span-12 md:col-span-9">
                  <Tab.Panels className="mx-auto w-full pb-24 sm:max-w-5xl sm:px-4">
                    <Tab.Panel className="tabPanel">
                      {showProducts(0)}
                    </Tab.Panel>
                    <Tab.Panel className="tabPanel">
                      {showProducts(1)}
                    </Tab.Panel>
                    <Tab.Panel className="tabPanel">
                      {showProducts(2)}
                    </Tab.Panel>
                    <Tab.Panel className="tabPanel">
                      {showProducts(3)}
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </div>
            </Tab.Group>
          </div>
        </div>
      </div>
      <Marq />
      <Footer />
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
