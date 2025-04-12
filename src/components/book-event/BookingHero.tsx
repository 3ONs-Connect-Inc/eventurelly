import { cardData } from "../../../data";
import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";

interface BookEventProps {
eventDetail: any;
}


const BookingHero: React.FC<BookEventProps> = ({ 
  eventDetail }) => {
const fallbackImage =
       cardData.find((fallback) => fallback.eventName === eventDetail.eventName)?.image ||
       cardData[cardData.length]?.image ||
       "/images/top-picks/img6.png";
       
  return (  
    <HeroContainer className="mt-0 mb-2 p-4 ">
      <HeroImage src={fallbackImage || "/images/ppl/p6.png"} alt="Escape Room" />
 
      <HeroContent
        title={eventDetail.eventNamePrefix ? `${eventDetail.eventNamePrefix} ${eventDetail.eventName}` : eventDetail.eventName}
        description={eventDetail?.eventTagline}
      />
    </HeroContainer>
  );
};

export default BookingHero;
