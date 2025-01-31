import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100 text-gray-800 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist.
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

export default NotFound;
