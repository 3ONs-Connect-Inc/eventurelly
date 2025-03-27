import { useIconColor } from "../../hooks/ui/useIconColor";
import OptionalServices from "./OptionalServices";


interface ServicesProps{
eventDetail: any;
}

const Services:React.FC<ServicesProps>= ({eventDetail}) => {
  const { pColor } = useIconColor();

  const renderServiceList = (services: string[], icon: string) =>
    services.length > 0 ? (
      services.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <img src={icon} alt={item} className="flex self-start mt-1 w-5 h-5" />
          <p className={`${pColor} font-medium text-lg max-sm:text-base max-xs:text-tiny -mt-1`}>
                    {item}
                  </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-base">No services listed.</p>
    );
  return (
    <div className="flex flex-col gap-12 mt-4">
    <div className="flex flex-col md:flex-row gap-10">
    <div className="border border-border-gray p-6 max-[320px]:p-1 rounded-lg w-full md:w-1/2 max-w-max">
          <h2 className="text-2xl max-sm:text-lg max-xs:text-base text-green-600 font-bold mb-4 max-xs:mt-4">
            Services Included
          </h2>
          <div className="flex flex-col gap-4 mt-8 max-sm:mt-4">
        {renderServiceList(eventDetail?.servicesIncluded || [], "/images/icon/good.png")}
      </div>
      </div>

      <div className="border border-border-gray p-6 max-[320px]:p-1 rounded-lg w-full md:w-1/2 max-w-max">
      <h2 className="text-2xl max-sm:text-lg max-xs:text-base font-bold mb-4 text-red-600 max-xs:mt-4">
            Services Not Included
          </h2>
        <div className="flex flex-col gap-4 mt-8 max-sm:mt-4">
        {renderServiceList(eventDetail?.servicesNotIncluded || [], "/images/icon/bad.png")}
      </div>
      </div>
    </div>
    <OptionalServices   eventDetail={eventDetail} />
  </div>
  );
};

export default Services;
