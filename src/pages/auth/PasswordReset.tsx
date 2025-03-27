import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useIconColor } from "../../hooks/ui/useIconColor";
import { auth, db } from "../../firebase/config";
import NewPassword from "../../components/auth/NewPassword";
import Seo from "../../components/Seo";

interface PasswordResetProps {
  handleNewPasswordSubmit: (e: React.FormEvent) => void;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  confirmPassword: string;
  errors: any;
  setErrors: any;
  loading: boolean;
  setLoading: any;
  message: any;
  setMessage: any;
  searchParams: any;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  handleNewPasswordSubmit,
  setNewPassword,
  setConfirmPassword,
  newPassword,
  confirmPassword,
  errors,
  setErrors,
  loading,
  setLoading,
  message,
  setMessage,
  searchParams,
}) => {
  const { textColor, bgColor, bgColor2 } = useIconColor();
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  // Extract oobCode from URL
  const resetCode = searchParams.get("oobCode");
  const isResetMode = !!resetCode;

  useEffect(() => {
    if (isResetMode) {
      setMessage(" ");
    }
  }, [isResetMode]);

  useEffect(() => {
    if (message.includes("Password reset successful")) {
      setTimeout(() => navigate("/"), 3000);
    }
  }, [message, navigate]);

  // Handle sending password reset email
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");
    setLoading(true);

    if (!email) {
      setErrors({ email: "Please enter a valid email." });
      setLoading(false);
      return;
    }
    if (typeof setErrors !== "function") {
      console.error("setErrors is not a function!");
      return;
    }
    try {
      // Check if email exists in Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrors({ email: "No user with this email found." });
        setLoading(false);
        return;
      }

      await sendPasswordResetEmail(auth, email, {
        url: `${import.meta.env.VITE_PORT}/verify-email`,
      });
      setMessage("Password reset link sent! Check your email.");
    } catch (err: any) {
      setErrors({ email: err.message || "Failed to send reset email." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-50">
      <Seo
        title="Password Reset"
        description="Password Reset page."
        name="Eventurelly."
        type="website"
      />
      {!isResetMode ? (
        <div
          className={` flex   justify-center items-center min-h-screen px-4 ${bgColor2}`}
        >
          <div className="w-full  max-w-md">
            <div className={`shadow-lg rounded-lg p-6 ${bgColor} ${textColor}`}>
              {/* Header Section */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold">Forgot Password?</h2>
                <p className="text-gray-500 mt-2">
                  Please enter your email address, and we will send a password
                  reset link to this email.
                </p>
              </div>

              {/* Success/Error Messages */}
              {errors?.email && (
                <p className="text-red-500 text-sm mb-3">{errors.email}</p>
              )}
              {message && (
                <p className="text-green-500 text-sm mb-3">{message}</p>
              )}

              {/* Password Reset Form */}
              <form onSubmit={handlePasswordReset} className=" z-0 space-y-4">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="abc@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  errors={errors?.email || ""}
                />

                {/* Button Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                  <Button
                    label="Cancel"
                    onClick={() => {
                      setEmail("");
                      navigate("/sign-in");
                    }}
                    className="bg-gray-300 text-gray-800 w-full rounded-lg bg-hover border border-border-gray sm:w-auto"
                  />
                  <Button
                    label={loading ? "Sending..." : "Send"}
                    type="submit"
                    className="bg-primary text-white w-full rounded-lg bg-hover hover:bg-opacity-80 sm:w-auto"
                    disabled={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <NewPassword
          handleNewPasswordSubmit={handleNewPasswordSubmit}
          setNewPassword={setNewPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errors={errors}
          setErrors={setErrors}
          loading={loading}
          message={message}
        />
      )}
    </div>
  );
};

export default PasswordReset;
