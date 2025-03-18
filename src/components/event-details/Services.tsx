import { useIconColor } from "../../hooks/useIconColor";
import OptionalServices from "./OptionalServices";

const Services = () => {
  const { pColor } = useIconColor();
  return (
    <div className="flex flex-col gap-12 mt-4">
      {/* Services Included & Not Included */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Services Included */}
        <div className="border border-border-gray p-6 max-[320px]:p-1  rounded-lg w-full md:w-1/2  max-w-max">
          <h2 className="text-2xl max-sm:text-lg max-xs:text-base text-green-600 font-bold mb-4 max-xs:mt-4">
            Service Included
          </h2>
          <div className="flex flex-col gap-4 mt-8 max-sm:mt-4">
            {[
              "Diversity training materials",
              " Interactive sessions",
              "Certificates of participation",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src="/images/icon/good.png"
                  alt="Included"
                  className="self-start w-5 h-5"
                />
                <p
                  className={`${pColor} font-medium text-lg max-sm:text-base max-xs:text-tiny -mt-1 `}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Not Included */}
        <div className="border border-border-gray p-6 max-[320px]:p-1 rounded-lg w-full md:w-1/2 max-md:w-full">
          <h2 className="text-2xl max-sm:text-lg max-xs:text-base font-bold mb-4 text-red-600 max-xs:mt-4">
            Service Not Included
          </h2>
          <div className="flex flex-col gap-4 mt-8 max-sm:mt-4">
            {[
              "Venue and Catering",
              "Travel  expenses",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src="/images/icon/bad.png"
                  alt="Not Included"
                  className="self-start w-5 h-5"
                />
                <p
                  className={`${pColor} font-medium text-lg max-sm:text-base max-xs:text-tiny -mt-1 break-all`}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OptionalServices />
    </div>
  );
};

export default Services;
