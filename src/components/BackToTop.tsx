import React from "react";
import useScrollToTop from "../hooks/useScrollToTop";

const BackToTop: React.FC = () => {
  const { showScroll, scrollToTop } = useScrollToTop();

  if (!showScroll) return null; 

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 bg-primary bg-hover max-xs:text-small
       text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer
       hover:bg-opacity-80 transition flex flex-col items-center text-center"
    >
      <span>↑ Back to Top</span>
    </button>
  );
};

export default BackToTop;
