import React from "react";
import { useNavigate } from "react-router-dom";
import { useColor } from "../hooks/ui/useColor";
import Button from "../components/ui/Button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { textColor,  bgColor } = useColor();
  return (
    <div className={`${bgColor} ${textColor} flex flex-col justify-center items-center h-screen w-full  text-center`}>
      <h1 className="text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8 font-bold mb-4">404 - Page Not Found</h1>
      <p className="font-normal text-base  md:text-xl max-sm:text-tiny mb-8">
        The page you are looking for does not exist.
      </p>
      <Button
      label=" Go to Home"
        className="px-6 py-3 bg-primary bg-hover cursor-pointer max-sm:text-tiny text-white"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default NotFound;
