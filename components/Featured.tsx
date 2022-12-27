import { urlFor } from "../sanity";

interface Props {
  product: Product;
}

const Featured = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
      <div className="border border-teal-800 p-12">
        <img
          className="h-96 w-full border border-teal-800 object-cover"
          src={urlFor(product.image[0]).url()}
          alt=""
        />
      </div>
      <div>{product.title}</div>
    </div>
  );
};
export default Featured;
