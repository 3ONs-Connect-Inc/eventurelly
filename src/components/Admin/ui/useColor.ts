import { useContext } from "react";
import { BackThemeProviderContext } from "../contexts/BackThemeContext";


export const useColor = () => { 
    const { theme } = useContext(BackThemeProviderContext);
  
    return {
      textColor: theme === "light" ? "text-slate-900" : "text-slate-50",
      pColor: theme === "light" ? "text-foreground" : "text-[var(--light)]",
      bgColor: theme === "light" ? "bg-slate-20 text-slate-900" : "bg-blue-600/20 text-[var(--light)]",
      bgColor2: theme === "light" ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-[var(--light)]",
      bgBtn: theme === "light" ? "bg-blue-500" : "bg-blue-600",
      textCol: theme === "light" ? "text-blue-500" : "text-blue-600",
    };
  };
  