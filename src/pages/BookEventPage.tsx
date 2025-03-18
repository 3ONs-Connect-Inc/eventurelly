import BackToTop from "../components/BackToTop";
import BookingForm from "../components/book-event/BookingForm";
import BookingHero from "../components/book-event/BookingHero";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { useIconColor } from "../hooks/useIconColor";

const BookEventPage = () => {
  const { bgGradient, bgColor } = useIconColor();

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
          className={`${bgGradient} h-[700px] max-md:h-[560px] max-xs:h-[460px] flex flex-col w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative pb-40`}
        >
          <BookingHero />
        </div> 


          <div className="-mt-25 w-full px-6 max-xs:px-0 sm:px-8 lg:px-12 xl:px-16 relative 
          max-[1295px]:-mt-35 max-[1095px]:-mt-50 max-[896px]:-mt-35 max-[768px]:-mt-48 max-[640px]:-mt-60 max-[480px]:-mt-45 max-[296px]:-mt-40">
          <BookingForm />
          </div>
    
      </div>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default BookEventPage;
