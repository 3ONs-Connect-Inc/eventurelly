
import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";
import Button from "../ui/Button";



interface EventDetailHeroProps {
  handleBooking: () => void ;
  eventDetail: any
}  

const EventDetailHero: React.FC<EventDetailHeroProps> = ({ eventDetail, handleBooking }) => {

  const eventDetails = [
    { label: "Format", value: eventDetail?.eventFormat, icon: "/images/icon/user-check.png" },
    { label: "Location", value: eventDetail?.location, icon: "/images/icon/map.png" },
    { label: "Duration", value: eventDetail?.duration, icon: "/images/icon/clock.png" },
    { label: "Team Size", value: eventDetail?.teamSize, icon: "/images/icon/users.png" },
    {  icon: "/images/icon/activity.png", value: "ACTIVITY", label: "Moderate",},
  ];
  
  return (
    <HeroContainer className="mt-8 mb-10 p-4">
      <HeroImage src="/images/ppl/p4.png" alt="Escape Room" />

      
      <div className="text-center w-full max-w-2xl mt-6">
        <HeroContent
          title={eventDetail?.eventName}
          description={eventDetail?.eventDescription }
        />

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
        {eventDetails.map((detail, index) =>
          detail.value ? (
            <div key={index}
              className="flex items-center p-4 border-r border-border-gray last:border-r-0 
              space-x-4 w-full sm:w-auto">
              <img src={detail.icon} alt={detail.label} className="w-6 h-6 max-md:w-5 max-md:h-5" />
              <span className="flex flex-col whitespace-nowrap">
                <h2 className="text-base max-md:text-tiny flex whitespace-nowrap font-bold text-gray">
                  {detail.label}
                </h2>
                <p className="text-gray text-base max-md:text-tiny font-medium flex whitespace-nowrap">
                  {detail.value}
                </p>
              </span>
            </div>
          ) : null
        )}
      </div>
    </HeroContainer>
  );
};

export default EventDetailHero;
