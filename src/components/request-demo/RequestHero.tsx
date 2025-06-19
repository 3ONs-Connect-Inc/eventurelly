import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";

const RequestHero = () => {
  return (
    <HeroContainer className="mb-4 max-sm:mb-2 gap-10 px-6">
      <div className="flex flex-col-reverse  md:flex-row items-center mt-4  justify-between w-full mb-2 gap-10 max-md:mb-0">
        <HeroContent
          title="Transform Team Bonding with Eventurelly – Experience a Live Demo Today!"
          description="Discover how our platform helps companies like yours boost team bonding, engagement, and satisfaction. Book your personalized demo today!"
          alignCenter={false}
        />

        <HeroImage src="/images/ppl/p5.png"  alt="Hero Image" rounded  />
      </div>
    </HeroContainer>
  );
};

export default RequestHero;
