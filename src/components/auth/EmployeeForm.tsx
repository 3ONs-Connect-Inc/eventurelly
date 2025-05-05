import { useEmployeeFormHandler } from "../../hooks/auth/useEmployeeFormHandler";
import useRecaptcha from "../../hooks/ui/useRecaptcha";
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import CompanyDropdown from "../ui/CompanyDropdown";
import EmailAddressInput from "../ui/EmailAddressInput";
import Checkbox from "../ui/Checkbox";
import { Country } from "../../types";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { useIconColor } from "../../hooks/ui/useIconColor";

const EmployeeForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { captchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const { theme } = useContext(ThemeContext);
    const { textColor } = useIconColor();
    
  const {
    formData,
    errors,  
    loading,
    domains,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    formSubmitted
  } = useEmployeeFormHandler(
    {
      id: "",
      companyName: "",
      firstName: "",
      lastName: "",
      companyContact: "+1",
      phoneNumber: "",
      emailUsername: "",
      emailDomain: "",
      password: "",
      confirmPassword: "",
      ageConfirmed: false,  
      captcha: "",
      terms: false,
      role: "User",
    },
    recaptchaRef,
    captchaToken
  );

  return (
    <>
      <div className="text-left">
        <h2 className={`font-bold text-2xl ${textColor}`}>
          Sign Up
        </h2>
        <div className={`mt-2 font-normal text-lg  mb-7 ${textColor}`}>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary font-bold">
            Sign In
          </Link>
        </div>
      </div>




      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
         
          onChange={handleChange}
          placeholder="John"
          errors={{
            firstName: formSubmitted ? errors.firstName : undefined,
          }}
          setErrors={setErrors}
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          errors={{
            lastName: formSubmitted ? errors.lastName : undefined,
          }}
          setErrors={setErrors}
        />

        <CompanyDropdown
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          errors={{
            companyName: formSubmitted ? errors.companyName : undefined,
          }}
          setErrors={setErrors}
        />

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

        <EmailAddressInput
          emailUsername={formData.emailUsername}
          emailDomain={formData.emailDomain}
          domains={domains}
          onUsernameChange={(e) => handleChange(e)}
          onDomainChange={(e) => {
            const domain = e.target.value.trim();
            if (!domain) {
              return;
            }
            handleChange(e);  
          }}
          errors={{
            emailUsername: errors.emailUsername,
            emailDomain: errors.emailDomain,
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
          checked={!!formData.terms}
          onChange={handleChange}
          label={
            <>
              I agree to{" "}
              <Link to="#" className="text-primary font-bold">
                Policy
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-primary font-bold">
                Terms and Conditions
              </Link>
            </>
          }
          errors={errors}
        />

        <div className="items-center flex justify-center">
          <Button
            disabled={loading}
            label={loading ? "Loading..." : "Create Account"}
            type="submit"
            className="w-full bg-primary text-white rounded-lg bg-hover mt-4 transition"
          />
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
