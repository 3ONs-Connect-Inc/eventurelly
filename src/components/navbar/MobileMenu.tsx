import { AnimatePresence, motion } from "framer-motion";
import AuthButtons from "./AuthButtons";
import ThemeToggle from "./ThemeToggle";
import { useColor } from "../../hooks/ui/useColor";
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants";


const MobileMenu = ({
  isOpen,
  handleLogout,
  isLoggedIn,
  toggleTheme,
  theme,
}: {
  isOpen: boolean;

  handleLogout: () => void;
  isLoggedIn: boolean;
  toggleTheme: () => void;
  theme: string;
}) => {
    const { textColor, bgColor } = useColor();  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-14 left-0  w-full overflow-y-auto h-[350px] max-h-screen 
              ${bgColor} shadow-md text-black-light 
              flex-col items-center gap-4 py-6 max-md:flex hidden z-40 text-sm`}
          >
            {navLinks.map((link, index) => (
              <li key={index}>
           <NavLink   to={link.href}
                className={({ isActive }) =>
          `text-center w-full flex justify-between items-center px-6 py-2
              font-normal cursor-pointer font-outfit  text-hover transition
          ${isActive ? "text-primary" : textColor}`}>
                  {link.label}
               </NavLink>
              </li>
            ))}
            <li>
              <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
            </li>
            <li className="mt-4">
              <AuthButtons
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
