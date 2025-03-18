import  { useState } from "react";
import { useIconColor } from "../../hooks/useIconColor";
import { useAppSelector } from "../../hooks/redux";

const Profile = ({ handleLogout }: { handleLogout: () => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const { activeUser } = useAppSelector((state) => state.user);
    const {bgColor, textColor, pColor}= useIconColor();

    return (
      <div>
        <div className="cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img src="/images/ppl/p1.jpeg" alt="Profile" className="w-12 h-12 rounded-full" />
        </div>
        {isDropdownOpen && (
          <div className={`${bgColor} ${textColor} border-t border-border-gray  absolute right-0 mt-2 w-56 max-md:w-full  shadow-lg
           rounded-lg flex flex-col p-4 space-y-2 text-sm max-md:items-center`}>
            <div className="flex items-center space-x-3 whitespace-nowrap">
              <img src="/images/ppl/p1.jpeg" alt="Profile" className="w-10 h-10 rounded-full" />
              <div>
                <h2 className="font-semibold ">{activeUser?.companyName}</h2>
                <p className={`${pColor} font-normal`}>{activeUser?.email}</p>
              </div>
            </div>
            <div className="border-t font-medium text-sm border-border-gray pt-2 flex flex-col space-y-2 w-full 
            whitespace-nowrap max-md:items-center  ">
              <span className="cursor-pointer hover:text-primary">View profile</span>
              <span className="cursor-pointer hover:text-primary">Settings</span>
              <span className="cursor-pointer hover:text-primary">Keyboard shortcuts</span>
              <span className="cursor-pointer hover:text-primary">Company profile</span>
              <span className="cursor-pointer hover:text-primary">Team</span>
              <span className="cursor-pointer hover:text-primary">Invite colleagues</span>
              <span className="cursor-pointer hover:text-primary">Changelog</span>
              <span className="cursor-pointer hover:text-primary">Slack Community</span>
              <span className="cursor-pointer hover:text-primary">Support</span>
              <span className="cursor-pointer hover:text-primary">API</span>
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