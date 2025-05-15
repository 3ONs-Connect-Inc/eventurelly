import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {  db } from "../../firebase/config";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../redux";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const activeUser = useAppSelector((state: RootState) => state.user.activeUser);

const validCountryCodes = new Set(
  getCountries().map((country) => `+${getCountryCallingCode(country)}`)
);

const checkFormComplete = () => {
  return Object.values(formData).every((value) => value.trim() !== "");
};

const validate = () => {
  const newErrors: Record<string, string> = {};
  const nameRegex = /^[A-Za-z'.-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (isSubmitted || touched.firstName) {
    if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required.";
  } else if (touched.firstName && !nameRegex.test(formData.firstName.trim())) {
    newErrors.firstName = "First name can only contain letters, apostrophes, periods, and hyphens.";
  }}

  if (isSubmitted || touched.lastName) {
    if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required.";
  } else if (touched.lastName && !nameRegex.test(formData.lastName.trim())) {
    newErrors.lastName = "Last name can only contain letters, apostrophes, periods, and hyphens.";
  }}

  if (touched.email && !emailRegex.test(formData.email.trim())) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (isSubmitted || touched.companyContact) {
    if (!formData.companyContact.trim()) {
      newErrors.companyContact = "Country code is required.";
    } else if (!validCountryCodes.has(formData.companyContact)) {
      newErrors.companyContact = "Invalid country code.";
    }
  }

  if (isSubmitted || touched.phoneNumber && !phoneRegex.test(formData.phoneNumber.trim())) {
    newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
  }

  setErrors(newErrors);
  setIsFormValid(Object.keys(newErrors).length === 0);
};


useEffect(() => {
  setIsFormValid(Object.keys(errors).length === 0);
}, [errors]);


// Handle Blur (when user leaves the input)
const handleBlur = (field: string) => {
  setTouched((prev) => ({ ...prev, [field]: true }));
  if (isSubmitted) {
    validate(); 
  }
};
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const userId = activeUser?.id; 

    if (!userId) {
      navigate("/sign-in");
      return;
    }
  
    setIsLoading(true);
    try {
      await addDoc(collection(db, "demoRequests"), {
        ...formData,
        userId,  
        timestamp: serverTimestamp(), 
      });
  
      setIsSuccess(true);
    //  setIsSubmitted(false);
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
    handleChange, 
    setErrors,
    handleBlur,
    validCountryCodes,
    isLoading,
    isFormValid,
    checkFormComplete,
    isSuccess,
    setIsSuccess,
    handleSubmit,
  };
};
