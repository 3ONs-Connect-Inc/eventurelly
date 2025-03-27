import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { User } from "../../types";
import { userValidation } from "../../utils/validations/userValidation";
import { fetchCompanyDomains } from "../../firebase/companies";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../../utils/functions";

export const useEmployeeFormHandler = (
  defaultFormData: any,  
  recaptchaRef: any,
  captchaToken: string | null
) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState<string[]>([]);


  useEffect(() => {
    if (domains.length > 0) {
      setFormData((prev: any) => {
        const updatedFormData = {
          ...prev,
          emailDomain: domains[0],
        };
  
        // Remove error if a valid domain is set
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors.emailDomain;
          return updatedErrors;
        });
  
        return updatedFormData;
      });
    }
  }, [domains]);
  


  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    let filteredValue = value;
    if (name === "firstName" || name === "lastName") {
      filteredValue = value.replace(/[^A-Za-z'-."]/g, "");
    }

    // Filter out '@' for emailUsername
    if (name === "emailUsername") {
      filteredValue = value.replace(/@/g, "").trim(); // Trim whitespace
      if (!filteredValue) {
        console.error("emailUsername is empty after filtering.");
      }
    }
    if (name === "emailDomain") {
      filteredValue = value.trim();
      if (!filteredValue) {
        console.error("emailDomain is empty.");
      }
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : filteredValue,
    }));

    // Remove error dynamically
    if (errors[name as keyof User]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name as keyof User];
        return updatedErrors;
      });
    }
    

    if (name === "companyName") {
      const companyDomains = await fetchCompanyDomains(value);
      setDomains(companyDomains);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = userValidation(formData, domains);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      console.log("Validation failed:", validationErrors);
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }
    setLoading(true);
    try {
    
     
      const fullEmail = `${formData.emailUsername}${formData.emailDomain}`;
      if (
        !formData.emailUsername ||
        !formData.emailDomain ||
        !fullEmail.includes("@")
      ) {
        toast.error("Please provide a valid email address.");
        return;
      }

      const userId = uuidv4();
      // Encrypt the password
      const hashedPassword = await hashPassword(formData.password);

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        fullEmail,
        formData.password
      );  

      if (formData.role === "User") {
        const contactInfo = `${formData.companyContact} - ${formData.phoneNumber}`;
        const userData: User = {
          id: userId,
          companyName: formData.companyName,
            normalizedCompanyName: formData.companyName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyContact: formData.companyContact,
          phoneNumber: formData.phoneNumber,
          contactInfo: contactInfo,
          email: fullEmail,
          password: hashedPassword,
          confirmPassword: hashedPassword,
          ageConfirmed: formData.ageConfirmed,
          role: formData.role,
          timestamp: serverTimestamp(),
          emailVerified: false,
          terms: formData.terms,
        
        };
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, userData);
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
    formData,
    errors,
    domains,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
  };
};
