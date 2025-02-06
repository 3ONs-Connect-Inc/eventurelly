import React, { useEffect, useState } from "react";
import CAdminForm from "../../components/auth/CAdminForm";
import EmployeeForm from "../../components/auth/EmployeeForm";
import useFetchCountries from "../../hooks/useFetchCountries";
import { useLocation } from "react-router-dom";

const Register: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");
  const [isCorporateAdmin, setIsCorporateAdmin] = useState(role !== "member");
  const countries = useFetchCountries();

  const handleToggle = (selection: boolean) => {
    setIsCorporateAdmin(selection);
  };

  useEffect(() => {
    setIsCorporateAdmin(role !== "member");
  }, [role]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Logo - Visible on small screens only */}
      <img
        src="/images/logo-blk.png"
        alt="logo"
        className="block md:hidden mx-4 w-35  mt-4 "
      />

      {/* Left Section - Hidden on small screens */}
      <div className="relative hidden md:flex w-1/2 min-h-screen bg-gradient-to-r from-gray-700 to-gray-900">
        {/* Background image */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#170055] to-[#000000] opacity-0"></div>
        <div className="absolute inset-0 h-full">
          <img
            src="/images/p3.png"
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-l from-gray-300 via-transparent to-transparent" />
        </div>

        {/* Text section */}
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold ">Create an Account</h2>
          <p className="mt-4 text-lg max-w-sm gray-5 font-normal ">
            Access your dashboard, manage bookings, and connect with clients
            seamlessly.
          </p>
          <img src="/images/logo-wte.png" alt="logo" className="mt-10 w-37" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-full md:w-1/2 mt-10 p-6 px-26 max-[1031px]:px-10  max-[768px]:items-center max-[568px]:px-5 max-[768px]:mt-10">
        {/* Toggle Button */}
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

export default Register;
