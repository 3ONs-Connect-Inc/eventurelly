import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import useSignIn from "../../hooks/auth/useSignIn";
import { useIconColor } from "../../hooks/ui/useIconColor";

const SignIn = () => {
    const { textColor} = useIconColor();
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
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="abc@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          setErrors={setErrors}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          setErrors={setErrors}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center font-normal font-outfit text-left sm:text-right">
          <Checkbox
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            label="Remember Me"
          />
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
