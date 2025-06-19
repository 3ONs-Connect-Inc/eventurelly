

import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";

interface BookEventProps {
eventDetail: any;
}


const BookingHero: React.FC<BookEventProps> = ({ 
  eventDetail }) => {
       
  return (  
    <HeroContainer className="mt-0 mb-2 p-4 ">
      <HeroImage src={eventDetail.eventImage} alt="Escape Room" />
 
      <HeroContent
        title={eventDetail.eventNamePrefix ? `${eventDetail.eventNamePrefix} ${eventDetail.eventName}` : eventDetail.eventName}
        description={eventDetail?.eventTagline}
      />
    </HeroContainer>
  );
};

export default BookingHero;
