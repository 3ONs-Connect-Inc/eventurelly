import React from "react";
import { useColor } from "../../../hooks/ui/useColor";
import Button from "../Button";
import { cn } from "../../../utils/cn";

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

const HeroContent: React.FC<HeroContentProps> = ({
  buttonProps,
  title,
  description,
  alignCenter = true,
}) => {
  const { textColor, pColor } = useColor();

  return (
    <div
      className={cn(
        "w-full",
        alignCenter
          ? "text-center max-w-5xl mt-6"
          : "text-left md:text-left   max-md:w-full max-md:text-center max-md:justify-center"
      )}
    >
      <h2
        className={cn(
          textColor,
          " text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8 font-bold",
          alignCenter
            ? "text-center"
            : "text-center justify-center md:text-left  mr-1 max-md:mr-0 "
        )}
      >
        {title}
      </h2>

      <p
        className={cn(
          pColor,
          "mt-4 font-normal text-base md:text-xl max-sm:text-tiny",
          alignCenter ? "text-center" : "mr-1 max-md:mr-0"
        )}
      >
        {description}
      </p>

      {buttonProps && (
        <div className="flex max-md:justify-center mt-8 max-xs:px-2">
          <Button {...buttonProps} />
        </div>
      )}
    </div>
  );
};
export default HeroContent;
