import { useEffect,  useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
//import { filterOptions } from "../../../data";
import debounce from "lodash.debounce";


export const SearchBar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedFilters, ] = useState<{
    [key: string]: string;
  }>(//setSelectedFilters
    Object.fromEntries(
      [...searchParams.entries()].filter(([key]) => key !== "q")
    )
  );

  useEffect(() => {
    const updateURL = debounce(() => {
      const queryParams = new URLSearchParams();
  
      if (searchTerm.trim()) {
        queryParams.set("q", searchTerm);
      }
  
      Object.entries(selectedFilters).forEach(([key, value]) => {
        queryParams.set(key, encodeURIComponent(value)); 
      });
  
      navigate(`?${queryParams.toString()}`, { replace: true });
    }, 300);
  
    updateURL();
    return () => updateURL.cancel();
  }, [searchTerm, selectedFilters, navigate]);
  
  
 


  // Function to handle search navigation
  const handleSearch = () => {
    if (searchTerm.trim()) {
      const queryParams = new URLSearchParams({
        q: searchTerm,
        ...selectedFilters,
      }).toString();
      navigate(`/search?${queryParams}`);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-4 border border-border-gray bg-white p-2 xs:p-3 mt-15 rounded-full shadow-md  mx-auto mb-8 max-sm:mb-0 w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search by keywords"
        className="ml-2 xs:ml-4 text-xs sm:text-lg w-full text-gray-500 font-medium flex-1 border-r-2 border-gray-300 pr-2 outline-none"
      />
      {/* <div className="max-md:hidden flex items-center gap-4 text-sm lg:text-base  z-[9999]">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div
            key={key}
            className="w-auto  border-gray-300 text-gray-500 font-medium flex items-center gap-1 border-r-2 pr-2 cursor-pointer "
          >
            <select
              value={selectedFilters[key] || ""}
              onChange={(e) => {
                const updatedFilters = {
                  ...selectedFilters,
                  [key]: e.target.value,
                };
                setSelectedFilters(updatedFilters);
              }}
            >
              <option value="">{key}</option>
              {options.map((option, idx) => (
                <option
                  key={idx}
                  value={option}
                  className="px-4 py-2 font-normal text-xs sm:text-sm hover:bg-gray-200 cursor-pointer"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div> */}

      <button
        onClick={handleSearch}
        disabled={!searchTerm.trim()} // Disable button when input is empty
        className={`p-2 rounded-full ${
          searchTerm.trim()
            ? "bg-primary text-white"
            : "bg-primary text-white  cursor-not-allowed"
        }`}
      >
        <IoSearchOutline />
      </button>
    </div>
  );
};
