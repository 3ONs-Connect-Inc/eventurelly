import  { useRef, useState } from "react";
import { useIconColor } from "../../hooks/ui/useIconColor";
import { useAppSelector } from "../../hooks/redux";
import useClickOutside from "../../hooks/ui/useClickOutside";

const Profile = ({ handleLogout }: { handleLogout: () => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const { activeUser } = useAppSelector((state) => state.user);
    const {bgColor, textColor, pColor}= useIconColor();

 // Create a ref for the profile dropdown and profile image
 const dropdownRef = useRef<HTMLDivElement>(null);
 const profileRef = useRef<HTMLDivElement>(null); // This is the profile image container

 // Use the custom hook to close the dropdown when clicking outside
 useClickOutside([dropdownRef, profileRef], () => setIsDropdownOpen(false));

 // Handle click on profile image to toggle dropdown
 const handleProfileClick = (e: React.MouseEvent) => {
   e.stopPropagation(); // Prevents this click from triggering the `useClickOutside` hook
   setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown state
 };

    return (
      <div className="lg:relative " ref={profileRef}>
        <div className="cursor-pointer" onClick={handleProfileClick}>
          <img src="/images/ppl/p1.jpeg" alt="Profile" className="w-12 h-12 rounded-full" />
        </div>
        {isDropdownOpen && (
          <div
          ref={dropdownRef}
          className={`${bgColor}  ${textColor} border-t border-border-gray  absolute mt-2 w-56 right-0 lg:-right-18 left-auto max-md:w-full  shadow-lg
           rounded-lg flex flex-col p-4 space-y-2 text-sm max-md:items-center`}>
            <div className="flex items-center space-x-3  md:whitespace-nowrap">
              <img src="/images/ppl/p1.jpeg" alt="Profile" className="w-10 h-10 rounded-full" />
              <div className="break-all max-w-full" >
              <h2 className="font-semibold text-wrap">{activeUser?.companyName}</h2>
              <p className={`${pColor} text-wrap font-normal `}>{activeUser?.email}</p>
              </div>
            </div>
            <div className="border-t font-medium text-sm border-border-gray pt-2 flex flex-col space-y-2 w-full 
            whitespace-nowrap max-md:items-center  ">
            
              <span
                onClick={handleLogout}
                className="cursor-pointer text-primary "
              >
                Log out
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default Profile;