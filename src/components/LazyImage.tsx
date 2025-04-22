import { useState, useEffect, useRef } from "react";
import imageCompression from "browser-image-compression";
import loader from '/images/loader.gif'

const LazyImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [compressedSrc, setCompressedSrc] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Detect if loader should be shown based on class
  const shouldShowLoader = className.includes("with-loader");

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
              setCompressedSrc(src); // fallback
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
    <div
      className="h-full relative flex items-center justify-center"
      ref={containerRef}
    >
      {isVisible && (
        <>
          {isCompressing && shouldShowLoader ? (
            <div className="flex items-center justify-center h-[60px] w-full">
              <div className="flex justify-center items-center h-full">
                <img className="h-16 w-16" src={loader} alt="" />
              </div>
            </div>
          ) : (
            <img
              src={compressedSrc}
              alt={alt}
              className={`${className} transition-all duration-300 ease-in-out`}
              loading="lazy"
            />
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;
