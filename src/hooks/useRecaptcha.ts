import { useState, useRef, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const useRecaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleRecaptcha = useCallback((token: string | null) => {
    setCaptchaToken(token || "");
  }, []);

  return { captchaToken, recaptchaRef, handleRecaptcha };
};

export default useRecaptcha;
