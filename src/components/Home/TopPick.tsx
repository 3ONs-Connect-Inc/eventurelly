import { useNavigate } from "react-router-dom";
import { useIconColor } from "../../hooks/useIconColor";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { cardData } from "./../../../data";

const TopPick: React.FC = () => {
  const { textColor, pColor, bgColor } = useIconColor();
  const navigate = useNavigate();

  const handleLearnMore = (slug: string) => {
    navigate(`/event-details/${slug}`);
  };
  const handleViewMore = () => {
    navigate(`/team-building-events`);
  };


  return (
    <div className={`w-full py-4  max-xs:px-0 ${bgColor}`} id="topPickSection">
      <div
        className={` z-[1] flex flex-col items-center py-4 mx-auto ${textColor} `}
      >
        <div className="w-full mt-0 flex flex-row max-xs:flex-col py-4 px-2  justify-between items-center mb-8 max-sm:mb-4">
          {/* Left Section */}
          <div className="self-start text-left ">
            <Button
              className={`mb-6 border-border-gray font-semibold  text-sm max-xs:text-small ${pColor} `}
              label="Top Events"
            />
            <h2 className="text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid">
              Our Top Picks
            </h2>
          </div>
          {/* Right Section - Button */}
          <button
            className="flex items-center gap-2 cursor-pointer max-sm:hidden bg-primary
         text-white px-5 py-2 rounded-lg shadow-md text-base max-md:text-tiny font-semibold 
         bg-hover transition mt-14"
          >
            <span  onClick={handleViewMore} >View More</span>
            <img
              src="/images/icon/arrow-right.png"
              loading="lazy"
              alt="icon"
              className="w-5"
            />
          </button>
        </div>

        {/* Cards Section */}

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
              onClick={() => handleLearnMore(card.slug)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TopPick;
