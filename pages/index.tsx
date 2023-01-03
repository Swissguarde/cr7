import type { GetServerSideProps } from "next";
import Disclaimer from "../components/Disclaimer";
import Footer from "../components/Footer";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Marq from "../components/Marq";
import Prints from "../components/Prints";
import Seo from "../components/Seo";
import { fetchCategories } from "../utils/fetchCatgories";
import { fetchProducts } from "../utils/fetchProducts";

interface Props {
  categories: Category[];
  products: Product[];
}

const Home = ({ categories, products }: Props) => {
  return (
    <div>
      <Seo title="Home - CR7" />
      <Header />
      <main>
        <Hero />
        <Prints categories={categories} products={products} />
        <Marq />
        <Disclaimer />
        <Footer />
      </main>
    </div>
  );
};

export default Home;

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
