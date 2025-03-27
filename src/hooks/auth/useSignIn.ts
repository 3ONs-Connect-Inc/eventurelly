import { useState } from "react";
import { useDispatch } from "react-redux";  
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { User } from "../../types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setActiveUser } from "../../redux/slices/userSlice";

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

  const validateField = (
    name: keyof Omit<FormState, "rememberMe">,
    value: string
  ) => {
    let error = "";

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error =
          "Invalid Credentials.";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        error = "Password is required.";
      } else if (!passwordRegex.test(value)) {
        error =
          "Invalid Credentials.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
      // Clear general error when user types
  if (generalError) {
    setGeneralError(null);
  }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateField(name as keyof Omit<FormState, "rememberMe">, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);

    let formValid = true;
    (Object.keys(formData) as (keyof Omit<FormState, "rememberMe">)[]).forEach(
      (key) => {
        validateField(key, formData[key] as string);
        if (errors[key]) formValid = false;
      }
    );

    if (!formValid) {
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const firebaseUser = userCredential.user;

      if (!firebaseUser) throw new Error("Authentication failed");
// Check if email is verified
if (!firebaseUser.emailVerified) {
  navigate("/2fa-auth"); 
  return;
} 

      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        throw new Error("User data not found in Firestore");
      }

      const userData = userSnapshot.data() as User;

      dispatch(setActiveUser(userData));
// **Role-based Redirection**
switch (userData.role) {  
  case "Admin":
    navigate("/admin");
    break;
  // case "CorporateAdmin":
  //   navigate("/CorporateAdmin");
  //   break;
  // case "Manager":
  //   navigate("/manager");
  //   break;
  // case "Editor":
  //   navigate("/editor");
  //   break;
  default:
    navigate("/"); // Default for "User" and unknown roles
    break;
}
    } catch (error) {
      console.error("Login error:", error);
      setGeneralError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setErrors,
    generalError,
    handleBlur,
    touched,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useSignIn;
