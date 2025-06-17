
import { createContext, useState, ReactNode, FC } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const BackThemeProviderContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => null,
});

interface BackThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const BackThemeProvider: FC<BackThemeProviderProps> = ({
  children,
  defaultTheme = "system",
  storageKey = "admin-ui-theme",
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    return stored || defaultTheme;
  });

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <BackThemeProviderContext.Provider value={{ theme, setTheme }}>
      <div className={resolvedTheme === "dark" ? "admin-dark" : ""}>
        {children}
      </div>
    </BackThemeProviderContext.Provider>
  );
};
