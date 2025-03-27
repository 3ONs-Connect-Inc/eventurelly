
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Admin/nav/Sidebar";
import NavBarLayout from './../../components/Admin/nav/NavBarLayout';


const RootLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
 <>
 <NavBarLayout />
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        <Outlet context={{ activeTab, setActiveTab }} />
      </div>
    </div>
 </>
  );
};

export default RootLayout;
