import { urlFor } from "../sanity";
import Container from "./Container";
interface Props {
  product: Product;
}

const Product = ({ product }: Props) => {
  return (
    <div className="border border-teal-700 p-3">
      <img
        className="flex h-72 w-full object-cover"
        src={urlFor(product.image[0]).url()}
        alt={product.title}
      />
      <div className="mt-2 flex justify-between">
        <span className="uppercase">{product.title}</span>
        <span className="text-green-700">${product.price}</span>
      </div>
    </div>
  );
};
export default Product;
