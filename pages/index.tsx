import type { GetServerSideProps, NextPage } from "next";

import Header from "../components/Header";
import Hero from "../components/Hero";

import Seo from "../components/Seo";
import { fetchCategories } from "../utils/fetchCatgories";

interface Props {
  categories: Category[];
}
const Home = ({ categories }: Props) => {
  console.log(categories);
  return (
    <div>
      <Seo title="Home - CR7" />
      <Header />
      <Hero />
    </div>
  );
};

export default Home;

// Backend
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fetchCategories();
  return {
    props: {
      categories,
    },
  };
};
