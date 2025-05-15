import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useRecaptcha from "../../hooks/ui/useRecaptcha";
import { useRegisterFormHandler } from "../../hooks/auth/useRegisterFormHandler";
import { useMap } from "../../hooks/ui/useMap";
import { validateCompanyAndDomain } from "../../utils/validations/corporateValidation";
import { useColor } from "../../hooks/ui/useColor";
import { Country } from "../../types";
import Button from "../ui/Button";
import { FormRenderer } from "../ui/FormRenderer";
import { registerFormFields } from "../../data/auth/auth";
import { ThemeContext } from "../../context/ThemeContext";

const center = {
  lat: 7.2905715,
  lng: 80.6337262,
};

const CAdminForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { captchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const { textColor } = useColor();
  const { theme } = useContext(ThemeContext);
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    showMap,
    handleBlur,
  } = useRegisterFormHandler(
    {
      id: "",
      companyName: "",
      normalizedCompanyName: "",
      companyAddress: "",
      companyContact: "+1",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      ageConfirmed: false,
      terms: false,
      captcha: "",
      role: "CorporateAdmin",
    },
    recaptchaRef,
    captchaToken
  );

  const {
    isLoaded,
    loadError,
    handleMapClick,
    markerPosition,
    setMarkerPosition,
    addressInputRef,
    mapRef,
    markerRef,
  } = useMap(center, setFormData);

  if (loadError) return;
  if (!isLoaded) return;

  const handleCompanyBlur = async () => {
    if (!formData.companyName.trim()) return;

    const asyncErrors = await validateCompanyAndDomain(formData);

    setErrors((prevErrors) => ({
      ...prevErrors,
      companyName: asyncErrors.companyName || "",
    }));
  };

  const handleEmailBlur = async () => {
    if (!formData.email.trim()) return;

    const asyncErrors = await validateCompanyAndDomain(formData);

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: asyncErrors.email || "", // Show error if exists, else clear it
    }));
  };

  return (
    <div>
      <div className="text-left">
        <h2 className={`font-bold text-2xl  ${textColor}`}>Sign Up</h2>
        <div className={`mt-2 font-normal text-lg  mb-7 ${textColor}`}>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary font-bold">
            Sign In
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <FormRenderer
          fields={registerFormFields}
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          specialHandlers={{
            handleCompanyBlur,
            handleEmailBlur,
            handleBlur,
            handleRecaptcha,
          }}
          refs={{
            addressInputRef,
          }}
          setFormData={setFormData}
          countries={countries}
          recaptchaRef={recaptchaRef}
          handleRecaptcha={handleRecaptcha}
          theme={theme}
          showMap={showMap}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
          mapRef={mapRef}
          markerRef={markerRef}
          handleMapClick={handleMapClick}
        />

        <div className="items-center flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            label={loading ? "Loading..." : "Create Account"}
            className="w-full bg-primary text-white rounded-lg bg-hover mt-4 mb-4 transition"
          />
        </div>
      </form>
    </div>
  );
};

export default CAdminForm;
