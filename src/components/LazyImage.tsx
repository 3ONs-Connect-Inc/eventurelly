import { useState, useEffect, useRef } from "react";
import imageCompression from "browser-image-compression";

const LazyImage = ({
  src,
  alt,
  className,
  placeholder,
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [compressedSrc, setCompressedSrc] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();

            try {
              const response = await fetch(src);
              const blob = await response.blob();
              const file = new File([blob], "image.jpg", { type: blob.type });

              const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
              });

              const compressedUrl = URL.createObjectURL(compressedFile);
              setCompressedSrc(compressedUrl);
            } catch (error) {
              console.error("Image compression failed:", error);
              setCompressedSrc(src); // fallback to original
            } finally {
              setIsCompressing(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div className="h-full" ref={containerRef}>
      {isVisible && (
        <img
          src={isCompressing ? placeholder || src : compressedSrc}
          alt={alt}
          className={`${className} ${
            isCompressing ? "blur-none scale-105" : "blur-0 transition-all duration-300 ease-in-out"
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
