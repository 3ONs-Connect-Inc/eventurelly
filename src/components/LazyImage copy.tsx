import { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full">
      <img
        ref={imgRef}
        src={isVisible ? src : ""}
        alt={alt}
        className={className}
      />
    </div>
  );
};

export default LazyImage;
