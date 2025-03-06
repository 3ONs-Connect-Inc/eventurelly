import { infoItems } from "../../../data";
import { useIconColor } from "../../hooks/useIconColor";
import LazyImage from "../LazyImage";

const EventDetailHero = () => {
  const { textColor, pColor } = useIconColor();

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto mt-8 mb-10 p-4">
      {/* Full-width image */}
      <LazyImage
        src="/images/ppl/p4.png"
        alt="Escape Room"
        className="w-full h-auto rounded-lg shadow-lg max-w-full sm:max-w-full "
      />

      {/* Centered content */}
      <div className="text-center w-full max-w-2xl mt-6">
        <h2
          className={`${textColor} mt-4 max-sm:-mt-2 text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8 font-bold`}
        >
          Escape Room Challenge
        </h2>
        <p
          className={`${pColor} mt-4 font-normal text-base  md:text-xl max-sm:text-tiny`}
        >
          Put your team’s problem-solving skills to the test in this thrilling
          Escape Room Challenge!
        </p>

        {/* Rating */}
        <div className="flex font-semibold max-md:text-base max-xs:text-tiny text-lg items-center justify-center mt-4 space-x-2">
          <span className={`${textColor} `}>4.9</span>
          <img src="/images/icon/star.png" alt="Star" className="w-5 h-5" />
          <span className="text-primary border-l-2  border-border-gray pl-2">
            97 Reviews
          </span>
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
    </div>
  );
};

export default EventDetailHero;
