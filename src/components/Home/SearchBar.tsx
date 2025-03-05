
import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { filterOptions } from "../../../data";
import useClickOutside from "../../hooks/useClickOutside";


export const SearchBar: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({
    "Event Category": "",
    "Group Size": "",
    "Expected Outcome": "",
    "Format": "",
  });
console.log(selectedFilters)
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({
    "Event Category": false,
    "Group Size": false,
    "Expected Outcome": false,
    "Format": false,
  });

  const refs = {
    "Event Category": useRef<HTMLDivElement>(null),
    "Group Size": useRef<HTMLDivElement>(null),
    "Expected Outcome": useRef<HTMLDivElement>(null),
    "Format": useRef<HTMLDivElement>(null),
  };

  useClickOutside(Object.values(refs), () => {
    setDropdownOpen({
      "Event Category": false,
      "Group Size": false,
      "Expected Outcome": false,
      "Format": false,
    });
  });

  const toggleDropdown = (key: string) => {
    setDropdownOpen((prev) => ({
      ...Object.keys(prev).reduce((acc, curr) => ({ ...acc, [curr]: curr === key ? !prev[key] : false }), {}),
    }));
  };

 
  return (
    <div className="flex items-center gap-4 border border-border-gray bg-white p-2 xs:p-3 mt-15 rounded-full shadow-md  mx-auto mb-8 max-sm:mb-0 w-full  relative">
      <input
        type="text"
        placeholder="Search by keywords"
        className="text-xs sm:text-lg w-full text-gray-500 font-medium flex-1 border-r-2 border-gray-300 pr-2 outline-none"
      />
      <div className="max-md:hidden flex items-center gap-4 text-sm lg:text-base relative">
        {Object.entries(filterOptions).map(([key, options], index) => (
          <div
            key={index}
            ref={refs[key as keyof typeof refs]}
            className="relative border-gray-300 text-gray-500 font-medium flex items-center gap-1 border-r-2 pr-2 cursor-pointer"
          >
            <span onClick={() => toggleDropdown(key as keyof typeof refs)}>{key}</span>
            <IoIosArrowDown className="text-gray-900 cursor-pointer" onClick={() => toggleDropdown(key as keyof typeof refs)} />
            {dropdownOpen[key] && (
              <div className="absolute left-0 top-full mt-1 bg-white shadow-md w-full  rounded-lg border border-gray-300 z-30 overflow-hidden ">
                {options.map((option, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 font-normal text-xs sm:text-sm hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSelectedFilters((prev) => ({ ...prev, [key]: option }));
                      setDropdownOpen((prev) => ({ ...prev, [key]: false }));
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-primary text-white p-1 sm:p-2 rounded-full border-l bg-hover cursor-pointer">
        <IoSearchOutline />
      </div>
    </div>
  );
};
