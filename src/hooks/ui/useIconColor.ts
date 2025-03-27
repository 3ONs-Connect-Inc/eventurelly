import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const useIconColor = () => { 
    const { theme } = useContext(ThemeContext);
  
    return {
      textColor: theme === "light" ? "text-dark-gray" : "text-[var(--light)]",
      pColor: theme === "light" ? "text-gray" : "text-[var(--light)]",
      bgColor: theme === "light" ? "bg-white" : "bg-[var(--dark)]",
      bgColor2: theme === "light" ? "bg-off-white" : "bg-[var(--dark-theme)]",
      bgGradient: theme === "light" ? "bg-gradient-to-r from-[#F9F5FF] to-[#F0F9FF] from-80%" : "bg-gradient-to-r from-[#0e1414] to-[#333333] from-80%",
    };
  };
  