import Footer from "../components/Footer";
import Seo from "../components/Seo";
import EventDetailHero from "../components/EventDetails/EventsDetailHero";
import { useIconColor } from "../hooks/useIconColor";
import BackToTop from "../components/BackToTop";


const EventDetailPage = () => {
    const { bgGradient, bgColor } = useIconColor();

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
       <div className={`${bgGradient} min-h-auto flex flex-col items-center justify-center w-full  px-6 sm:px-8 lg:px-12 xl:px-16`} >
        <EventDetailHero />
      </div>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow ">
         
        </div>
    <BackToTop />
        <Footer />
      </div>
    );
  };

export default EventDetailPage;