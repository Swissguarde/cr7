import Link from "next/link";
import Container from "./Container";
import { AnimatePresence, motion } from "framer-motion";

const Hero = () => {
  return (
    <AnimatePresence>
      <Container className="flex min-h-[50vh] w-full items-center justify-center overflow-hidden text-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 150 }}
          className="flex w-full flex-col items-center gap-5 text-center"
        >
          {/* <h1 className="mx-auto mt-16 flex w-fit max-w-4xl flex-col whitespace-nowrap bg-gradient-to-b from-teal-400 to-teal-900 bg-clip-text text-center text-6xl font-extrabold uppercase tracking-wider text-transparent md:text-9xl lg:mt-40">
            <span>CRISTIANO</span> <span>RONALDO</span>
          </h1> */}
          <h1 className="mt-16 bg-gradient-to-b from-teal-600 to-teal-800 bg-clip-text text-center text-6xl font-extrabold text-transparent md:text-9xl lg:mt-40">
            CRISTIANO RONALDO
          </h1>

          <p className="text-base capitalize md:text-lg">
            Original paintings and fine art prints of Cristiano.
          </p>

          <Link
            href="/shop"
            className="w-full max-w-[200px] bg-teal-800 px-6  py-4 text-center text-sm uppercase tracking-wider text-teal-50 transition-colors duration-500 ease-in hover:bg-teal-600 md:text-base"
          >
            Shop All
          </Link>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
};
export default Hero;
