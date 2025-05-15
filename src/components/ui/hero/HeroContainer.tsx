import React from "react";
import { cn } from "../../../utils/cn";

interface HeroContainerProps {
  children: React.ReactNode;
  className?: string;
}

const HeroContainer: React.FC<HeroContainerProps> = ({ children, className }) => {
  return (
    <div className={cn( "mt-10 flex flex-col items-center w-full max-w-7xl mx-auto  px-6 max-xs:px-0 ", className)}>
      {children}
    </div>
  );
};

export default HeroContainer;
