import Footer from "../../components/Footer";
import Seo from "../../components/Seo";
import EventDetailHero from "../../components/event-details/EventsDetailHero";
import { useIconColor } from "../../hooks/ui/useIconColor";
import BackToTop from "../../components/BackToTop";
import Challenge from "../../components/event-details/Challenge";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useFetchEventDetail } from "../../hooks/events/useFetchDetailsEvent";

const EventCategoryPage: React.FC = () => {
  const { bgGradient, textColor, bgColor } = useIconColor();
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { collectionName, id, slug } = useParams();
  const { loading, error, eventDetail } = useFetchEventDetail(
    collectionName || "events",
    id
  );
  
  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!eventDetail) return null;
  
    const handleBooking = () => {
      if (eventDetail.isBooked) {
        navigate(`/edit-event/${collectionName}/${id}/${slug}`);
      } else {
        if (isLoggedIn) {
          navigate(`/book-event/${collectionName}/${id}/${slug}`);
        } else {
          navigate("/sign-in");
        }
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
        {collectionName && (
          <EventDetailHero
            eventDetail={eventDetail}
            handleBooking={handleBooking}
          />
        )}
           <div className="w-screen  h-10 bg-gradient-to-b from-transparent to-white dark:to-[var(--dark)]" />
      </div>

      <div className=" px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow mb-8">
        <div className={`${textColor} w-full max-w-7xl mx-auto`}>
          <Challenge eventDetail={eventDetail} handleBooking={handleBooking} />
        </div>
      </div>

      <BackToTop />
      <div className="max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16 ">
 <Footer showButtons={true}/>
 </div>
    </div>
  );
};

export default EventCategoryPage;
