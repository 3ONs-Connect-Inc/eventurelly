import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

 const useScrollToTop =() => {
    const location = useLocation();
    const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const middleOfPage = document.documentElement.scrollHeight / 2;
      setShowScroll(window.scrollY > middleOfPage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return {scrollToTop, showScroll};
 }
 export default useScrollToTop;