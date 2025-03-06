import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/Home/HeroSection";
import { SearchBar } from "../components/Home/SearchBar";
import { useIconColor } from "../hooks/useIconColor";
import Seo from "../components/Seo";
import TopPick from "../components/Home/TopPick";
import TeamBonding from "../components/Home/TeamBonding";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { bgGradient, bgColor } = useIconColor();

  const handleNavigation = (title: string) => {
    navigate(
      `/sign-up?role=${title === "Corporate Admin" ? "admin" : "member"}`
    );
  };

  return (
    <div className=" overflow-hidden  min-h-screen  overflow-x-hidden   flex flex-col mt-0  max-w-full">
      <Seo
        title="Home"
        description="Home page."
        name="Eventurelly."
        type="website"
      />

      <div
        className={`${bgGradient} min-h-auto flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16`}
      >
     <div className="w-full max-w-7xl mx-auto">
     <SearchBar />
     </div>
        <HeroSection />
      </div>

      <div
        className={`w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow  ${bgColor}`}
      >
        <div className="max-w-7xl mx-auto">
          <TopPick />
          <TeamBonding handleNavigation={handleNavigation} />
        </div>
      </div>

    <BackToTop />
      <Footer />
    </div>
  );
};

export default Home;
