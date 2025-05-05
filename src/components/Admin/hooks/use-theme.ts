import { useContext } from "react";
import { BackThemeProviderContext } from "../contexts/BackThemeContext";

export const useTheme = () => {
  const context = useContext(BackThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
