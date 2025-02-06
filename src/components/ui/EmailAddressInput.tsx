import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface EmailAddressInputProps {
  emailUsername: string;
  emailDomain: string;
  domains: string[];
  errors: any;
  setErrors: any;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDomainChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}



const EmailAddressInput: React.FC<EmailAddressInputProps> = ({
  emailUsername,
  emailDomain,
  domains,
  onUsernameChange,
  onDomainChange,
  errors,
}) => {
  return (
    <div className="mb-4 dark:text-[var(--light)]">
      {/* Label */}
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-[var(--light)]">
        Email
      </label>

      {/* Input & Select Wrapper */}
      <div className="relative flex items-center  border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#6C36FE]">
        {/* Email Username Input */}
        <div className="relative w-1/2">
          <input
            type="text"
            name="emailUsername"
            value={emailUsername}
            onChange={onUsernameChange}
            placeholder="abc"
            className={`w-full px-3 py-2 text-base font-normal rounded-l-lg dark:text-[var(--light)] border-2 border-solid ${
              errors.emailUsername ? "border-red-500" : "border-gray-300"
            } focus:border-[#6C36FE] focus:outline-none`}
          />
          {errors.emailUsername && (
            <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
          )}
        </div>

        {/* Email Domain Select */}
        <div className="relative w-1/2">
          <select
            name="emailDomain"
            value={emailDomain}
            onChange={onDomainChange}
            className={`w-full px-3 py-2.5 text-base font-normal rounded-r-lg dark:text-[var(--light)] border-2 border-solid ${
              errors.emailDomain ? "border-red-500" : "border-gray-300"
            } focus:border-[#6C36FE] focus:outline-none`}
          >
            {domains.map((domain, index) => (
              <option key={`${domain}-${index}`} value={domain}>
                {domain}
              </option>
            ))}
          </select>
          {errors.emailDomain && (
            <AiOutlineExclamationCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
          )}
        </div>
      </div>

      {/* Error Messages */}
      {errors.emailUsername && <p className="text-red-500 text-xs mt-1">{errors.emailUsername}</p>}
      {errors.emailDomain && <p className="text-red-500 text-xs mt-1">{errors.emailDomain}</p>}
    </div>
  );
};

export default EmailAddressInput;