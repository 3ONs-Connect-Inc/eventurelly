import React, {  useRef, useState } from 'react';
import { useCompanyDropdown } from '../../hooks/useCompanyDropdown';
import useClickOutside from '../../hooks/useClickOutside';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

interface CompanyDropdownProps {
  label: string;
  name: string;
  value: string;
  errors: any;
  setErrors: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLSelectElement | null>(null);
  useClickOutside([inputRef, dropdownRef], () => setIsDropdownVisible(false));


   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); 
    const { value } = e.target;
     filterCompanies(value);
     onChange(e);
     setIsDropdownVisible(true); // Show dropdown when typing
   };
 
   const handleOptionSelect = (company: string) => {
     onChange({ target: { name, value: company } } as React.ChangeEvent<HTMLInputElement>);
     setIsDropdownVisible(false); // Hide dropdown after selection
   };

  return (
    <div className="mb-4 dark:text-[var(--light)]">
      <label htmlFor={name} 
      className="block text-sm font-medium dark:text-[var(--light)] text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          ref={inputRef}
          className={`w-full px-3 py-2 rounded-lg text-base font-normal border-2 border-solid ${
            errors[name] ? "border-red-500 pr-10" : "border-gray-300"
          } focus:border-[#6C36FE] focus:outline-none`}
          placeholder="Search and select a company"
        />

        {/* Error Icon */}
        {errors[name] && (
          <AiOutlineExclamationCircle className="absolute inset-y-0 right-2 text-red-500 h-5 w-5 my-auto" />
        )}
      </div>

      {/* Error Message */}
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
      
            
       {isDropdownVisible && value && filteredCompanies.length > 0 && (
        <select
        ref={dropdownRef}
          id={`${name}-dropdown`}
          name={name}
          value={value}
          onChange={(e) => handleOptionSelect(e.target.value)}
          className="w-full px-3 py-2 rounded-lg focus:border-[#6C36FE]  focus:outline-none border-2 border-solid  mt-2"
          style={{ zIndex: 2 }}
       >
              {filteredCompanies.map((company, index) => (
            <option key={`${company}-${index}`} value={company}>
              {company}
            </option>
          ))}
        </select>
      )}
      {isDropdownVisible && value && filteredCompanies.length === 0 && (
        <p className="text-sm text-gray-500">No matching companies found</p>
      )}
    </div>
  );
};

export default CompanyDropdown;
