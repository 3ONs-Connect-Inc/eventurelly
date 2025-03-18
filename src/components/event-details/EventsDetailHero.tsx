import { infoItems } from "../../../data";
import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";
import Button from "../ui/Button";

interface EventDetailHeroProps {
  handleBooking: () => void;
}

const EventDetailHero: React.FC<EventDetailHeroProps> = ({ handleBooking }) => {
  return (
    <HeroContainer className="mt-8 mb-10 p-4">
      <HeroImage src="/images/ppl/p4.png" alt="Escape Room" />

      {/* Centered content */}
      <div className="text-center w-full max-w-2xl mt-6">
        <HeroContent
          title="Diversity & Inclusion Workshop"
          description="Foster an inclusive workplace with insightful discussions and activities."
        />

        {/* Rating */}
        <div
          className="flex font-semibold gap-4 max-md:text-base max-xs:text-tiny 
        text-lg items-center justify-center mt-4 space-x-2 max-xs:flex-col"
        >
          <Button
            label="Book this event"
            className="bg-primary text-white bg-hover whitespace-nowrap "
            onClick={handleBooking}
          />

          <a href="#event-description" className="text-primary  cursor-pointer" >Learn more</a>
        </div>
      </div>

      <div className="flex flex-wrap max-sm:hidden justify-center bg-white p-4 border border-border-gray rounded-lg mt-8 shadow-md max-w-4xl mx-auto">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-4 border-r border-border-gray 
          last:border-r-0  space-x-4 w-full sm:w-auto"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-6 h-6 max-md:w-5 max-md:h-5"
            />
            <span className="flex flex-col whitespace-nowrap">
              <h2 className="text-base max-md:text-tiny flex whitespace-nowrap font-bold text-gray">
                {item.title}
              </h2>
              <p className="text-gray text-base max-md:text-tiny font-medium flex whitespace-nowrap">
                {item.description}
              </p>
            </span>
          </div>
        ))}
      </div>
    </HeroContainer>
  );
};

export default EventDetailHero;
