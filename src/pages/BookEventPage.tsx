import { useParams } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import BookingForm from "../components/book-event/BookingForm";
import BookingHero from "../components/book-event/BookingHero";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { useIconColor } from "../hooks/ui/useIconColor";
import Spinner from "../components/Spinner";
import { useFetchEventDetail } from "../hooks/events/useFetchDetailsEvent";

const BookEventPage = () => {
  const { bgGradient, bgColor } = useIconColor();
  const { collectionName, id, slug } = useParams();
  const { loading, error, eventDetail } = useFetchEventDetail(
    collectionName || "events",
    id
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!eventDetail) return null;

  return (
    <div
      className={`${bgColor}  overflow-hidden min-h-screen flex flex-col overflow-x-hidden mt-0 max-w-full`}
    >
      <Seo
        title="Book Events"
        description="Book Events page."
        name="Eventurelly."
        type="event"
      />

      <div className="relative w-full flex flex-col items-center">
        <div
          className={`${bgGradient} max-h-[900px] flex flex-col w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative pb-40`}
        >
          <BookingHero eventDetail={eventDetail} />
        </div>

        <div
          className="-mt-45 w-full  px-6 max-xs:px-0 sm:px-8 lg:px-12 xl:px-16 relative "
        >
          <BookingForm eventId={id} slug={slug} eventDetail={eventDetail} />
        </div>
      </div>

      <BackToTop />
      <Footer showButtons={true} />
    </div>
  );
};

export default BookEventPage;
