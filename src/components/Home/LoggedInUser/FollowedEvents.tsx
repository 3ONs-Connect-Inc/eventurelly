import { useNavigate } from "react-router-dom";
import { useIconColor } from "../../../hooks/useIconColor";
import Button from "../../ui/Button";
import { cardData } from "../../../../data";
import Card from "../../ui/Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const FollowedEvents: React.FC = () => {
  const { textColor, pColor, bgColor } = useIconColor();
  const navigate = useNavigate();

  const handleLearnMore = (slug: string) => {
    navigate(`/event-details/${slug}`);
  };

  return (
    <div className={`w-full py-4  max-xs:px-0 ${bgColor}`}>
      <div
        className={` z-[1] flex flex-col items-center py-4 mx-auto ${textColor} `}
      >
        <div className="w-full mt-0 flex flex-row max-xs:flex-col py-4 px-2  justify-between items-center mb-8 max-sm:mb-4">
          {/* Left Section */}
          <div className="self-start text-left ">
            <Button
              className={`mb-6 border-border-gray font-semibold  text-sm max-xs:text-small ${pColor} `}
              label="Followed Events"
            />
            <h2 className="mr-10 max-md:mr-0 text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid">
            Keep Track of Your Favorite Events
            </h2>
          </div>
          {/* Right Section - Button */}
           <div className="gap-2 flex mt-14">
                   <button
                      className="flex items-center gap-2 cursor-pointer max-sm:hidden bg-gray-100
                   text-black p-2  text-center rounded-full shadow-md text-base max-md:text-tiny font-semibold 
                   bg-hover transition whitespace-nowrap  self-start"
                    >
                      <FaAngleLeft /> 
                    </button>
                    <button
                      className="flex items-center gap-2 cursor-pointer max-sm:hidden bg-gray-100
                      text-black p-2  text-center rounded-full shadow-md text-base max-md:text-tiny font-semibold 
                      bg-hover transition whitespace-nowrap  self-start">
                      <FaAngleRight />
                     
                    </button>
                   </div>
        </div>

        {/* Cards Section */}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  justify-items-center">
          {cardData.slice(0, 3).map((card, index) => (
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
              onClick={() => handleLearnMore(card.slug)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowedEvents;
