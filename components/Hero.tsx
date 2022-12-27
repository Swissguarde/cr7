import Link from "next/link";
import Container from "./Container";
import { AnimatePresence, motion } from "framer-motion";

const Hero = () => {
  return (
    <AnimatePresence>
      <Container className="flex min-h-[50vh] w-full items-center justify-center overflow-hidden pb-20 text-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className="flex w-full flex-col items-center gap-5 text-center"
        >
          <h1 className="mt-24 bg-gradient-to-b from-teal-700 to-teal-900 bg-clip-text text-center text-6xl font-extrabold text-transparent md:text-9xl lg:mt-40">
            CRISTIANO RONALDO
          </h1>

          <motion.p
            initial={{ y: 130, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.3,
              delay: 0.5,
              type: "spring",
              stiffness: 50,
            }}
            className="text-base capitalize md:text-lg"
          >
            Original paintings and fine art prints of Cristiano.
          </motion.p>

          <motion.h2
            initial={{ y: 135, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              type: "spring",
              stiffness: 50,
            }}
          >
            <Link
              href="/shop"
              className="w-full max-w-[200px] bg-teal-800 px-6  py-4 text-center text-sm uppercase tracking-wider text-teal-50 transition-colors duration-500 ease-in hover:bg-teal-600 md:text-base"
            >
              SHOP ALL
            </Link>
          </motion.h2>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
};
export default Hero;
