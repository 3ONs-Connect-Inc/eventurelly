import React, { forwardRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  maxLength?: number;
  placeholder: string;
  errors: any;
  setErrors: any;
  onBlur?:  React.FocusEventHandler<HTMLInputElement>; 
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      name,
      value,
      onChange,
      className,
      maxLength,
      placeholder,
      errors,
      setErrors,
      onBlur,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={`mb-4 relative ${className}`}>
        <label
          htmlFor={name}
          className="block text-sm font-medium  text-gray-600 dark:text-[var(--light)] mb-1"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={type === "password" && !showPassword ? "password" : "text"}
            value={value}
            onChange={(e) => {
              onChange(e);
              if (errors[name]) {
                setErrors((prevErrors: any) => {
                  const newErrors = { ...prevErrors };
                  delete newErrors[name];
                  return newErrors;
                });
              }
            }}
            maxLength={maxLength}
            placeholder={placeholder}
            onBlur={onBlur}
            ref={ref}
            className={`w-full px-3 py-2 border text-base font-normal text-gray-500 dark:text-[var(--light)] rounded-lg 
              ${errors[name] ? "error-border pr-10" : "border-gray-300"}
               focus:border-[#6C36FE]  focus:outline-none border-2 border-solid 
               `}
          />

          {/* Password Toggle Icon */}
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-8 flex items-center px-2 text-gray-900"
            >
              {showPassword ? (
                <BsEyeSlash className="h-5 w-5" />
              ) : (
                <BsEye className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Error Icon */}
          {errors[name] && (
            <AiOutlineExclamationCircle className="absolute inset-y-0 right-2 text-red-500 h-5 w-5 my-auto" />
          )}
        </div>

        {/* Error Message */}
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        )}
      </div>
    );
  }
);

export default Input;
