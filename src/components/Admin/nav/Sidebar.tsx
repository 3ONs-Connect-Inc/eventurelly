import { Home as HomeIcon, BarChart2, Table as TableIcon, Workflow } from "lucide-react";
import { Menu, MenuItem } from "../ui/MenuItems";

interface SidebarProps {
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <Menu>
        <MenuItem icon={<HomeIcon />} onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </MenuItem>
        <MenuItem icon={<Workflow />} onClick={() => setActiveTab("events")}>
          Events
        </MenuItem>
        <MenuItem icon={<BarChart2 />} onClick={() => setActiveTab("charts")}>
          Charts
        </MenuItem>
        <MenuItem icon={<TableIcon />} onClick={() => setActiveTab("tables")}>
          Tables
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Sidebar;
