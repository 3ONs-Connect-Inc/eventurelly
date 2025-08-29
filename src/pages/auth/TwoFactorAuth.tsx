import { useEffect, useState } from "react";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { useColor } from "../../hooks/ui/useColor";
import Seo from "../../components/Seo";

const TwoFactorAuth: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const { textColor, bgColor, bgColor2 } = useColor();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email ?? "");
        setUserId(user.uid);
        setIsVerified(user.emailVerified);

        if (!user.emailVerified) {
          try {
            await sendEmailVerification(user);
            console.log(" Verification email sent");
          } catch (error) {
            console.error(" Error sending verification email:", error);
          }
        }

        if (user.emailVerified) {
          console.log("Email verified! Navigating to home...");
          navigate("/");
        }
      } else {
        console.log(" No user logged in. Redirecting to sign-in...");
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [navigate, setUserEmail, setUserId, setIsVerified]);

  useEffect(() => {
    const checkVerification = async () => {
      if (!auth.currentUser) return;

      await auth.currentUser.reload();
      const verified = auth.currentUser?.emailVerified || false;
      setIsVerified(verified);

      if (verified && userId) {
        await updateDoc(doc(db, "users", userId), { emailVerified: true });

        console.log("✅ Email verified! Redirecting to home...");
        navigate("/");
      }
    };

    // ✅ Check verification status every 3 seconds
    const interval = setInterval(checkVerification, 3000);

    return () => clearInterval(interval);
  }, [userId, navigate]);

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage("");
  
    try {
      if (!auth.currentUser) {
        setResendMessage("User not found. Please log in again.");
        setResendLoading(false);
        setTimeout(() => setResendMessage(""), 60000); // Hide after 1 minute
        return;
      }
  
      const actionCodeSettings = {
        url: `${import.meta.env.VITE_BASE_URL}/verify-email`,
        handleCodeInApp: true,
      };
  
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      localStorage.setItem("emailVerificationSent", "true");
  
      setResendMessage("Verification link resent. Check your inbox.");
    } catch (error: any) {
      console.error("Error resending verification link:", error);
      if (error.code === "auth/too-many-requests") {
        setResendMessage("Too many attempts. Try again later.");
      } else {
        setResendMessage("Error resending link. Try again later.");
      }
    } finally {
      setResendLoading(false);
      setTimeout(() => setResendMessage(""), 60000); // Hide message after 1 minute
    }
  };
  

  if (isVerified) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${bgColor2}`}
    >
       <Seo
  title="Two-Factor Authentication | Eventurelly"
  description="Verify your identity with two-factor authentication to securely access your Eventurelly account."
  name="Eventurelly"
  type="website"
  robots="noindex, nofollow"
/>

      <div
        className={`p-6 rounded-lg shadow-lg text-center w-full max-w-md ${bgColor} ${textColor}`}
      >
        <div className="flex justify-center items-center w-14 h-14 bg-pink-200 rounded-full mx-auto mb-4">
          <img 
           loading="lazy"
          src="/images/icon/mail.png" alt="mail" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
        <p className="text-gray-600 text-sm dark:text-gray-300 mb-2">
          We've sent a verification link to {userEmail}.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Didn’t get a link?{" "}
          <span
            className={`underline ${
              resendLoading
                ? "text-primary cursor-not-allowed"
                : "text-primary text-hover cursor-pointer"
            }`}
            onClick={!resendLoading ? handleResend : undefined}
          >
            {resendLoading ? "Resending..." : "Click to resend"}
          </span>
        </p>
        {resendMessage && (
          <p className="text-center text-green-500 text-base font-semibold mt-2">
            {resendMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuth;
