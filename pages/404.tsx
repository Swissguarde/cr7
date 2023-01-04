import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";

const NotFound = () => {
  return (
    <>
      <div>
        <Seo title="404 - CR7" />
        <Header />
        <Container className="mt-20">
          <h2>Sorry! Page Not Found!</h2>
        </Container>
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default NotFound;
