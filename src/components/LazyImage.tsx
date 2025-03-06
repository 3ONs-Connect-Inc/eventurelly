import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  blob?: boolean; // Show blob shape only during loading
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  delay = 2000,
  blob = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowImage(true), delay);
      return () => clearTimeout(timer);
    }
  }, [loaded, delay]);

  const blobClass = "w-[569px] h-[486px] rounded-tl-[243px] rounded-tr-[100px] rounded-br-[243px] rounded-bl-[100px] object-cover overflow-hidden";

  return (
    <div className={`relative overflow-hidden ${className} `} >
      {!showImage && (
        <Skeleton
          className="w-full h-full"
          containerClassName={`absolute inset-0 w-full h-full ${blob ? blobClass : ""}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto object-cover transition-opacity duration-500 ${
          showImage ? "opacity-100 visible" : "opacity-0 invisible"
        } ${className}`}
      />
    </div>
  );
};

export default LazyImage;
