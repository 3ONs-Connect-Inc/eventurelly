import React, { useRef, useState } from "react";
import { useCompanyDropdown } from "../../hooks/ui/useCompanyDropdown";
import useClickOutside from "../../hooks/ui/useClickOutside";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useIconColor } from "../../hooks/ui/useIconColor";

interface CompanyDropdownProps {
  label: string;
  name: string;
  value: string;
  errors: any;
  setErrors: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyDropdown: React.FC<CompanyDropdownProps> = ({
  label,
  name,
  value,
  onChange,
  errors,
}) => {
  const { filteredCompanies, filterCompanies } = useCompanyDropdown();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const { textColor} = useIconColor();
  useClickOutside([inputRef, dropdownRef], () => setIsDropdownVisible(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    filterCompanies(e.target.value);
    onChange(e);
    setIsDropdownVisible(true);
    setHighlightedIndex(-1); // Reset selection
  };

  const handleOptionSelect = (company: string) => {
    onChange({
      target: { name, value: company },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsDropdownVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownVisible || filteredCompanies.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < filteredCompanies.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleOptionSelect(filteredCompanies[highlightedIndex]);
    }
  };

  return (
    <div className={`mb-4 ${textColor} `}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium  ${textColor} mb-1`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className={`dark:opacity-55 w-full px-3 py-2 rounded-lg text-base font-normal border-2 border-solid ${
            errors[name] ? "border-red-500 pr-10" : "border-gray-300"
          } focus:border-[#6C36FE] focus:outline-none`}
          placeholder="Search and select a company"
        />

        {errors[name] && (
          <AiOutlineExclamationCircle className="absolute inset-y-0 right-2 text-red-500 h-5 w-5 my-auto" />
        )}
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}

      {isDropdownVisible && value && filteredCompanies.length > 0 && (
        <ul
          ref={dropdownRef}
          className="w-full px-3 py-2 rounded-lg 
        focus:border-[#6C36FE]
          focus:outline-none 
          border
          border-gray-400
          border-solid
           mt-2"
          style={{ zIndex: 2 }}
        >
          {filteredCompanies.map((company, index) => (
            <li
              key={`${company}-${index}`}
              onClick={() => handleOptionSelect(company)}
              className={`px-3 py-2 cursor-pointer text-sm ${
                index === highlightedIndex
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {company}
            </li>
          ))}
        </ul>
      )}

      {isDropdownVisible && value && filteredCompanies.length === 0 && (
        <p className="text-sm text-red-500">No matching companies found</p>
      )}
    </div>
  );
};

export default CompanyDropdown;
