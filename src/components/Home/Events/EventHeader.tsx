import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Button from "../../ui/Button";


interface EventHeaderProps {
  title: string;
  subtitle: string;
  hasNavigationButtons: boolean;
  hasViewMore: boolean;
  viewMoreLink?: string;
  swiperRef?: any;
  pColor: any;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  title,
  subtitle,
  hasNavigationButtons,
  hasViewMore,
  viewMoreLink,
  swiperRef,
  pColor,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-0 flex flex-row max-xs:flex-col py-4 px-2 justify-between items-center mb-8 max-sm:mb-4">
          <div className="self-start text-left">
            <Button
              className={`mb-6 border-border-foreground font-semibold text-sm max-xs:text-small ${pColor}`}
              label={title}
            />
            <h2 className="mr-10 max-md:mr-0 text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid">
              {subtitle}
            </h2>
          </div>
          {hasNavigationButtons && (
            <div className="gap-2 flex mt-16 self-start ">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="items-center gap-2 cursor-pointer max-sm:hidden bg-gray-100
                      text-black p-2   text-center rounded-full shadow-md text-base max-md:text-tiny font-semibold 
                      bg-hover transition whitespace-nowrap "
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="items-center gap-2 cursor-pointer max-sm:hidden bg-gray-100
                      text-black p-2  text-center rounded-full shadow-md text-base max-md:text-tiny font-semibold 
                      bg-hover transition whitespace-nowrap  "
              >
                <FaAngleRight />
              </button>
            </div>
          )}
          {hasViewMore && (
            <button
              className="flex items-center gap-2 cursor-pointer max-sm:hidden bg-primary text-white px-5 py-2 rounded-lg shadow-md text-base max-md:text-tiny font-semibold transition bg-hover mt-14"
              onClick={() => navigate(viewMoreLink || "#")}
            >
              <span>View More</span>
              <img
                src="/images/icon/arrow-right.png"
                loading="lazy"
                alt="icon"
                className="w-5"
              />
            </button>
          )}
        </div>
  );
};

export default EventHeader;
