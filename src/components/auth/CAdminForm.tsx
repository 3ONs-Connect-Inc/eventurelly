import React, { useContext } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import PhoneInput from "../ui/PhoneInput";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "../../hooks/useRecaptcha";
import { useRegisterFormHandler } from "../../hooks/useRegisterFormHandler";
import { useMap } from "../../hooks/useMap";
import MapComponent from "../ShowMap";
import Checkbox from "../ui/Checkbox";
import { Country } from "../../types";
import { ThemeContext } from "../../context/ThemeContext";
import { validateCompanyAndDomain } from "../../utils/validations/corporateValidation";

const center = {
  lat: 7.2905715,
  lng: 80.6337262,
};

const CAdminForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { captchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
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
  } = useRegisterFormHandler(
    {
      id: "",
      companyName: "",
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
        <h2 className="font-bold text-2xl  dark:text-[var(--light)]">
          Sign Up
        </h2>
        <div className="mt-2 font-normal text-lg  mb-7 dark:text-[var(--light)]">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-root-color font-bold">
            Sign In
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Company Name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          onBlur={handleCompanyBlur}
          placeholder="Amazon"
          errors={{
            companyName: errors.companyName,
          }}
          setErrors={setErrors}
        />

        <Input
          label="Company Address"
          ref={addressInputRef}
          type="text"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleChange}
          placeholder="Enter your Address"
          errors={{
            companyAddress: errors.companyAddress,
          }}
          setErrors={setErrors}
        />

        {showMap && (
          <MapComponent
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
            setFormData={setFormData}
            addressInputRef={addressInputRef}
            mapRef={mapRef}
            handleMapClick={handleMapClick}
            markerRef={markerRef}
          />
        )}

        <PhoneInput
          companyContact={formData.companyContact}
          phoneNumber={formData.phoneNumber}
          countries={countries}
          onCompanyContactChange={(value) =>
            setFormData({ ...formData, companyContact: value })
          }
          onPhoneNumberChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, phoneNumber: value });
          }}
          errors={{
            companyContact: errors.companyContact,
            phoneNumber: errors.phoneNumber,
          }}
          setErrors={setErrors}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="abc@example.com"
          onBlur={handleEmailBlur}
          errors={{
            email: errors.email,
          }}
          setErrors={setErrors}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="N4&vQ2!p"
          errors={{
            password: errors.password,
          }}
          setErrors={setErrors}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="N4&vQ2!p"
          errors={{
            confirmPassword: errors.confirmPassword,
          }}
          setErrors={setErrors}
        />

        <div className="mb-4  flex flex-col justify-center items-center">
          <div
            className="captcha-container mt-4 mb-4"
            style={{
              width: "auto",
              transformOrigin: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
              ref={recaptchaRef}
              onChange={handleRecaptcha}
              theme={theme}
            />
          </div>
        </div>

        <Checkbox
          name="ageConfirmed"
          checked={formData.ageConfirmed}
          onChange={handleChange}
          label="I confirm that I am above the age of 18."
          errors={errors}
        />

        <Checkbox
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          label={
            <>
              I agree to{" "}
              <Link to="#" className="text-root-color font-bold">
                Policy
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-root-color font-bold">
                Terms and Conditions
              </Link>
            </>
          }
          errors={errors}
        />

        <div className="items-center flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            label={loading ? "Loading..." : "Create Account"}
            className="w-full bg-root-color text-white  mt-4"
          />
        </div>
      </form>
    </div>
  );
};

export default CAdminForm;
