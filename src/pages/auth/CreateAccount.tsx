import React from "react";
import CAdminForm from "../../components/auth/CAdminForm";
import useFetchCountries from "../../hooks/ui/useFetchCountries";
import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import LazyImage from "../../components/LazyImage";
import { useIconColor } from "../../hooks/ui/useIconColor";

const CreateAccount: React.FC = () => {
  const countries = useFetchCountries();
  const  {bgColor} = useIconColor()


  return (
    <div className={`${bgColor} flex flex-col md:flex-row min-h-screen w-full`}>
      <Seo
        title="Create Account"
        description="Create account page."
        name="Eventurelly."
        type="website"
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
          <LazyImage
            src="/images/ppl/p3.png"
            alt="background"
            className="w-full h-full object-cover "
          />
        </div>
        {/* Text section */}
        <div className="absolute bottom-10 left-10 text-background">
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
      <div className="flex flex-col w-full md:w-1/2 mt-10 p-6 px-26 max-[1031px]:px-10  max-md:items-center max-[568px]:px-5 max-md:mt-10">
     

        {/* Forms */}
        <div className="w-full max-w-md">
            <CAdminForm countries={countries} />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
