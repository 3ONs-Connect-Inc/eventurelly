import React, { useEffect, useState } from "react";
import CAdminForm from "../../components/auth/CAdminForm";
import useFetchCountries from "../../hooks/ui/useFetchCountries";
import { Link, useLocation } from "react-router-dom";
import Seo from "../../components/Seo";
import { useColor } from "../../hooks/ui/useColor";
import EmployeeForm from "../../components/auth/EmployeeForm";

const CreateAccount: React.FC = () => {
  const countries = useFetchCountries();
  const  {bgColor} = useColor();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");
  const [isCorporateAdmin, setIsCorporateAdmin] = useState(role !== "member");
   
  const handleToggle = (selection: boolean) => {
    setIsCorporateAdmin(selection);
  };

  useEffect(() => {
    setIsCorporateAdmin(role !== "member");
  }, [role]);

  return (
    <div className={`${bgColor} flex flex-col md:flex-row min-h-screen  w-full`}>
      <Seo
          title="Sign Up | Eventurelly - Plan and Share Your Events"
  description="Create your Eventurelly account to start planning, organizing, and sharing events seamlessly. Join thousands of event creators today."
        name="Eventurelly."
        type="website"
        robots="noindex, nofollow"
      />
      {/* Logo - Visible on small screens only */}
      <div className="mx-4 w-40 mt-4 h-auto md:hidden">
        <Link to="/">
          <img
            src="/images/logo/logo-blk.png"
            alt="logo"
            loading="lazy"
            className="block dark:hidden md:hidden "
          />

          <img
            src="/images/logo/logo-wte.png"
            alt="logo"
            loading="lazy"
            className="hidden dark:block dark:md:hidden "
          />
        </Link>
      </div>

      {/* Left Section - Hidden on small screens */}
      <div className="relative hidden md:flex w-1/2 min-h-screen bg-gradient-to-r from-gray-700 to-gray-900">
        {/* Background image */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#170055] to-[#000000] opacity-0"></div>
        <div className="absolute inset-0 h-full">
          <img
            src="/images/ppl/p3.png"
            alt="background"
            loading='lazy'
            className="w-full h-full object-cover "
          />
        </div>
        {/* Text section */}
        <div className="absolute bottom-40 left-15 text-background">
          <h2 className="text-4xl font-bold ">Create an Account</h2>
          <p className="mt-4 text-lg max-w-sm text-secondary-foreground font-normal ">
            Access your dashboard, manage bookings, and connect with clients
            seamlessly.
          </p>
          <Link to="/">
            <img
              src="/images/logo/logo-wte.png"
              alt="logo"
              loading="lazy"
              className="mt-6 w-60 h-auto "
            />
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-10 p-6 px-26 max-[1031px]:px-10  max-md:items-center max-[568px]:px-5 max-md:mt-10">
      <div className="flex bg-gray-200 rounded-lg p-1 mb-6 w-64 text-center max-[258px]:w-55">
          <div
            className={`w-1/2 py-2 rounded-lg  font-medium text-xs cursor-pointer transition-all duration-300 ${
              isCorporateAdmin
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-600 "
            }`}
            onClick={() => handleToggle(true)}
          >
            Corporate Admin
          </div>
          <div
            className={`w-1/2 py-2 rounded-lg  font-medium text-xs cursor-pointer transition-all duration-300 ${
              !isCorporateAdmin
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-600"
            }`}
            onClick={() => handleToggle(false)}
          >
            Corporate Member
          </div>
        </div>

        {/* Forms */}
        <div className="w-full max-w-md">
        {isCorporateAdmin ? (
            <CAdminForm countries={countries} />
          ) : (
            <EmployeeForm countries={countries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
