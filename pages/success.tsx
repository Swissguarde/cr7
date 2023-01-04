import Seo from "../components/Seo";
import { runFireworks } from "../utils/fireworks";
import { useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { useRouter } from "next/router";

const Success = () => {
  useEffect(() => {
    runFireworks();
  }, []);

  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <Seo title="CHECKOUT SUCCESS 😊 - CR7" />
      <div className="mt-20 p-20">
        <div className="flex items-center justify-center text-center">
          Thank you for your order{" "}
          <span className="ml-2">
            {" "}
            <GoVerified color="green" />
          </span>
        </div>
        <div className="mx-4 mt-12 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
          <div className="space-y-2 pb-3">
            <p>Your order is confirmed</p>
            <p className="text-sm text-gray-600">
              We’ve accepted your order, and we’re getting it ready. Come back
              to this page for updates on your shipment status.
            </p>
          </div>
          <div className="pt-3 text-sm">
            <p className="font-medium text-gray-600">Order tracking number:</p>
            <p>CNB21441622</p>
          </div>
        </div>

        <div className="my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14">
          <p>Order updates</p>
          <p className="text-sm text-gray-600">
            You’ll get shipping and delivery updates by email and text.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <button onClick={() => router.push("/")} className="productBtn">
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};
export default Success;
