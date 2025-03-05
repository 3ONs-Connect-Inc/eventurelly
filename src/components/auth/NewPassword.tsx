import Button from "../ui/Button";
import Input from "../ui/Input";

interface PasswordResetProps {
  handleNewPasswordSubmit: (e: React.FormEvent) => void;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  confirmPassword: string;
  errors: any;
  setErrors: any;
  loading: any;
  message: any;
}

const NewPassword: React.FC<PasswordResetProps> = ({
  handleNewPasswordSubmit,
  setNewPassword,
  setConfirmPassword,
  newPassword,
  confirmPassword,
  errors,
  setErrors,
  loading,
  message,
}) => {
  return (
    <>
      <div className="flex justify-center items-center w-14 h-14 bg-pink-200 rounded-full mx-auto mb-4">
        <img src="/images/icon/lock.png" 
         loading="lazy"
        alt="mail" />
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Reset Password</h2>
        <p className="text-gray-500 mt-2">Enter your new password below.</p>
      </div>

      {message && (
        <p className="text-green-500 text-sm mb-3">{message}</p>
      )}

      <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          className="text-left"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrors((prev: any) => ({ ...(prev ?? {}), password: "" }));
          }}
          errors={{
            password: errors.password,
          }}
        />
        {errors?.password && (
          <p className="text-red-500 text-sm  text-left  mb-3">
            {errors.password}
          </p>
        )}

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Retype password"
          className="text-left"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors((prev: any) => ({
              ...(prev ?? {}),
              confirmPassword: "",
            }));
          }}
          errors={{
            confirmPassword: errors.confirmPassword,
          }}
        />

        {/* Button Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
          <Button
            label="Cancel"
            onClick={() => (window.location.href = "/sign-up")}
            className="bg-gray-300 text-gray-800 w-full rounded-lg bg-hover sm:w-auto"
          />
          <Button
            label={loading ? "Resetting..." : "Reset Password"}
            type="submit"
            className="bg-primary text-white w-full rounded-lg  bg-hover hover:bg-opacity-80 sm:w-auto"
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
};

export default NewPassword;
