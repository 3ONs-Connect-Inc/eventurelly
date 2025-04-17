
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
  scale =false,
  onClick,
  //tags,
  imageClassName = "rounded-lg",
}) => {
  const { textColor, pColor, bgColor2 } = useIconColor();
// Format the date
const formattedDate = date
? format(new Date(date), "MMMM d, yyyy ")
: "";

  return (
    <div
  className={`${bgColor2} border-border-foreground shadow-lg p-4 rounded-lg flex flex-col items-center text-center 
      w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl
      ${className} ${scale ? "hover:scale-105 " : "hover:scale-98"}
      dark:border-gray-800 transition-transform duration-300 ease-in-out hover:shadow-lg 
  `} //min-h-[400px]  max-md:min-h-[320px]
>

      <div
        className={` overflow-hidden 
           ${imageClassName}`}//w-full aspect-[4/3] sm:h-32 md:h-40
      >
        <LazyImage
          src={image}
          alt={title}
          className="object-cover w-full h-full max-w-full sm:max-w-full"
        />
      </div>



      <div className="flex flex-col flex-grow w-full">
      {/* {Array.isArray(tags) && tags.length > 0 && (
  <div className="self-start flex gap-2 mt-2 flex-wrap">
    {tags.map((tag, idx) => (
      <span
        key={idx}
        className={`text-[8px] px-2 py-1 rounded-full font-semibold
    ${tagColorMap[tag] || "bg-gray-200 text-black"}`}
      >
        {tag}
      </span>
    ))}
  </div>
)} */}

      <h2
        className={`text-lg font-bold max-xs:text-base/5 ${textColor} mb-2 truncate w-full flex-grow"
       ${textAlignment === "left" ? "self-start mt-2" : "justify-center"}
      `}
      >
        {title}
      </h2>
      <p className={`text-sm ${pColor} max-xs:text-small font-normal mb-2 line-clamp-3 max-md:line-clamp-2 flex-grow`}>
        {description}
      </p>

      {formattedDate && (
        <p className="text-sm self-start font-bold ">
           {formattedDate}
        </p>
      )}
      {location && (
        <p className={`${pColor} text-sm self-start mb-4 font-normal`}>
           {location}
        </p>
      )}
      </div>
   

      {/* <div className="flex-grow "></div> */}
      <div
        className={`flex w-full 
        ${buttonAlignment === "right" ? "justify-end" : "justify-center"}`}
      >
        <Button
          label={buttonText}
          className={` rounded-lg border text-black  text-base font-semibold max-xs:text-small border-border-foreground hover-effect
             ${buttonFullWidth ? "w-full " : ""}
                ${buttonColor ? "bg-secondary" : "bg-white"}
                ${buttonTextColor ? "text-primary" : ""}
             `}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Card;
