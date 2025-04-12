import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { useAppSelector } from "../hooks/redux";
import LoggedInUser from "../components/Home/LoggedInUser";
import GuestUser from "../components/Home/GuestUser";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const handleNavigation = (title: string) => {
    navigate(
      `/sign-up?role=${title === "Corporate Admin" ? "admin" : "member"}`
    );
  };

  return (
    <div className="relative   overflow-hidden  min-h-screen  overflow-x-hidden   flex flex-col mt-0  max-w-full">
      <Seo
        title="Home"
        description="Home page."
        name="Eventurelly."
        type="website"
      />
      {isLoggedIn ? (
        <LoggedInUser />
      ) : (
        <GuestUser handleNavigation={handleNavigation} />
      )}
      <BackToTop />
      <div className="max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16 ">
        <Footer showButtons={true} />
      </div>
    </div>
  );
};

export default Home;
