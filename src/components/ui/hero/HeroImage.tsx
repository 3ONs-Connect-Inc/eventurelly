import React from "react";
import LazyImage from "../../LazyImage";

interface HeroImageProps {
  src: string;
  alt: string;
  rounded?: boolean;
}

const HeroImage: React.FC<HeroImageProps> = ({ src, alt, rounded = false }) => {
  return (
    <div className={`w-full flex justify-center ${rounded ? 'w-1/2 max-md:w-full' :""}`}>
      <div className={`${rounded ? " relative max-w-[90%] mx-auto": ""} `}>
        <LazyImage
          src={src}
          alt={alt}
          className={` 
            ${rounded 
            ? "w-full h-auto object-cover aspect-[569/486]  rounded-[50%] rounded-bl-[5%] rounded-tr-[5%] shadow-lg"
            : "w-full h-auto  object-cover rounded-lg  shadow-lg max-w-full sm:max-w-full"}`}
        />
      </div>
    </div>
  );
};

export default HeroImage;
