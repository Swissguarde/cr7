import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {
  return (
    <>
      <motion.section
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed right-0 z-50 mt-12 h-full w-full border-x border-teal-500 border-opacity-40 bg-opacity-95 p-6 font-normal backdrop-blur-lg sm:w-[45%]"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
        totam quam dicta soluta unde magni tempore asperiores rerum earum
        laborum est mollitia impedit ab accusantium ex. Deleniti facilis iure
        quidem!
      </motion.section>
    </>
  );
};
export default Cart;
