import React from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Link, useNavigate } from "react-router-dom";

const GetStarted: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (title: string) => {
    navigate(
      `/sign-up?role=${title === "Corporate Admin" ? "admin" : "member"}`
    );
  };

  return (
    <div className=" max-[640px]:mt-10  flex flex-col items-center w-full min-h-screen px-4 sm:px-8 lg:px-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 sm:mt-32">
        <h2 className="text-3xl sm:text-5xl  font-bold mb-4 dark:text-[var(--light)] ">
          Welcome to Eventurelly
        </h2>
        <p className="text-xl font-normal  dark:text-[var(--light)] ">
          Choose your account type to get started
        </p>
      </div>

      {/* Card Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        <Card
          image="/images/p1.jpeg"
          title="Corporate Admin"
          description="Manage your company's event operations effortlessly."
          buttonText="Next"
          className="bg-pink rounded-lg"
          onClick={() => handleNavigation("Corporate Admin")}
        />

        <Card
          image="/images/p2.jpeg"
          title="Corporate Member"
          description="Join your company's event team and collaborate seamlessly."
          buttonText="Next"
          className="bg-pink rounded-3xl"
          onClick={() => handleNavigation("Corporate Member")}
        />
      </div>

      {/* Join Section */}
      <div className="flex flex-col items-center text-center mt-12">
        <h2 className="text-lg sm:text-2xl font-normal dark:text-[var(--light)]   mb-4">
          Join our team as an Event Architect
        </h2>
     <Link to='/sign-up'>
     <Button
          label="Join Now"
          className="bg-white rounded-lg border black-2 border-color hover-effect mb-20"
        />
     </Link>
      </div>
    </div>
  );
};

export default GetStarted;
