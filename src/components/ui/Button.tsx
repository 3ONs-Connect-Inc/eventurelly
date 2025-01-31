import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, to, type = 'button', className = '', disabled }) => {
  const baseClasses =
    "px-6 py-2 font-semibold shadow transition duration-300 cursor-pointer";

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${className} `}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className} `}
    >
      {label}
    </button>
  );
};

export default Button;
