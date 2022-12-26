import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
const Container = ({
  children,
  className,
}: ContainerProps): React.ReactElement => {
  return (
    <div
      className={`mx-auto flex w-full max-w-screen-2xl px-4 sm:px-10 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
};
export default Container;
