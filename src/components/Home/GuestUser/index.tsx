import React from "react";
import { useIconColor } from "../../../hooks/ui/useIconColor";
import { SearchBar } from "../SearchBar";
import { HeroSection } from "../HeroSection";
import TeamBonding from "../TeamBonding";
import { TopPick } from "../Events";

interface GuestUserProps {
  handleNavigation: (title: string) => void;
}
const GuestUser: React.FC<GuestUserProps> = ({ handleNavigation }) => {
  const { bgGradient, bgColor } = useIconColor();

  return (
    <>
      <div
        className={`${bgGradient} min-h-auto flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16`}
      >
        <div className="w-full max-w-7xl mx-auto ">
          <SearchBar />
          <HeroSection />
        </div>
      </div>

      <div
        className={`w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow  ${bgColor}`}
      >
        <div className="max-w-7xl mx-auto">
            <TopPick />

          <div id="teamBondingSection">
            <TeamBonding handleNavigation={handleNavigation} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestUser;
