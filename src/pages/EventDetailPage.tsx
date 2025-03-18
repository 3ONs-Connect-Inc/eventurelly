import Footer from "../components/Footer";
import Seo from "../components/Seo";
import EventDetailHero from "../components/event-details/EventsDetailHero";
import { useIconColor } from "../hooks/useIconColor";
import BackToTop from "../components/BackToTop";
import Challenge from "../components/event-details/Challenge";
import { useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";

const EventDetailPage = () => {
  const { bgGradient, textColor, bgColor } = useIconColor();
 const { isLoggedIn } = useAppSelector((state) => state.user);
 const navigate = useNavigate();

  const handleBooking = () => {
    if (isLoggedIn) {
      navigate("/book-event");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div
      className={`${bgColor}  overflow-hidden  min-h-screen flex flex-col overflow-x-hidden  mt-0  max-w-full `}
    >
      <Seo
        title="Events"
        description="Events page."
        name="Eventurelly."
        type="event"
      />
      <div
        className={`${bgGradient} min-h-auto flex flex-col items-center justify-center w-full  px-6 sm:px-8 lg:px-12 xl:px-16`}
      >
        <EventDetailHero handleBooking={handleBooking} />
      </div>

      <div className=" px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow mb-8">
        <div className={`${textColor} w-full max-w-7xl mx-auto`}>
          <Challenge handleBooking={handleBooking} />
        </div>
      </div>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default EventDetailPage;
