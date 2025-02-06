import { checkCompanyAndDomainExists } from "../../firebase/companies";
import { CorporateAdmin, FormErrors } from "../../types";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const validCountryCodes = new Set(
  getCountries().map((country) => `+${getCountryCallingCode(country)}`)
);

export const validateForm = (
  formData: CorporateAdmin
): Partial<Record<keyof CorporateAdmin, string>> => {
  const errors: FormErrors = {};

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

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

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email)) {
    errors.email =
      "Please enter a valid email address in 'test@example.com' format";
  }

  if (!formData.ageConfirmed)
    errors.ageConfirmed = "You must confirm your age.";
  if (!formData.terms)
    errors.terms = "You must agree with our terms and condition.";

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

export const validateAddress = async (address: string): Promise<boolean> => {
  try {
    const trimmedAddress = address.trim();
    const geocoder = new google.maps.Geocoder();
    const results = await new Promise<google.maps.GeocoderResult[]>(
      (resolve, reject) => {
        geocoder.geocode({ address: trimmedAddress }, (res, status) => {
          if (status === "OK" && res && res.length > 0) {
            resolve(res);
          } else {
            //  console.error(`Geocoding failed: ${status}`);
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      }
    );
    return results.length > 0;
  } catch {
    return false;
  }
};

export const validateCompanyAndDomain = async (
  formData: CorporateAdmin
): Promise<FormErrors> => {
  const errors: FormErrors = {};
  const emailDomain = `@${formData.email.split("@")[1]}`;

  if (!formData.companyName.trim() || !emailDomain) return errors; 

  const { companyExists, domainExists } = await checkCompanyAndDomainExists(
    formData.companyName,
    emailDomain
  );

  if (companyExists) {
    errors.companyName = "Company name already exists.";
  }
  if (domainExists) {
    errors.email =
      "An Administrator has already been assigned for this company/domain.";
  }
  return errors;
};
