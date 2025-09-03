import { useNavigate } from "react-router-dom";
import { useColor } from "../../hooks/ui/useColor";
import Card from "../ui/Card";
import { Event } from "../../types";

interface TeamEventsProps {
  events: Event[];
}


const TeamEvents: React.FC<TeamEventsProps> = ({ events }) => {
  const { textColor,  bgColor } = useColor();
  const navigate = useNavigate();

  const handleLearnMore = (id: string, slug: string) => {
    const formattedSlug = slug.replace(/\s+/g, "-");
    navigate(`/event-details/events/${id}/${formattedSlug}`);
  };  



  return (
    <div className={`w-full py-4 mt-10  max-xs:px-0 ${bgColor}`}>
      <div
        className={` z-[1] flex flex-col items-center py-4 mx-auto ${textColor} `}
      >
     
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  justify-items-center">
        {events.map((card, index) => {
            
            return (
              <Card
                key={index}
                image={card.eventImage}
                title={card.eventName}
                description={card.eventDescription}
                buttonText={card.buttonText || "Learn More"}
                className="w-full h-full self-start text-left border"
                buttonAlignment="center"
                textAlignment="left"
                buttonFullWidth
                buttonColor  
                buttonTextColor
                imageClassName="w-full h-full"
                scale
                onClick={() => handleLearnMore(card.id, card.eventName)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TeamEvents;
