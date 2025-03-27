import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";

const BookingHero: React.FC<{ eventDetail: any }> = ({ eventDetail }) => {
  return (
    <HeroContainer className="mt-0 mb-2 p-4">
      <HeroImage src="/images/ppl/p6.png" alt="Escape Room" />
  {/* <HeroImage src="/images/ppl/r.jpg"  alt="Escape Room" /> */}
      <HeroContent
        title={eventDetail?.eventName}
        description={eventDetail?.eventDescription}
      />
    </HeroContainer>
  );
};

export default BookingHero;
