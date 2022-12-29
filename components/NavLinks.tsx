import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  links: NavLinks[];
  onCLick?: () => void;
}

const NavLinks = ({ title, links, onCLick }: Props) => {
  return (
    <div>
      <h3 className="font-serif text-base uppercase tracking-wider">{title}</h3>
      <ul className="flex flex-col gap-1 justify-self-center opacity-80">
        {links.map(({ label, type, url }) => {
          if (type === "external") {
            return (
              <li key={label} className="flex items-center space-x-2 leading-6">
                <a
                  target="_blank"
                  className="text-xs uppercase duration-500 hover:text-teal-500"
                  rel="noreferrer"
                  onClick={onCLick}
                  href={url}
                >
                  {label}
                </a>
              </li>
            );
          }

          return (
            <li key={label}>
              <Link
                href={url}
                onClick={onCLick}
                className="text-xs uppercase duration-500 hover:text-teal-500"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default NavLinks;
