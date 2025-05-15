import { useEmployeeFormHandler } from "../../hooks/auth/useEmployeeFormHandler";
import useRecaptcha from "../../hooks/ui/useRecaptcha";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Country } from "../../types";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { useColor } from "../../hooks/ui/useColor";
import { FormRenderer } from "../ui/FormRenderer";
import { employeeFormFields } from "../../data/auth/auth";

const EmployeeForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { captchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const { theme } = useContext(ThemeContext);
  const { textColor } = useColor();

  const {
    formData,
    errors,
    loading,
    domains,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    formSubmitted,
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
        <h2 className={`font-bold text-2xl ${textColor}`}>Sign Up</h2>
        <div className={`mt-2 font-normal text-lg  mb-7 ${textColor}`}>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary font-bold">
            Sign In
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <FormRenderer
          fields={employeeFormFields}
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          specialHandlers={{
            handleRecaptcha,
          }}
          setFormData={setFormData}
          countries={countries}
          recaptchaRef={recaptchaRef}
          handleRecaptcha={handleRecaptcha}
          theme={theme}
          formSubmitted={formSubmitted}
          domains={domains}
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
