import Container from "../components/Container";
import Seo from "../components/Seo";
import Link from "next/link";
import { runFireworks } from "../utils/fireworks";
import { useEffect } from "react";
import { GoVerified } from "react-icons/go";

const Success = () => {
  useEffect(() => {
    runFireworks();
  }, []);
  return (
    <div>
      <Seo title="CHECKOUT SUCCESS 😊 - CR7" />
      <Container className="h-[100vh] bg-teal-200 p-32 font-serif">
        <div className="text-center text-xl">Thank you for your order</div>
      </Container>
    </div>
  );
};
export default Success;
