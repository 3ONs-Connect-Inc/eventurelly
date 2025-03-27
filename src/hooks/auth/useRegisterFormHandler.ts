import {  useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { CorporateAdmin } from "../../types";
import {  
  validateAddress,
  validateCompanyAndDomain,
  validateForm,  
} from "../../utils/validations/corporateValidation";
import { hashPassword } from "../../utils/functions";

export const useRegisterFormHandler = (
  defaultFormData: any,
  recaptchaRef: any,  
  captchaToken: string | null
) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CorporateAdmin, string>>
  >({});
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove existing error dynamically for the field
    if (errors[name as keyof CorporateAdmin]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name as keyof CorporateAdmin];
        return updatedErrors;
      });
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "companyAddress") {
      const trimmedAddress = e.target.value.trim(); // Use latest value directly
  
      const isValid = await validateAddress(trimmedAddress);
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        companyAddress: isValid ? undefined : "Please enter a valid address.",
      }));
  
      setShowMap(isValid);
    }
  };
  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedFormData = {
      ...formData,
     // companyName: formData.companyName.replace(/\s/g, ""),
      companyName: formData.companyName.trim().replace(/\s+/g, " "), 
  normalizedCompanyName: formData.companyName.trim().toLowerCase().replace(/\s+/g, " "), 
  companyAddress: formData.companyAddress.trim(),
  companyContact: formData.companyContact.trim(),
  phoneNumber: formData.phoneNumber.trim(),
  email: formData.email.trim(),
  password: formData.password.trim(),
  confirmPassword: formData.confirmPassword.trim(),
    };
    // Validate form fields
    const formErrors = validateForm(cleanedFormData);
    // console.log("Validation errors:", formErrors);
    const trimmedAddress = cleanedFormData.companyAddress.trim();
    const isAddressValid = await validateAddress(trimmedAddress);

    if (!isAddressValid) {
      formErrors.companyAddress = "Please enter a valid address.";
    }
    // If any errors exist, prevent submission
    const asyncErrors = await validateCompanyAndDomain(cleanedFormData);
    const allErrors = { ...formErrors, ...asyncErrors };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);

      return;
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);
    try {
     

      // Encrypt the password
      const hashedPassword = await hashPassword(cleanedFormData.password);

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanedFormData.email,
        cleanedFormData.password
      );

      if (cleanedFormData.role === "CorporateAdmin") {
        const contactInfo = `${cleanedFormData.companyContact} - ${cleanedFormData.phoneNumber}`;
        const adminData: CorporateAdmin = {
          id: userCredential.user.uid,
          companyName: cleanedFormData.companyName,
          normalizedCompanyName: cleanedFormData.companyName.toLowerCase(),
          companyAddress: cleanedFormData.companyAddress,
          companyContact: cleanedFormData.companyContact,
          phoneNumber: cleanedFormData.phoneNumber,
          contactInfo: contactInfo,
          email: cleanedFormData.email,
          password: hashedPassword,
          confirmPassword: hashedPassword,
          ageConfirmed: cleanedFormData.ageConfirmed,
          role: cleanedFormData.role,
          timestamp: serverTimestamp(),
          emailVerified: false,
          terms: cleanedFormData.terms,
        };
        const adminRef = doc(db, "users", userCredential.user.uid);
        await setDoc(adminRef, adminData);
        // Extract domain from email
        const emailDomain = `@${cleanedFormData.email.split("@")[1]}`;
        // const emailDomain = cleanedFormData.email.split("@")[1];
        // Check if domain already exists
        const domainRef = doc(
          collection(db, "domains"),
          userCredential.user.uid
        );
        const domainData = {
          id: userCredential.user.uid,
          companyName: cleanedFormData.companyName,
          normalizedCompanyName: cleanedFormData.companyName,
          email: cleanedFormData.email,
          domains: [emailDomain], // Store domains as an array
          createdBy: userCredential.user.uid,
          timestamp: serverTimestamp(),
        };

        await setDoc(domainRef, domainData, { merge: true }); 
      }

      toast.success("Registration successful");
      recaptchaRef.current?.reset();
      navigate("/2fa-auth");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email address is already in use by another account.");
      } else {
        toast.error(`Registration failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    showMap,
    setShowMap,
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    handleBlur
  };
};
