import { useContext } from "react";
import { BackThemeProviderContext } from "../contexts/BackThemeContext";


export const useIconColor = () => { 
    const { theme } = useContext(BackThemeProviderContext);
  
    return {
      textColor: theme === "light" ? "text-slate-900" : "text-slate-50",
      pColor: theme === "light" ? "text-foreground" : "text-[var(--light)]",
      bgColor: theme === "light" ? "bg-slate-100" : "bg-blue-600/20",
      bgColor2: theme === "light" ? "bg-slate-100" : "bg-slate-950",
     
    };
  };
  