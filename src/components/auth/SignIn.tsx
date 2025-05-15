import { Link } from "react-router-dom";
import Button from "../ui/Button";
import useSignIn from "../../hooks/auth/useSignIn";
import { useColor } from "../../hooks/ui/useColor";
import { FormRenderer } from "../ui/FormRenderer";
import { signInFormFields } from "../../data/auth/auth";

const SignIn = () => {
  const { textColor } = useColor();
  const {
    formData,
    errors,
    generalError,
    setErrors,
    handleBlur,
    loading,
    handleChange,
    handleSubmit,
  } = useSignIn();

  return (
    <div className="text-left">
      <h2 className={`font-bold text-2xl  ${textColor}`}>
        Log In to Eventurelly
      </h2>
      <p className={`mt-2 font-normal text-lg  mb-7 ${textColor}`}>
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-primary text-hover font-bold">
          Sign Up
        </Link>
      </p>

      {generalError && (
        <div className="bg-red-500 text-white font-normal text-base p-2 rounded-md mb-4">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormRenderer
          fields={signInFormFields}
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          specialHandlers={{
            handleBlur,
          }}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center font-normal font-outfit text-left sm:text-right">
          <Link
            to="/forgot-password"
            className="font-normal font-outfit hover:underline dark:text-[var(--light)] text-sm mt-2 sm:mt-0"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          disabled={loading}
          label={loading ? "Loading..." : "Log In"}
          type="submit"
          className="w-full bg-primary text-white  bg-hover rounded-lg  transition"
        />
      </form>
    </div>
  );
};

export default SignIn;
