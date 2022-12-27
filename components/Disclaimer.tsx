import Container from "./Container";

const Disclaimer = () => {
  return (
    <Container>
      <div className="mx-auto mb-20 flex max-w-xl flex-col gap-4 border border-red-500 bg-white bg-opacity-50  p-4  text-center font-sans text-sm   backdrop-blur-lg">
        <h3 className="mx-auto w-fit bg-red-500 px-2 py-1 font-bold uppercase tracking-wider text-white">
          Disclaimer
        </h3>
        <p className="text-sm text-neutral-600">
          This is not the real website of{" "}
          <span className="font-bold text-teal-800 underline">
            CRISTIANO RONALDO
          </span>
          . This is a demo project for learning purpose only. His real website
          can be found at{" "}
          <a
            className="uppercase text-orange-600"
            target="_blank"
            href="https://www.cristianoronaldo.com/#cr7"
            rel="noreferrer"
          >
            CRISTIANO.COM
          </a>
        </p>
      </div>
    </Container>
  );
};

export default Disclaimer;
