import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { GoSun } from "react-icons/go";
import { FiMoon } from "react-icons/fi";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="p-4 shadow-md flex justify-between items-center ">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">My Website</h1>
      <button
        onClick={toggleTheme}
        className="flex items-center p-2 rounded-full
         bg-gray-100 dark:bg-gray-300 hover:shadow-md"
      >
        {theme === "light" ? <FiMoon size={20} /> : <GoSun size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
