import React from "react";
import { useIconColor } from "../../../hooks/useIconColor";
import Button from "../Button";

interface ButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  image: string;
  className?: string;
  disabled?: boolean;
}

interface HeroContentProps {
  title: string;
  description: string;
  alignCenter?: boolean;
  buttonProps?: ButtonProps; 
}

const HeroContent: React.FC<HeroContentProps> = ({  buttonProps, title, description, alignCenter = true }) => {
  const { textColor, pColor } = useIconColor();

  return (
    <div className={`text-${alignCenter ? "center text-center  max-w-5xl mt-6" : "left text-center md:text-left max-md:mt-6   space-y-3 w-1/2  max-md:w-full max-md:text-center max-md:justify-center"} w-full `}>
      <h2 className={`${textColor}  mt-4 max-sm:-mt-2 text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8 font-bold
     ${alignCenter ? '': 'mr-1 max-md:mr-0 max-md:mt-4 flex '} `}>
        {title}
      </h2>
      <p className={`${pColor}  mt-4 font-normal text-base  md:text-xl max-sm:text-tiny
      ${alignCenter ? '' : 'mr-1 max-md:mr-0 '}`}>
        {description}
      </p>
   
      {buttonProps && (
        <div className="flex max-md:justify-center mt-4 max-xs:px-2 ">
          <Button {...buttonProps} />
        </div>
      )}
    </div>
  );
};

export default HeroContent;
