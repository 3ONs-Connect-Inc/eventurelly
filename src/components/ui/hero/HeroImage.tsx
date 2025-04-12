import React from "react";
import LazyImage from "../../LazyImage";

interface HeroImageProps {
  src: string;
  alt: string;
  rounded?: boolean;
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ className, src, alt, rounded = false }) => {
  return (
    <div className={`w-full flex justify-center ${rounded ? 'w-1/2 max-md:w-full' : ""}`}>
  <div className={`relative 
    ${rounded 
      ? "w-full max-md:w-[90%] rounded-hero-image mx-auto flex justify-center" 
      : " w-full h-auto max-w-full  max-h-full overflow-hidden"
    }`}
  >
    <LazyImage
      src={src}
      alt={alt}
      className={`
        ${rounded 
          ? "w-full object-cover aspect-[569/486] rounded-[50%] rounded-bl-[5%] rounded-tr-[5%] shadow-lg"
          : "w-full h-full max-h-[400px] rounded-lg shadow-md"
        } ${className}`}
    />
  </div>
</div>
    
  );
};

export default HeroImage;
