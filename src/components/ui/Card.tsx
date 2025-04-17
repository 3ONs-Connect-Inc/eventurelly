
import { useIconColor } from "../../hooks/ui/useIconColor";
import LazyImage from "../LazyImage";
import Button from "./Button";
import { format } from "date-fns";

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
  date?: string;       
  location?: string;  
  buttonFullWidth?: boolean;
  buttonColor?: boolean;
  imageClassName?: string;
  scale?: boolean;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  date,
  location,
  buttonText,
  className = "",
  buttonAlignment = "right",
  textAlignment = "left",
  buttonFullWidth = false,
  buttonColor = false,
  buttonTextColor = false,
  scale = false,
  onClick,
  imageClassName = "rounded-lg",
}) => {
  const { textColor, pColor, bgColor2 } = useIconColor();

  const formattedDate = date
    ? format(new Date(date), "MMMM d, yyyy ")
    : "";

  return (
    <div
      className={`${bgColor2} border-border-foreground shadow-lg p-4 rounded-lg flex flex-col justify-between
        w-full h-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl
        ${className} ${scale ? "hover:scale-105" : "hover:scale-98"}
        dark:border-gray-800 transition-transform duration-300 ease-in-out hover:shadow-lg`}
    >
      <div className={`w-full h-48 overflow-hidden mb-4 ${imageClassName}`}>
        <LazyImage
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-grow w-full">
        <h2
          className={`text-lg font-bold max-xs:text-base/5 ${textColor} mb-2 truncate w-full ${
            textAlignment === "left" ? "self-start mt-2" : "justify-center"
          }`}
        >
          {title}
        </h2>

        <div className="min-h-[3rem] mb-2">
          <p className={`text-sm ${pColor} font-normal line-clamp-2`}>
            {description || "\u00A0" /* Ensures consistent spacing */}
          </p>
        </div>

        {formattedDate && (
          <p className="text-sm self-start font-bold">{formattedDate}</p>
        )}
        {location && (
          <p className={`${pColor} text-sm self-start mb-4 font-normal`}>
            {location}
          </p>
        )}
      </div>

      <div
        className={`flex w-full mt-auto ${
          buttonAlignment === "right" ? "justify-end" : "justify-center"
        }`}
      >
        <Button
          label={buttonText}
          className={`rounded-lg border text-black text-base font-semibold max-xs:text-small border-border-foreground hover-effect
            ${buttonFullWidth ? "w-full" : ""}
            ${buttonColor ? "bg-secondary" : "bg-white"}
            ${buttonTextColor ? "text-primary" : ""}`}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Card;
