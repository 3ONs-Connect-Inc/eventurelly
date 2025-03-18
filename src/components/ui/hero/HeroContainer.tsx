import React from "react";

interface HeroContainerProps {
  children: React.ReactNode;
  className?: string;
}

const HeroContainer: React.FC<HeroContainerProps> = ({ children, className }) => {
  return (
    <div className={`mt-10 flex flex-col items-center w-full max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default HeroContainer;
