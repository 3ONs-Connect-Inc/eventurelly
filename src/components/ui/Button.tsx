import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  to?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  image?: string; 
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  to,
  type = "button",
  className = "",
  disabled,
  image,
}) => {
  const baseClasses =
    "px-6 py-2 font-semibold shadow-md dark:border-0 dark:shadow-lg dark:shadow-gray-800 rounded-lg transition duration-300 cursor-pointer";
   
    const handleClick = (e: React.MouseEvent) => {
      if (onClick) {
        onClick();
      } else if (to && to.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const content = (
      <div className={`${image && "flex max-md:justify-center  max-xs:px-0   px-4 space-x-4  items-center"} `}>
        <span>{label}</span>
        {image && <img src={image} alt="icon" className="w-2.5 h-2.5" />} 
      </div>
    );

    if (to && !to.startsWith("#")) {
      return (
        <Link to={to} className={`${baseClasses} ${className}`}>
          {content}
        </Link>
      );
    }

  return (
    <button
      type={type}
      //onClick={onClick}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${className} `}
    >
      {content}
    </button>
  );
};

export default Button;
