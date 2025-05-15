import { useRef, useState } from "react";
import { useColor } from "../../hooks/ui/useColor";
import { CgSortAz } from "react-icons/cg";
import { defaultTags } from "../../../data";
import { useNavigate, useSearchParams } from "react-router-dom";

// interface SearchProps {
//     events: any;
//     loading: boolean;
//  }

const SearchSort: React.FC= () => {
    const { textColor, bgColor2 } = useColor();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedTags = searchParams.getAll("filter").length > 0 ? searchParams.getAll("filter") : defaultTags;
    const sortOption = searchParams.get("sort") || "Descending";

    const handleTagClick = (tag: string) => {
        const newParams = new URLSearchParams(searchParams);
        const currentFilters = newParams.getAll("filter");
      
        if (currentFilters.includes(tag)) {
          // Remove tag if already selected
          newParams.delete("filter", tag);
        } else {
          // Add new tag
          newParams.append("filter", tag);
        }
      
        const queryString = newParams.toString().replace(/%2B/g, "+"); // Fix encoding
        navigate(`?${queryString}`);  // Update URL correctly
      };
      
      const handleSortClick = (option: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sort", option); // Set the selected sort option
        navigate(`?${newParams.toString()}`);
        setShowDropdown(false);
      };
    
  

  return (
    <div className="w-full mt-0 flex flex-row max-md:flex-col justify-between items-center mb-8">
    <div className="flex gap-2">
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            className="bg-secondary text-primary font-semibold max-xs:hidden
      rounded-lg px-3 py-1 max-md:mb-6 text-sm max-md:px-2 "
       onClick={() => handleTagClick(tag)}  >
            {tag}
          </span>
        ))}
      </div>

<div
        ref={dropdownRef}
        className="max-xs:self-start flex flex-row whitespace-nowrap items-center  py-2 px-3 rounded-lg border  border-border-foreground shadow-md 
     gap-2 cursor-pointer max-md:px-3  max-md:py-2 dark:border-foreground dark:shadow-gray-800  "
      >
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2"
        >
          <CgSortAz className={`${textColor} font-semibold text-2xl`} />
          <span className="font-semibold text-sm whitespace-nowrap">
            Sort by
          </span>
        </div>
        <span className="font-semibold text-sm max-xs:hidden">
          {sortOption}
        </span>

        <div className="relative w-full">
          {showDropdown && (
            // <div className={`absolute top-10 left-0 ${bgColor2} shadow-lg w-48  rounded-lg  p-2 flex flex-col gap-1 z-10 `}>
            <div
              className={`absolute top-5 right-0 max-xs:-left-25 ${bgColor2} shadow-lg w-48  rounded-lg p-2 flex flex-col gap-1 z-10`}
            >
              {[
                "Ascending",
                "Descending",
                "Popularity",
                "Recommended",
                "Newest",
              ].map((option, index) => (
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

  )
}

export default SearchSort