import Container from "./Container";
import Marquee from "react-fast-marquee";
import { toast } from "react-hot-toast";
const Marq = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("EMAIL", email);
    e.currentTarget.reset();

    setTimeout(() => {
      toast.success("This is a dummy form. No email would be sent!", {
        position: "bottom-center",
        style: {
          background: "#115E59",
          color: "#FFF",
        },
      });
    }, 1000);
  };
  const reviews = [
    {
      id: 1,
      text: "SIIUUUUUUU",
    },
    {
      id: 2,
      text: "VIVA RONALDO!!!",
    },
    {
      id: 3,
      text: "muchas gracias aficion esto para vosotros",
    },
    {
      id: 4,
      text: "Ronaldo, Ronaldo, he's the king of Old Trafford",
    },
  ];
  return (
    <div className="my-10 pb-20 text-teal-800">
      <Marquee
        gradient={false}
        speed={35}
        pauseOnHover
        className="mb-10 w-full border-y border-teal-800 p-3"
      >
        {reviews.map(({ id, text }) => {
          return (
            <h2
              className="mr-2 bg-gradient-to-r from-teal-300 to-teal-700 bg-clip-text text-transparent"
              key={id}
            >
              {text},
            </h2>
          );
        })}
      </Marquee>
      <Container>
        <div className="mx-auto w-full border border-teal-800 p-6 md:p-12">
          <div className="mx-auto text-center text-2xl font-bold uppercase sm:max-w-2xl md:text-4xl">
            JOIN OUR MAILING LIST FOR DISCOUNTS AND LATEST WORKS
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative mx-auto mt-6 flex w-full sm:max-w-md">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-teal-700 p-2.5 outline-none"
              />
              <button
                type="submit"
                className="h-[51px] w-fit bg-teal-700 p-2 text-center text-white"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default Marq;
