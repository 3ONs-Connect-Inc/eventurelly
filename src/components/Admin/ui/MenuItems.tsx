import React from 'react'

type MenuProps = {
    children: React.ReactNode;
  };
  
  type MenuItemProps = {
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick: () => void;
  };
export const Menu: React.FC<MenuProps> = ({ children }) => 
<nav className="space-y-2">{children}</nav>;

export const MenuItem: React.FC<MenuItemProps> = ({ icon, children, onClick }) => (
  <button className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-200" onClick={onClick}>
    {icon}
    <span>{children}</span>
  </button>
);

