import React from "react";
import SignIn from "../../components/auth/SignIn";
import { Link } from "react-router-dom";
import LazyImage from "../../components/LazyImage";
import Seo from "../../components/Seo";

const SignInAccount: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <Seo
        title="Sign in Account"
        description="Sign in Account page."
        name="Eventurelly."
        type="website"
      />
      {/* Logo - Visible on small screens only */}
      <div className="md:hidden mx-4 w-40 h-auto mt-4 mb-10">
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
      {/* Left Section */}
      <div className="relative  w-full md:w-1/2 min-h-full bg-gradient-to-r from-gray-700 to-gray-900 flex flex-col items-center md:block">
        {/* Background image for smaller screens */}
        <div className="relative w-full md:hidden h-100 overflow-hidden ">
          <img
            loading="lazy"
            src="/images/ppl/p3.png"
            alt="background"
            className="w-full h-full object-cover object-top"
          />

          {/* Welcome Back Text */}
          <div className="absolute bottom-15 left-5 text-white">
            <h2 className="text-2xl font-bold ">Welcome back,</h2>
          </div>
        </div>

        {/* Background image for larger screens */}
        <div className="hidden md:block absolute inset-0 h-full">
          <LazyImage
            src="/images/ppl/p3.png"
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-l dark:from-gray-900 from-gray-300 via-transparent to-transparent" />
        </div>

        {/* Text section for larger screens */}
        <div className="hidden md:absolute md:bottom-10 md:left-10 md:text-white md:block">
          <h2 className="text-4xl font-bold">Welcome back,</h2>
          <p className="mt-4 text-lg max-w-sm text-gray-light font-normal">
            Access your dashboard, manage bookings, and connect with clients
            seamlessly.
          </p>
          <Link to="/">
            <img
              loading="lazy"
              src="/images/logo/logo-wte.png"
              alt="logo"
              className="mt-6 w-60 h-auto "
            />
          </Link>
        </div>
      </div>

      {/* Right Section - Below left section on small screens */}
      <div className="flex flex-col w-full md:w-1/2 mt-10 p-6 px-26 max-[1031px]:px-10 max-md:items-center max-[568px]:px-5 max-md:mt-10">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInAccount;
