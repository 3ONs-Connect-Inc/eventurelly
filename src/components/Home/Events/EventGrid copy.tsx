
import { cardData } from "../../../../data";
import Card from "../../ui/Card";


interface EventGridProps {
  events: any[];  
  handleLearnMore: (id: string, slug: string) => void;
}

const EventGrid: React.FC<EventGridProps> = ({ events, handleLearnMore }) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 2sm:grid-cols-3 md:grid-cols-3  gap-6 w-full h-full justify-items-center">
      {events.slice(0, 7).map((card, index) => {
       const fallbackImage =
       cardData.find((fallback) => fallback.eventName === card.eventName)?.image ||
       cardData[index % cardData.length]?.image ||
       "/images/top-picks/img6.png";

     return (
       <Card
         key={index}
         image={card.image || fallbackImage}
         title={card.eventName}
         description={card.eventDescription}
         buttonText={card.buttonText || "Learn More"}
         className="self-start text-left border "
         buttonAlignment="center"
         textAlignment="left"
         buttonFullWidth
         buttonColor
         buttonTextColor
         imageClassName="w-full h-full"
         scale
         onClick={() => handleLearnMore(card.id, card.slug)}
       />
     );
})}
    </div>
  );
};

export default EventGrid;
