import { useEffect, useRef, useState } from "react";
import loader from "/images/loader.gif";

// 👇 Replace with your actual ImageKit base URL
const IMAGEKIT_BASE_URL = `${import.meta.env.VITE_IK_URL_ENDPOINT}`;

interface LazyImageProps {
  src: string; // relative path, like "gallery/hero.jpg"
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  width = 1024,
  height,
  quality = 80,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shouldShowLoader = className.includes("with-loader");

  // Generate optimized ImageKit URL
  const imageKitURL = `${IMAGEKIT_BASE_URL}/${src}?tr=w-${width}${height ? `,h-${height}` : ""},q-${quality},f-auto`;

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-full relative flex items-center justify-center"
      ref={containerRef}
    >
      {isVisible && (
        <>
          {shouldShowLoader && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img className="h-12 w-12" src={loader} alt="Loading..." />
            </div>
          )}
          <img
            src={imageKitURL}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`${className} transition-opacity duration-300 ease-in-out ${!isLoaded && shouldShowLoader ? "opacity-0" : "opacity-100"}`}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;
