
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string; // This should be Cloudinary public_id or full URL
  alt: string;
  className?: string;

}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",

}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // If src is a full URL, use it as-is
  const isFullURL = src.startsWith("http");
  const cloudinaryURL = isFullURL
    ? src
    : `https://res.cloudinary.com/${cloudName}/image/upload`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const shouldShowLoader = className.includes("with-loader");

  return (
    <div
      className="h-full flex items-center justify-center"
      ref={containerRef}
    >
      {isVisible && (
        <>
          {shouldShowLoader && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img className="h-12 w-12" src="/images/loader.gif" alt="Loading..." />
            </div>
          )}
          <img
            src={cloudinaryURL}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`${className} transition-opacity duration-300 ease-in-out ${
              !isLoaded && shouldShowLoader ? "opacity-0" : "opacity-100"
            }`}
          />
        </>
      )}
    </div>
  );
};


export default LazyImage;
