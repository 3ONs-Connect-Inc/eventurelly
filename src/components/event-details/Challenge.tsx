
import { useIconColor } from "../../hooks/ui/useIconColor";
import Button from "../ui/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Services from "./Services";
import { useState } from "react";
import EventDate from "../ui/Date";
import { GrLocation } from "react-icons/gr";


interface ChallengeProps {
  handleBooking: () => void;
  eventDetail: any;
}

const Challenge: React.FC<ChallengeProps> = ({
  handleBooking,
  eventDetail,
}) => {
  const agendas = eventDetail?.agendas || []; 
  const { pColor } = useIconColor();
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    new Set(agendas.map((_: any, index: any) => index)) // Initially open all
  );

  const toggleCollapse = (index: number) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); // Collapse if open
      } else {
        newSet.add(index); // Expand if collapsed
      }
      return newSet;
    });
  };

  return (
    <div
      id="event-description"
      className="w-full mx-auto  flex flex-col  md:flex-row justify-between gap-25 max-xl:gap-10 py-10 max-xs:py-4 px-6 max-xs:px-0"
    >
      {/* Left Section */}
      <div className="flex flex-col mt-10 space-y-6 w-full lg:w-2/3">
        {eventDetail.isBooked ? (
          <div className="flex flex-col ">
            <h2 className="text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid mt-4">
              Date
            </h2>
            <span
              className={`${pColor} font-medium text-lg max-sm:text-base max-xs:text-tiny  max-sm:mt-4`}
            >
              <EventDate
                date={eventDetail.eventDate}
                className={`${pColor} font-medium text-lg max-sm:text-base max-xs:text-tiny mt-4 max-sm:mt-4`}
              />
            </span>
            <h2 className="text-5xl font-bold max-md:text-bigger mt-8 max-sm:text-big max-xs:text-mid ">
              Location
            </h2>

            <p
              className={`${pColor} flex items-center gap-2  mt-4 font-medium text-lg max-sm:text-base max-xs:text-tiny  max-sm:mt-4`}
            >
              <GrLocation className="text-xl" />
              {eventDetail.location}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col mt-8">
          <span
            className={`${pColor} border border-border-gray rounded-lg px-2 py-1 text-sm max-xs:text-tiny  font-semibold max-w-max`}
          >
            {eventDetail.eventName}
          </span>
          <h2 className="text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid mt-4">
            What is the {eventDetail.eventName}?
          </h2>
          <p
            className={`${pColor} font-medium text-lg max-sm:text-base max-xs:text-tiny mt-4 max-sm:mt-4`}
          >
            {eventDetail.eventDescription}
          </p>
        </div>

        <div className="flex flex-col mt-10">
          <span
            className={`${pColor} border border-border-gray rounded-lg px-2 py-1 text-sm max-xs:text-tiny font-semibold max-w-max`}
          >
            {eventDetail.eventName}
          </span>
          <h2 className="text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid mt-4">
            Event Agenda
          </h2>
        </div>

        {agendas.map((item: any, index: number) => {
          const isOpen = openIndices.has(index);
          return (
            <div key={index} className="flex flex-col space-y-2 pb-4">
              <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="flex flex-row items-center gap-2 ">
                  <h2
                    className="flex flex-wrap text-2xl max-md:text-xl max-sm:text-lg max-xs:text-base font-semibold min-w-0 "
                    onClick={() => toggleCollapse(index)}
                  >
                    {item.title}
                  </h2>

                  <i className="text-xl max-xs:text-base">
                    {isOpen ? (
                      <FaAngleUp onClick={() => toggleCollapse(index)} />
                    ) : (
                      <FaAngleDown onClick={() => toggleCollapse(index)} />
                    )}
                  </i>
                </div>

                {isOpen && (
                  <Button
                    label="item.time"
                    className="ml-2 max-sm:ml-1 whitespace-nowrap self-start font-semibold text-sm max-sm:text-xs
                     max-[400px]:text-[10px] dark:shadow-lg dark:shadow-gray-800  bg-black text-white
                   px-4 max-sm:px-2 max-sm:py-1"
                  />
                )}
              </div>
              {isOpen && (
                <p
                  className={`${pColor} font-normal text-lg max-sm:text-base max-xs:text-tiny`}
                >
                  {item.desc}
                </p>
              )}
            </div>
          );
        })}

        <Services eventDetail={eventDetail} />
      </div>

      {eventDetail.isBooked ? null : (
        <div className="w-1/3 max-w-md max-md:w-full h-auto mt-10 max-md:mt-4 bg-pink border border-pink-100 p-6 max-[320px]:p-1 rounded-lg shadow-lg flex flex-col space-y-4 self-start">
          <img src="/images/icon/kite.png" alt="" className="w-12 h-12" />
          <h2 className="text-dark-gray text-2xl max-sm:text-lg max-xs:text-base font-bold">
            Ready to Plan Your Team Event?
          </h2>
          <div className="flex flex-col space-y-2">
            {[
              "Choose your event format (In-Person, Virtual, Hybrid)",
              "Customize add-ons to match your team’s needs",
              "Get instant pricing & availability",
            ].map((text, index) => (
              <span key={index} className="flex items-center space-x-2">
                <img
                  src="/images/icon/check-icon.png"
                  alt=""
                  className="self-start w-5 h-5"
                />
                <p className="text-gray font-normal text-base max-xs:text-tiny -mt-1 ">
                  {text}
                </p>
              </span>
            ))}
          </div>

          <button
            onClick={handleBooking}
            className="mb-2 flex items-center justify-center whitespace-nowrap space-x-4 bg-primary bg-hover text-white font-semibold text-base max-xs:text-tiny max-[250px]:space-x-2  px-4 py-2 rounded-lg "
          >
            <span>Book This Event</span>
            <img
              src="/images/icon/arrow-up.png"
              alt=""
              className="max-[230px]:w-2.5 max-[230px]:h-2.5 w-3 h-3"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Challenge;
