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
      <div className={`${rounded 
      ? " relative max-w-[90%] mx-auto"
        : " relative w-full h-auto mx-auto  max-w-full max-h-full overflow-hidden"} `}>
        <LazyImage
          src={src}
          alt={alt}
          className={` 
            ${rounded 
            ? "w-full h-auto object-cover aspect-[569/486]  rounded-[50%] rounded-bl-[5%] rounded-tr-[5%] shadow-lg"
            : "w-full h-full max-h-[400px]   rounded-lg shadow-md "}`}
           
        />
      </div>
    </div>
  );
};

export default HeroImage;
