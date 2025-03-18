import React, { useState } from "react";
import Checkbox from "../ui/Checkbox";
import { useIconColor } from "../../hooks/useIconColor";
import { services } from "../../../data";

const OptionalServices: React.FC = () => {
  const { pColor } = useIconColor();


  // Define state with explicit type
  const [checkedServices, setCheckedServices] = useState<
    Record<string, boolean>
  >(services.reduce((acc, service) => ({ ...acc, [service]: false }), {}));

  // Explicitly type event parameter
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedServices((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="p-6 max-xs:p-0 rounded-lg sm:items-center sm:justify-center">
      <span className="whitespace-nowrap border border-border-gray rounded-lg px-2 py-1 text-sm max-xs:text-tiny font-semibold max-w-max">
        Available at extra cost
      </span>
      <h2 className="text-5xl font-bold max-md:text-bigger max-sm:text-big max-xs:text-mid mt-4">
        Optional Services
      </h2>
      <ul className="list-none pl-5 space-y-2 mt-8 max-sm:mt-4">
        {services.map((service, index) => (
          <li
            key={index}
            className={`${pColor} flex items-center  space-x-2  font-medium text-lg max-sm:text-base max-xs:text-tiny  `}
          >
            <Checkbox
              name={service}
              checked={checkedServices[service] ?? false}
              onChange={handleCheckboxChange}
              label={service}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionalServices;
