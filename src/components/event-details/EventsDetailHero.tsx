
import HeroContainer from "../ui/hero/HeroContainer";
import HeroContent from "../ui/hero/HeroContent";
import HeroImage from "../ui/hero/HeroImage";
import Button from "../ui/Button";
import { cardData } from "../../../data";



interface EventDetailHeroProps {
  handleBooking: () => void ;  
  eventDetail: any;
}  

const EventDetailHero: React.FC<EventDetailHeroProps> = ({ eventDetail, handleBooking }) => {
const fallbackImage =
       cardData.find((fallback) => fallback.eventName === eventDetail.eventName)?.image ||
       cardData[cardData.length]?.image ||
       "/images/top-picks/img6.png";
  
  const eventDetails = [
    { label: "Format", value: eventDetail?.eventFormat, icon: "/images/icon/user-check.png" },
    { label: "Location", value: eventDetail?.location, icon: "/images/icon/map.png" },
    { label: "Duration", value: eventDetail?.duration, icon: "/images/icon/clock.png" },
    { label: "Team Size", value: eventDetail?.teamSize, icon: "/images/icon/users.png" },
    {  icon: "/images/icon/activity.png", value: "ACTIVITY", label: "Moderate",},
  ];
  
  return (
    <HeroContainer className="mt-8 mb-10 p-4">
      <HeroImage src={fallbackImage || "/images/ppl/p4.png"} alt="Escape Room" />

      
      <div className="text-center w-full max-w-2xl mt-6">
        <HeroContent
          title={eventDetail.eventNamePrefix ? 
            `${eventDetail.eventNamePrefix} ${eventDetail.eventName}` 
            : eventDetail.eventName}
          description={eventDetail?.eventTagline }
        />

{eventDetail.isBooked ? (
 <div
 className="flex font-semibold gap-4 max-md:text-base max-xs:text-tiny 
text-lg items-center justify-center mt-4 space-x-2 max-xs:flex-col"
>
 <Button
   label="Edit this event"
   className="bg-primary text-white bg-hover whitespace-nowrap "
   onClick={handleBooking}
 />

 
</div>
) : (
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
)}
       
      </div>

      <div className="flex flex-wrap max-sm:hidden justify-center bg-white p-4 border border-border-foreground rounded-lg mt-8 shadow-md max-w-4xl mx-auto">
        {eventDetails.map((detail, index) =>
          detail.value ? (
            <div key={index}
              className="flex items-center p-4 border-r border-border-foreground last:border-r-0 
              space-x-4 w-full sm:w-auto">
              <img src={detail.icon} alt={detail.label} className="w-6 h-6 max-md:w-5 max-md:h-5" />
              <span className="flex flex-col whitespace-nowrap">
                <h2 className="text-base max-md:text-tiny flex whitespace-nowrap font-bold text-foreground">
                  {detail.label}
                </h2>
                <p className="text-foreground text-base max-md:text-tiny font-medium flex whitespace-nowrap">
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
