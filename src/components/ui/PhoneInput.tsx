import React, { useState, useRef, ChangeEvent, useEffect } from 'react'; 
import useClickOutside from '../../hooks/useClickOutside';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { Country } from '../../types';


interface PhoneInputProps {
  companyContact: string;
  phoneNumber: string;
  countries: Country[];
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
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useClickOutside([inputRef], () => setShowSuggestions(false));

  // Update filteredCountries when countries is fetched
  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleCountryCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim().toUpperCase();

    if (!value.startsWith("+")) {
      value = `+${value.replace(/[^\d]/g, "")}`;
    } else {
      value = `+${value.slice(1).replace(/[^\d]/g, "")}`;
    }

    value = value.slice(0, 5);
    onCompanyContactChange(value);
    setShowSuggestions(true);

    // Ensure type safety for errors
    if (errors.companyContact && countries.some((c) => c.code === value)) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.companyContact;
        return newErrors;
      });
    }

    // Ensure correct type matching
    const filtered = countries.filter(
      (country) => country.code.startsWith(value) || country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  // Fix `prevErrors` type
  const handleSuggestionClick = (code: string) => {
    onCompanyContactChange(code);
    setShowSuggestions(false);
    if (errors.companyContact) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.companyContact;
        return newErrors;
      });
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); 
    onPhoneNumberChange({ ...e, target: { ...e.target, value } });

    if (errors.phoneNumber && /^\d{10}$/.test(value)) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.phoneNumber;
        return newErrors;
      });
    }
  };

  return (
    <div className="mb-4" ref={inputRef}>
      <label className="dark:text-[var(--light)] block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
      <div className="flex items-center dark:text-[var(--light)] rounded-lg overflow-hidden">
        {/* Country Code Input */}
        <div className="relative w-1/4 ">
          <input
            type="text"
            value={companyContact}
            onChange={handleCountryCodeChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Code"
            className={`px-3 py-2 text-base font-normal w-full rounded-l-lg border-2 ${
              errors.companyContact ? "border-red-500" : "border-gray-300"
            } focus:border-[#6C36FE]  focus:outline-none border-2 border-solid `}
          />
          {errors.companyContact && (
            <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
          )}
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-grow">
  <input
    type="tel" 
    value={phoneNumber}
    pattern="\d*"
      onChange={handlePhoneNumberChange}
      onKeyDown={(e) => {
        if (
          !(
            /\d/.test(e.key) ||
            ["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
          )
        ) {
          e.preventDefault();
        }
      }}
  
    placeholder="Phone Number"
    maxLength={10}
    className={`w-full px-3 py-2 text-base font-normal rounded-r-lg dark:text-[var(--light)] border-2 ${
      errors.phoneNumber ? "border-red-500" : "border-gray-300"
    } focus:border-[#6C36FE]  focus:outline-none border-2 border-solid `}
  />
  {errors.phoneNumber && (
    <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
  )}
</div>

      </div>

      {/* Error Messages */}
      {errors.companyContact && <p className="text-red-500 text-xs mt-1">{errors.companyContact}</p>}
      {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}

      {/* Country Suggestions */}
      {showSuggestions && filteredCountries.length > 0 && (
        <ul className="border dark:text-[var(--light)] border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
          {filteredCountries.map((country, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(country.code)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {country.name} ({country.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhoneInput;