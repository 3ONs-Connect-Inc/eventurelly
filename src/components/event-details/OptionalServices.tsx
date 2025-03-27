import React from "react";

import { useIconColor } from "../../hooks/ui/useIconColor";



interface OptionalServicesProps{
  eventDetail?: { optionalServices?: string[] };
  }
  

const OptionalServices: React.FC<OptionalServicesProps>= ({eventDetail})=> {
  const { pColor } = useIconColor();

  const optionalServices = eventDetail?.optionalServices ?? [];

  return (
    <div className="p-6 max-xs:p-0 rounded-lg sm:items-center sm:justify-center">
      <span className="whitespace-nowrap border border-border-gray rounded-lg px-2 py-1 text-sm max-xs:text-tiny font-semibold max-w-max">
        Available at extra cost
      </span>
      <h2 className="text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid mt-4">
        Optional Services
      </h2>
      <ul className="list-none pl-5 space-y-2 mt-8 max-sm:mt-4">
  {optionalServices.length > 0 ? (
    optionalServices.map((service: string, index: number) => (
      <li
        key={index}
        className={`${pColor} flex items-center space-x-3 font-medium text-lg max-sm:text-base max-xs:text-tiny`}
      >
        <span className="text-3xl leading-none flex self-start">•</span>
        <span>{service}</span>
      </li>
    ))
  ) : (
    <p className="text-gray-500 text-base">No optional services listed.</p>
  )}
</ul>

    </div>
  );
};

export default OptionalServices;
