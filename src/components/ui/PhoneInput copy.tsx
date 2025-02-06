import React, { useState, useRef } from 'react'; 
import useClickOutside from '../../hooks/useClickOutside';
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const validCountryCodes = new Set(
  getCountries().map((country) => `+${getCountryCallingCode(country)}`)
);

interface PhoneInputProps {
  companyContact: string;
  phoneNumber: string;
  countries: { value: string }[];
  onCompanyContactChange: (value: string) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
  setErrors: any;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  companyContact,
  phoneNumber,
  countries,
  onCompanyContactChange,
  onPhoneNumberChange,
  errors,
  setErrors,
}) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useClickOutside([inputRef], () => setShowSuggestions(false));

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim(); 

    if (!value.startsWith("+")) {
      value = "+" + value.replace(/[^\d]/g, "");
    } else {
      value = "+" + value.slice(1).replace(/[^\d]/g, "");
    }

    value = value.slice(0, 4);
    onCompanyContactChange(value);

    if (errors.companyContact && validCountryCodes.has(value)) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.companyContact;
        return newErrors;
      });
    }
    setShowSuggestions(true);

    const filtered = countries.filter((country) =>
      country.value.startsWith(value)
    );
    setFilteredCountries(filtered);
  };

  const handleSuggestionClick = (value: string) => {
    onCompanyContactChange(value);
    setShowSuggestions(false);
    if (errors.companyContact) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.companyContact;
        return newErrors;
      });
    }
  };
 // console.log("Errors:", errors);

  return (
    <div className="mb-4" ref={inputRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <div className="flex items-center  rounded-lg overflow-hidden">
        
        {/* Company Contact Input (Smaller Width) */}
        <div className="relative w-1/4">
  <input
    type="text"
    value={companyContact}
    onChange={handleCountryCodeChange}
    onFocus={() => setShowSuggestions(true)}
    placeholder="Code"
    className={`px-3 py-2 text-base font-normal w-full rounded-l-lg focus:border-[#6C36FE] focus:outline-none border-2 
      ${errors.companyContact ? 'border-red-500' : 'border-gray-300'}`}
  />
  {errors.companyContact && (
    <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
  )}
</div>



        {/* Phone Number Input (Wider Width) */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              onPhoneNumberChange(e);

              if (errors.phoneNumber && /^\d{10}$/.test(value)) {
                setErrors((prevErrors: any) => {
                  const newErrors = { ...prevErrors };
                  delete newErrors.phoneNumber;
                  return newErrors;
                });
              }
            }}
            placeholder="Phone Number"
            maxLength={10}
            className={` w-full px-3 py-2  text-base font-normal rounded-r-lg focus:border-[#6C36FE] focus:outline-none border-2 border-solid
              ${errors.phoneNumber ? 'error-border pr-10' : 'border-gray-300'}`}
          />
          {errors.phoneNumber && (
            <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
          )}
        </div>
      </div>

      {/* Error Messages */}
      {errors.companyContact && (
        <p className="text-red-500 text-xs mt-1">{errors.companyContact}</p>
      )}
      {errors.phoneNumber && (
        <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
      )}

      {/* Country Suggestions */}
      {showSuggestions && filteredCountries.length > 0 && (
        <ul 
          role="listbox"
          className="border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto"
        >
          {filteredCountries.map((country, index) => (
            <li
              role="option"
              aria-selected={country.value === companyContact}
              key={index}
              onClick={() => handleSuggestionClick(country.value)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {country.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhoneInput;
