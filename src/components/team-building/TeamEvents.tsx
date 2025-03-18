import { useNavigate } from "react-router-dom";
import { useIconColor } from "../../hooks/useIconColor";
import Card from "../ui/Card";
import { cardData } from "../../../data";

const TeamEvents: React.FC = () => {
  const { textColor,  bgColor } = useIconColor();
  const navigate = useNavigate();

  const handleLearnMore = (slug: string) => {
    navigate(`/event-details/${slug}`);
  };
 

  return (
    <div className={`w-full py-4 mt-10  max-xs:px-0 ${bgColor}`}>
      <div
        className={` z-[1] flex flex-col items-center py-4 mx-auto ${textColor} `}
      >
     
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  justify-items-center">
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              className="self-start text-left border  "
              buttonAlignment="center"
              textAlignment="left"
              buttonFullWidth
              buttonColor
              buttonTextColor
              imageClassName="w-full h-full"
              tags={card.tags}
              onClick={() => handleLearnMore(card.slug)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TeamEvents;
