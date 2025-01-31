import React from "react";
import { useNavigate } from "react-router-dom";

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-red-100 text-red-900 text-center">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-8">
        An unexpected error occurred. Please try again later.
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error;
