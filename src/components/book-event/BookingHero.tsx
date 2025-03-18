import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";

const BookingHero = () => {
  return (
    <HeroContainer className="mt-0 mb-2 p-4">
      <HeroImage src="/images/ppl/p4.png" alt="Escape Room" />
      <HeroContent 
        title="Diversity & Inclusion Workshop" 
        description="Foster an inclusive workplace with insightful discussions and activities." 
      />
    </HeroContainer>
  );
};

export default BookingHero;
