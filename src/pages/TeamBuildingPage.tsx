import { useNavigate } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import TeamBonding from "../components/Home/TeamBonding";
import Seo from "../components/Seo";
import TeamEvents from "../components/team-building/TeamEvents";
import TeamHero from "../components/team-building/TeamHero";
import { useIconColor } from "../hooks/ui/useIconColor";
import { useAppSelector } from "../hooks/redux";

const TeamBuildingPage = () => {
  const { bgGradient, bgColor } = useIconColor();
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleNavigation = (title: string) => {
    navigate(
      `/sign-up?role=${title === "Corporate Admin" ? "admin" : "member"}`
    );
  };

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
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow  ">
        <div className="max-w-7xl  mx-auto px-6 max-xs:px-0">
          <TeamEvents />
          {isLoggedIn ? null : (
            <div id="teamBondingSection">
              <TeamBonding handleNavigation={handleNavigation} />
            </div>
          )}
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
