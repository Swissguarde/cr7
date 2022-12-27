import Container from "./Container";

const Marquee = () => {
  return (
    <Container className="my-10 pb-20 text-teal-800">
      <div className="mx-auto w-full border border-teal-800 p-6 md:p-12">
        <div className="mx-auto text-center text-2xl font-bold uppercase sm:max-w-2xl md:text-4xl">
          JOIN OUR MAILING LIST FOR DISCOUNTS AND LATEST WORKS
        </div>

        <form>
          <div className="relative mx-auto mt-6 flex w-full sm:max-w-md">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-teal-700 p-2.5 outline-none"
            />
            <button className="h-[51px] w-fit bg-teal-700 p-2 text-center text-white">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};
export default Marquee;
