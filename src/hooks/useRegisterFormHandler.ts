import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { CorporateAdmin } from "../types";
import {
  validateAddress,
  validateCompanyAndDomain,
  validateForm,
} from "../utils/validations/corporateValidation";
import { hashPassword } from "../utils/functions";

export const useRegisterFormHandler = (
  defaultFormData: any,
  recaptchaRef: any,
  captchaToken: string | null
) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CorporateAdmin, string>>
  >({});
  //const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.companyAddress) {
      (async () => {
        const isValid = await validateAddress(formData.companyAddress);
        setErrors((prevErrors) => ({
          ...prevErrors,
          companyAddress: isValid ? undefined : "Please enter a valid address.",
        }));
        setShowMap(isValid);
      })();
    }
  }, [formData.companyAddress]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    const formErrors = validateForm(formData);
    // console.log("Validation errors:", formErrors);
    const trimmedAddress = formData.companyAddress.trim();
    const isAddressValid = await validateAddress(trimmedAddress);

    if (!isAddressValid) {
      formErrors.companyAddress = "Please enter a valid address.";
    }
    // If any errors exist, prevent submission
    const asyncErrors = await validateCompanyAndDomain(formData);
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
      toast.error("Captcha validation failed. Please try again.");
      return;
    }
   
    try {
      // Send the captcha token to your backend for verification
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-recaptcha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ captchaToken }),
    });

    const data = await response.json();

    if (!data.success) {
      toast.error("Captcha verification failed. Please try again.");
      return;
    }
    setLoading(true);
      // Encrypt the password 
      const hashedPassword = await hashPassword(formData.password);

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (formData.role === "CorporateAdmin") {
        const contactInfo = `${formData.companyContact} - ${formData.phoneNumber}`;
        const adminData: CorporateAdmin = {
          id: userCredential.user.uid,
          companyName: formData.companyName,
          companyAddress: formData.companyAddress,
          companyContact: formData.companyContact,
          phoneNumber: formData.phoneNumber,
          contactInfo: contactInfo,
          email: formData.email,
          password: hashedPassword,
          confirmPassword: hashedPassword,
          ageConfirmed: formData.ageConfirmed,
          role: formData.role,
          timestamp: serverTimestamp(),
          emailVerified: false,
          terms: formData.terms,
        };
        const adminRef = doc(db, "users", userCredential.user.uid);
        await setDoc(adminRef, adminData);
        // Extract domain from email
        const emailDomain = `@${formData.email.split("@")[1]}`;
        // const emailDomain = formData.email.split("@")[1];
        // Check if domain already exists
        const domainRef = doc(
          collection(db, "domains"),
          userCredential.user.uid
        );
        const domainData = {
          id: userCredential.user.uid,
          companyName: formData.companyName,
          email: formData.email,
          domains: [emailDomain], // Store domains as an array
          createdBy: userCredential.user.uid,
          timestamp: serverTimestamp(),
        };

        await setDoc(domainRef, domainData, { merge: true }); // Use merge for safe updates
      }

      toast.success("Registration successful");
      recaptchaRef.current?.reset();
      navigate("/sign-in");
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
  };
};
