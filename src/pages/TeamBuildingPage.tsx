
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import TeamEvents from "../components/team-building/TeamEvents";
import TeamHero from "../components/team-building/TeamHero";
import { useColor } from "../hooks/ui/useColor";

const TeamBuildingPage = () => {
  const { bgGradient, bgColor } = useColor();

  return (
    <div
      className={`${bgColor}  overflow-hidden  min-h-screen flex flex-col overflow-x-hidden  mt-0  max-w-full `}
    >
     <Seo
  title="Team Building Events | Strengthen Your Team with Eventurelly"
  description="Discover and organize engaging team building events with Eventurelly. Boost collaboration, communication, and morale through fun and effective activities."
  name="Eventurelly"
  type="website"
/>

      <div
        className={`${bgGradient} min-h-auto flex flex-col items-center justify-center w-full  px-6 sm:px-8 lg:px-12 xl:px-16`}
      >
        <TeamHero />
        <div className="w-screen  h-10 bg-gradient-to-b from-transparent to-white dark:to-[var(--dark)]" />
      </div>
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow  ">
        <div className="max-w-7xl  mx-auto px-6 max-xs:px-0">
          <TeamEvents />
        </div>
      </div>  

      <BackToTop />
      <div className="max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16 ">
        <Footer showButtons={true} />
      </div>
    </div>
  );
};

export default TeamBuildingPage;
