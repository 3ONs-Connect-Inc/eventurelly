


import Card from "../../ui/Card";

interface EventGridProps {
  events: any[];  
  handleLearnMore: (id: string, slug: string) => void;
}

const EventGrid: React.FC<EventGridProps> = ({ events, handleLearnMore }) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 2sm:grid-cols-3  gap-6 w-full h-full justify-items-center">
      {events.slice(0, 6).map((card, index) => {
  
        return (
          <Card
            key={index}
            image={card.eventImage}
            title={card.eventName}
            description={card.eventDescription}
            buttonText={card.buttonText || "Learn More"}
            className="h-full w-full text-left border"
            buttonAlignment="center"
            textAlignment="left"
            buttonFullWidth
            buttonColor
            buttonTextColor
            imageClassName="rounded-lg "
            scale
            onClick={() => handleLearnMore(card.id, card.slug)}
          />
        );
      })}
    </div>
  );
};

export default EventGrid;
