import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../hooks/use-theme";
import { Button } from "../ui/Button";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      <div className="flex items-center gap-x-3">
        <Button
          className="btn-ghost size-10 "
          aria-label="toggle collapse"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </Button>
        <div className="input">
          <Search size={20} className="text-slate-300" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button
          aria-label="theme"
          className="btn-ghost size-10 "
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun size={20} className="dark:hidden" />
          <Moon size={20} className="hidden dark:block" />
        </Button>
        <Button aria-label="bell icon" className="btn-ghost size-10 ">
          <Bell size={20} />
        </Button>

        <Button
          aria-label="profile"
          imgSrc="/images/avatar.png"
          imgAlt="Profile image"
          className="size-10 overflow-hidden rounded-full"
        />
      </div>
    </header>
  );
};
