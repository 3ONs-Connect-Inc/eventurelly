import React, { useContext, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import useLogout from "../../hooks/auth/useLogout";
import { useColor } from "../../hooks/ui/useColor";
import { ThemeContext } from "../../context/ThemeContext";
import Logo from "./Logo";
import { motion } from "framer-motion";
import { IoClose, IoMenu } from "react-icons/io5";
import AuthButtons from "./AuthButtons";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const { handleLogout } = useLogout();
  const { textColor, bgColor } = useColor();  

  return (
    <nav
      className={`sticky  top-0 dark:shadow-gray-800 left-0 w-full  ${bgColor} shadow-md p-4  max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16  z-[999]`}
    >
       <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
       <Logo />
      <div className="max-md:block hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className="relative z-[1]"
        >
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: isOpen ? 180 : 0, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-[1]"
          >
            {isOpen ? (
              <IoClose className={`h-7 w-7  ${textColor}`} />
            ) : (
              <IoMenu className={`h-7 w-7  ${textColor}`} />
            )}
          </motion.div>
        </motion.button>
      </div>
      <div className="max-md:hidden flex gap-6 items-center ">
        <NavLinks  />
        <AuthButtons handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      </div>
      <MobileMenu
        isOpen={isOpen}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        toggleTheme={toggleTheme}
        theme={theme}
      />
    </div>
    </nav>
  );
};

export default Navbar;
