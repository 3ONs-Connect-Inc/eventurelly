import { tagColorMap } from "../../../data";
import { useIconColor } from "../../hooks/useIconColor";
import LazyImage from "../LazyImage";
import Button from "./Button";

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  className?: string;
  buttonAlignment?: "right" | "center";
  buttonTextColor?: boolean;
  textAlignment?: "left" | "center";
  onClick?: () => void;
  tags?: string[];
  buttonFullWidth?: boolean;
  buttonColor?: boolean;
  imageClassName?: string;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  buttonText,
  className = "",
  buttonAlignment = "right",
  textAlignment = "left",
  buttonFullWidth = false,
  buttonColor = false,
  buttonTextColor = false,
  onClick,
  tags,
  imageClassName = "rounded-lg",
}) => {
  const { textColor, pColor, bgColor2 } = useIconColor();
  return (
    <div
      className={`${bgColor2} border-border-gray  shadow-lg p-4 rounded-lg flex flex-col items-center text-center w-full max-w-xs h-full 
      ${className}
      dark:border-gray-800    transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg 
      `}
    >
      <div
        className={` overflow-hidden
           ${imageClassName}`}
      >
        <LazyImage
          src={image}
          alt={title}
          className="object-cover w-full max-w-full sm:max-w-full"
          delay={3000} 
        />
      </div>
      <div className="self-start flex gap-2 mt-2 mb-4 flex-wrap ">
        {tags?.map((tag, idx) => (
          <span
            key={idx}
            className={`text-[8px] px-2 py-1 rounded-full font-semibold
              ${tagColorMap[tag] || "bg-gray-200 text-black"}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <h2
        className={`text-lg font-bold max-xs:text-base/5 ${textColor} mb-2 "
       ${textAlignment === "left" ? "self-start" : "justify-center"}
      `}
      >
        {title}
      </h2>
      <p className={`text-sm ${pColor} max-xs:text-small font-normal mb-4`}>
        {description}
      </p>
      <div className="flex-grow"></div>
      <div
        className={`flex w-full 
        ${buttonAlignment === "right" ? "justify-end" : "justify-center"}`}
      >
        <Button
          label={buttonText}
          className={` rounded-lg border text-black  text-base font-semibold max-xs:text-small border-border-gray hover-effect
             ${buttonFullWidth ? "w-full" : ""}
                ${buttonColor ? "bg-pink" : "bg-white"}
                ${buttonTextColor ? "text-primary" : ""}
             `}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Card;
