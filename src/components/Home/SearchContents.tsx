import  {  useRef, useState } from 'react'
import Card from '../ui/Card'
import { cardData } from '../../../data'
import { useIconColor } from '../../hooks/useIconColor'
import { CgSortAz } from "react-icons/cg";
import useClickOutside from '../../hooks/useClickOutside';

const SearchContents = () => {
    const { textColor, bgColor2 } = useIconColor();
    const [showDropdown, setShowDropdown] = useState(false);
    const [sortOption, setSortOption] = useState('Descending');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSortClick = (option: string) => {
      setSortOption(option);
      setShowDropdown(false);
    };
  
    useClickOutside([dropdownRef], () => setShowDropdown(false));

    return (
      <div className="flex items-center   py-4 px-6 max-xs:px-0">
        <div className={`w-full max-w-7xl   flex flex-col items-center py-4 px-6 mx-auto ${textColor}`}>
        <div className="w-full mt-0 flex flex-row max-md:flex-col justify-between items-center mb-8">
  {/* Left Section - Tags */}
  <div className="flex gap-2">
    {['In-person', 'Active', '4-5', 'Learning'].map((tag, index) => (
      <span key={index} className="bg-pink text-primary font-semibold max-xs:hidden
      rounded-lg px-3 py-1 max-md:mb-6 text-sm max-md:px-2 ">
        {tag}
      </span>
    ))}
  </div>

  {/* Right Section - Sort UI */}
  <div   ref={dropdownRef}
  className="max-xs:self-start flex flex-row whitespace-nowrap items-center  py-2 px-3 rounded-lg border  border-border-gray shadow-md 
  gap-2 cursor-pointer max-md:px-3  max-md:py-2 dark:border-gray dark:shadow-gray-800  ">

    <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2">
    <CgSortAz  className={`${textColor} font-semibold text-2xl`} />
    <span className="font-semibold text-sm whitespace-nowrap">Sort by</span>
      </div>
    <span className="font-semibold text-sm max-xs:hidden">{sortOption}</span>

    <div className="relative w-full">
    {showDropdown && (
      // <div className={`absolute top-10 left-0 ${bgColor2} shadow-lg w-48  rounded-lg  p-2 flex flex-col gap-1 z-10 `}>
      <div className={`absolute top-5 right-0 max-xs:-left-25 ${bgColor2} shadow-lg w-48  rounded-lg p-2 flex flex-col gap-1 z-10`}>
        {['Ascending', 'Descending', 'Popularity', 'Recommended', 'Newest'].map((option, index) => (
          <span
            key={index}
            className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            onClick={() => handleSortClick(option)}
          >
            {option}
          </span>
        ))}
     
      </div>
    )}
       </div>
  </div>
</div>

  
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-items-center">
            {cardData.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                tags={card.tags}
                className="self-start text-left border"
                buttonAlignment="center"
                textAlignment="left"
                buttonFullWidth
                buttonColor
                buttonTextColor
                imageClassName="w-full h-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchContents;