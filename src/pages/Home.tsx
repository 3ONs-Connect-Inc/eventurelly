import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Brands } from "../components/Home/Brands";
import { HeroSection } from "../components/Home/HeroSection";
import { SearchBar } from "../components/Home/SearchBar";
import { useIconColor } from "../hooks/useIconColor";
import Seo from "../components/Seo";
import TopPick from "../components/Home/TopPick";
import Compliance from "../components/Home/Compliance";
import TeamBonding from "../components/Home/TeamBonding";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bgGradient, bgColor } = useIconColor();
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

  const handleNavigation = (title: string) => {
    navigate(
      `/sign-up?role=${title === "Corporate Admin" ? "admin" : "member"}`
    );
  };

  return (
    <div className=" overflow-hidden bg-white min-h-screen  overflow-x-hidden   flex flex-col mt-0  max-w-full">
      <Seo
        title="Home"
        description="Home page."
        name="Eventurelly."
        type="article"
      />

      <div
        className={`${bgGradient} min-h-auto flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16`}
      >
        <SearchBar />
        <HeroSection />
      </div>
      <Brands />

      <div
        className={`w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow  ${bgColor}`}
      >
        <div className="max-w-7xl   mx-auto">
          <TopPick />
          <Compliance />
          <TeamBonding handleNavigation={handleNavigation} />
        </div>
      </div>

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-primary bg-hover max-xs:text-small
           text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer
           hover:bg-opacity-80 transition flex flex-col items-center text-center"
        >
          <span>↑ Back to Top</span>
        </button>
      )}
      <Footer />
    </div>
  );
};

export default Home;
