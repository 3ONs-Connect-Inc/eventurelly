import { NavLink } from "react-router-dom";
import { useColor } from "../../hooks/ui/useColor";
import { navLinks } from "../constants";




const NavLinks: React.FC = () => {
    const { textColor } = useColor();  
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
