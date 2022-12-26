import Container from "./Container";
import Product from "./Product";
import Link from "next/link";

interface Props {
  categories: Category[];
  products: Product[];
}

const Prints = ({ categories, products }: Props) => {
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => (
        <div>
          <Product product={product} key={product._id} />
        </div>
      ));
  };

  return (
    <Container className="mt-20">
      <div className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
        <h2 className="titleText">ORIGINALS</h2>
        <div className="printTab">{showProducts(0)}</div>
        <Link
          href="/shop"
          className="mb-32 mt-8 flex w-full items-center justify-center border border-teal-300 p-2"
        >
          SHOP ALL
        </Link>
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
      </div>
    </Container>
  );
};
export default Prints;
