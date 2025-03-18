import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

interface FormData {
  firstName: string;
  lastName: string;
  organizationName: string;
  email: string;
  companyContact: string;
  phoneNumber: string;
}

export const useRequestForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    organizationName: "",
    email: "",
    companyContact: "+1",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});


const validCountryCodes = new Set(
  getCountries().map((country) => `+${getCountryCallingCode(country)}`)
);



const validate = () => {
  const newErrors: Record<string, string> = {};
  const nameRegex = /^[A-Za-z'.-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;


  if (touched.firstName && !nameRegex.test(formData.firstName.trim())) {
    newErrors.firstName = "First name can only contain letters, apostrophes, periods, and hyphens.";
  }

  if (touched.lastName && !nameRegex.test(formData.lastName.trim())) {
    newErrors.lastName = "Last name can only contain letters, apostrophes, periods, and hyphens.";
  }

  if (touched.email && !emailRegex.test(formData.email.trim())) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (touched.companyContact) {
    if (!formData.companyContact.trim()) {
      newErrors.companyContact = "Country code is required.";
    } else if (!validCountryCodes.has(formData.companyContact)) {
      newErrors.companyContact = "Invalid country code.";
    }
  }

  if (touched.phoneNumber && !phoneRegex.test(formData.phoneNumber.trim())) {
    newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
  }

  setErrors(newErrors);
  setIsFormValid(Object.keys(newErrors).length === 0);
};

// Update validation dynamically after first blur
useEffect(() => {
  if (Object.keys(touched).length > 0) {
    validate();
  }
}, [formData]);


// Handle Blur (when user leaves the input)
const handleBlur = (field: string) => {
  setTouched((prev) => ({ ...prev, [field]: true }));
  validate();
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setIsLoading(true);
    try {
      await addDoc(collection(db, "eventRequests"), formData);
      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        organizationName: "",
        email: "",
        companyContact:  "",
        phoneNumber: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleBlur,
    validCountryCodes,
    isLoading,
    isFormValid,
    isSuccess,
    setIsSuccess,
    handleSubmit,
  };
};
