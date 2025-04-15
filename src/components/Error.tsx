import React from "react";
import { useNavigate } from "react-router-dom";

type ErrorProps = {
  message?: string;
  onReset?: () => void;
};

const Error: React.FC<ErrorProps> = ({ message, onReset }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (onReset) {
      onReset();
    }
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Oops! Something went wrong.</h1>
        <p className="text-gray-600 mb-6">
          {message || "An unexpected error has occurred. Please try again."}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-primary cursor-pointer hover:bg-primary text-white font-medium rounded-lg transition"
          >
            Go to Home
          </button>
          {onReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
