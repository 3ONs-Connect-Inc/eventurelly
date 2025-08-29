import { useEffect } from "react";
import { useNavigate } from "react-router-dom";   
import { applyActionCode} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useColor } from "../../hooks/ui/useColor";
import PasswordReset from "./PasswordReset";
import Seo from "../../components/Seo";

interface UserProps {
  handleNewPasswordSubmit: (e: React.FormEvent) => void;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  confirmPassword: string;
  errors: any;
  setErrors: any;
  message: any;
  setMessage: any;
  loading: any;
  setLoading: any;
  searchParams: any;
}
 
const VerifyEmail: React.FC<UserProps> = ({ 
  handleNewPasswordSubmit, 
  setNewPassword, 
  setConfirmPassword,
  newPassword,
  confirmPassword,
  errors,
  setErrors,
  message,
  setMessage,
  loading,
  setLoading,
  searchParams,
}) => { 

  const navigate = useNavigate();
  const { textColor, bgColor, bgColor2 } = useColor();

  // Extract mode and oobCode from URL
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setMessage("Invalid or missing verification link.");
      setLoading(false);
      return;
    }

    if (mode === "verifyEmail") {
      verifyEmail(oobCode);
    } else if (mode === "resetPassword") {
      //setLoading(false); 
    } else {
      setMessage("Invalid action mode.");
      setLoading(false);
    }
  }, [mode, oobCode]);

  const verifyEmail = async (oobCode: string) => {
    try {
      setMessage(""); 
      await applyActionCode(auth, oobCode);
      
      await auth.currentUser?.reload();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { emailVerified: true });

        setMessage("✅ Email verified successfully! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("Verification successful.");
        setTimeout(() => navigate("/sign-in"), 3000);
      }
    } catch (error: any) {
      console.error("Error verifying email:", error);
      setMessage("⚠️ This is a one time link, it cannot be reused.");
    } finally {
      // Only reset loading if no redirect is happening
      setTimeout(() => setLoading(false), 3000);
    }
    
  };




    return (
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${bgColor2}`}>
  <Seo
  title="Verify Your Email | Eventurelly"
  description="Confirm your email address to activate your Eventurelly account and start planning your events."
  name="Eventurelly"
  type="website"
  robots="noindex, nofollow"
/>

      <div className={`p-6 rounded-lg shadow-lg text-center w-full max-w-md ${bgColor} ${textColor}`}>
      {loading ? (
          <h2 className="text-xl font-semibold mb-2">Processing your request...</h2>
        ) : mode === "verifyEmail" ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Email Verification</h2>
            <p>{message}</p>
          </div>
        ) : mode === "resetPassword" ? (
          <PasswordReset 
          handleNewPasswordSubmit={handleNewPasswordSubmit}
          setNewPassword={setNewPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errors={errors}
          setErrors={setErrors}
          loading={loading}
          setLoading={setLoading}
          message={message}
          setMessage={setMessage}
          searchParams={searchParams}
          />
        ) : (
          <p>{message}</p>
        )}
        </div>
      </div>
    );
  };
  
  export default VerifyEmail;
