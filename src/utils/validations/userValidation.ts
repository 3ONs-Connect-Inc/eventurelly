import { User, FormErrors } from "../../types";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const validCountryCodes = new Set(
  getCountries().map((country) => `+${getCountryCallingCode(country)}`)
);

export const userValidation = (
  formData: User,
  domains: string[]
): Partial<Record<keyof User, string>> => {
  const errors: FormErrors = {};

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
  const phoneRegex = /^\d{10}$/;
 // const countryCodeRegex = /^\\d$/;
  const nameRegex = /^[A-Za-z'-."]+$/;
  const emailUsernameRegex = /^[^@]+$/;


  // Validate firstName
  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (!nameRegex.test(formData.firstName)) {
    errors.firstName =
      "First name can only contain alphabetic characters, apostrophes ('), periods (.), and hyphens (-).";
  }

  // Validate lastName
  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (!nameRegex.test(formData.lastName)) {
    errors.lastName =
      "Last name can only contain alphabetic characters, apostrophes ('), periods (.), and hyphens (-).";
  }

  if (!formData.companyName.trim())
    errors.companyName = "Company name is required.";

  // Validate companyContact (country code)
  if (!formData.companyContact.trim()) {
    errors.companyContact = "Country code is required.";
  } else if (!validCountryCodes.has(formData.companyContact)) {
    errors.companyContact = "Please enter a valid country code.";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!phoneRegex.test(formData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits.";
  }

  if (!formData.emailUsername?.trim()) {
    errors.emailUsername = "Email username is required.";
  } else if (!emailUsernameRegex.test(formData.emailUsername)) {
    errors.emailUsername = "Email username cannot contain '@' or domain part.";
  }

  if (!formData.emailDomain || formData.emailDomain === "") {
    errors.emailDomain = "Please select a valid email domain.";
  } else if (!domains.includes(formData.emailDomain)) {
    errors.emailDomain =
      "The email address you entered is not associated with the selected company. Please use your company-issued email address.";
  }

  if (!formData.ageConfirmed)
    errors.ageConfirmed = "You must confirm your age.";

  if (!formData.password.trim()) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password =
      "Password must be at least 8 characters and must contain at least 1 uppercase letter, one lowercase letter, one number, and one special character";
  } else if (formData.password.length > 8) {
    errors.password =
      "Password must not exceed 8 characters and must contain at least 1 uppercase letter, one lowercase letter, one number, and one special character";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password  must contain at least 1 uppercase letter, one lowercase letter, one number, and one special character";
  }

  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = "Password is required.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match.  Please enter the same password in both fields";
  }

  return errors;
};
