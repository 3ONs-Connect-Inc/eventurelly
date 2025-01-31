import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Find Events", href: "#" },
  { label: "Create Events", href: "#" },
  { label: "Find My Tickets", href: "#" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      <Link to="/">
        <img
          src="/images/logo-blk.png"
          alt="Logo"
          className="h-10 md:h-8 lg:h-10"
        />
      </Link>

      {/* Hamburger Menu Button */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className="relative z-50"
        >
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: isOpen ? 180 : 0, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <IoClose className="h-7 w-7 text-gray-900" />
            ) : (
              <IoMenu className="h-7 w-7 text-gray-900" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center text-color font-medium md:text-sm lg:text-base">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className="cursor-pointer font-normal hover-root-color transition"
          >
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
        <li className="flex gap-4">
          <Link to="/sign-in">
            <Button
              label="Log In"
              className="text-root-color bg-white rounded-lg  border font-semibold font-inter border-color hover-effect cursor-pointer"
            />
          </Link>
          <Link to="/sign-up">
            <Button
              label="Sign Up"
              className="bg-root-color text-white border rounded-lg  font-semibold font-inter border-color bg-hover cursor-pointer"
            />
          </Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-14 left-0 w-full bg-white shadow-md text-color flex flex-col items-center gap-4 py-6 md:hidden text-sm"
          >
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer font-normal hover-root-color transition"
              >
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li className="flex gap-4">
              <Link to="/sign-in">
                <Button
                  label="Log In"
                  className="text-root-color bg-white border rounded-lg  font-semibold font-inter border-color hover-effect  cursor-pointer"
                />
              </Link>
              <Link to="/sign-up">
                <Button
                  label="Sign Up"
                  className="bg-root-color text-white font-semibold rounded-lg  font-inter border border-color bg-hover cursor-pointer"
                />
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
