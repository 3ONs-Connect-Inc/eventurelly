import { NavLink } from "react-router-dom";
import { navLinks } from "../../../data";
import { useIconColor } from "../../hooks/useIconColor";




const NavLinks: React.FC = () => {
    const { textColor } = useIconColor();  
  return (
    <ul className="flex gap-6 items-center font-medium md:text-sm lg:text-base">
      {navLinks.map((link, index) => (
        <li   key={index}>
         <NavLink   to={link.href}
        className={({ isActive }) => 
          `relative cursor-pointer font-outfit 
          ${isActive ? "text-primary" : textColor} 
          font-normal text-hover transition`}
        >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default NavLinks;
