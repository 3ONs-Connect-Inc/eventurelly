import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import TeamEvents from "../components/team-building/TeamEvents";
import TeamHero from "../components/team-building/TeamHero";
import { useIconColor } from "../hooks/ui/useIconColor";

const TeamBuildingPage = () => {
  const { bgGradient, bgColor } = useIconColor();

  return (
    <div
      className={`${bgColor}  overflow-hidden  min-h-screen flex flex-col overflow-x-hidden  mt-0  max-w-full `}
    >
      <Seo
        title="Team Building"
        description="Team Building page."
        name="Eventurelly."
        type="website"
      />
      <div
        className={`${bgGradient} min-h-auto flex flex-col items-center justify-center w-full  px-6 sm:px-8 lg:px-12 xl:px-16`}
      >
        <TeamHero />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow ">
        <TeamEvents />
      </div>
      <BackToTop />
      <Footer showButtons={true}/>
    </div>
  );
};

export default TeamBuildingPage;
