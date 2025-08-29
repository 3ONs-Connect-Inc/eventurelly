import { Link } from "react-router-dom";
import { useColor } from "../../hooks/ui/useColor";
import Button from "./../../components/ui/Button";
import Seo from "../../components/Seo";

const PasswordSuccess = () => {
  const { textColor, bgColor, bgColor2 } = useColor();
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center  bg-opacity-50 ${bgColor2}`}
    >
       <Seo
  title="Password Reset Successful | Eventurelly"
  description="Your password has been successfully reset. You can now log in and continue planning your events with Eventurelly."
  name="Eventurelly"
  type="website"
  robots="noindex, nofollow"
/>

      <div
        className={`p-6 rounded-lg shadow-lg text-center w-full max-w-md ${bgColor} ${textColor}`}
      >
        <div className="flex justify-center items-center w-14 h-14 bg-green-100 rounded-full mx-auto mb-4">
          <img src="/images/icon/check.png" 
           loading="lazy"
          alt="check" />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">Password Changed</h2>
          <p className="text-sm font-normal">You can log in with your new password</p>
        </div>

        <Link to="/sign-in" className="flex w-full ">
          <Button
            label="Log in"
            type="submit"
            className="bg-gray-100 text-black w-full rounded-lg  bg-hover border border-gray-300 hover:bg-opacity-80 "
          />
        </Link>
      </div>
    </div>
  );
};

export default PasswordSuccess;
