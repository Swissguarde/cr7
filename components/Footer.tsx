import Container from "./Container";
import Marquee from "react-fast-marquee";
import { FiTwitter, FiInstagram } from "react-icons/fi";
import {
  FaPinterest,
  FaGooglePay,
  FaApplePay,
  FaCcMastercard,
  FaCcVisa,
  FaPaypal,
} from "react-icons/fa";
import NavLinks from "./NavLinks";

const Footer = () => {
  const SOCIALS: NavLinks[] = [
    {
      label: "Twitter",
      url: "https://www.twitter.com",
      type: "external",
      icon: FiTwitter,
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com",
      type: "external",
      icon: FiInstagram,
    },
    {
      label: "Pinterest",
      url: "https://www.pinterest.com",
      type: "external",
      icon: FaPinterest,
    },
  ];

  const HELP_LINKS: NavLinks[] = [
    {
      label: "Shipping & Returns",
      url: "/",
    },
    {
      label: "Privacy Policy",
      url: "/",
    },
    {
      label: "Contact",
      url: "/",
    },
  ];

  const PAYMENT_LOGOS = [
    {
      name: "Apple Pay",
      logo: FaApplePay,
    },
    {
      name: "MasterCard",
      logo: FaCcMastercard,
    },
    {
      name: "Google Pay",
      logo: FaGooglePay,
    },
    {
      name: "Visa",
      logo: FaCcVisa,
    },
    {
      name: "Paypal",
      logo: FaPaypal,
    },
  ];
  return (
    <footer className="w-full border-t border-teal-300 bg-teal-100 bg-opacity-80 backdrop-blur-xl">
      <div className="text-gray-700">
        <Container>
          <div className="flex w-full flex-wrap justify-between gap-10 py-6 xl:flex-nowrap">
            <NavLinks title="Socials" links={SOCIALS} />
            <NavLinks title="Help" links={HELP_LINKS} />

            <Marquee
              gradient={false}
              speed={55}
              pauseOnHover
              className="max-w-sm"
            >
              <div className="flex cursor-pointer items-center gap-6">
                {PAYMENT_LOGOS.map(({ name, logo: Logo }) => {
                  return (
                    <div
                      className="w-12 grayscale duration-100 ease-linear hover:grayscale-0"
                      key={name}
                    >
                      <Logo size={30} />
                    </div>
                  );
                })}
              </div>
            </Marquee>
          </div>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
