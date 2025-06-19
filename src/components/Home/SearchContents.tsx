import { useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import { useColor } from "../../hooks/ui/useColor";
import {  useSearchParams} from "react-router-dom";
import { searchEventsAndBookings } from "../../firebase/events";
import Spinner from "../Spinner";
import SearchSort from "./SearchSort";



interface SearchProps {
handleLearnMore: (id: string, slug: string, collectionName: string) => void;
loading: boolean;
}

const SearchContents: React.FC<SearchProps> = ({ 
  handleLearnMore,
  loading,
}) => {
  const { textColor } = useColor();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false); 
  
   // Get search term & filters from URL
   const searchTerm = searchParams.get("q") || "";
   const sortOption = searchParams.get("sort") || "Descending";
   const selectedFilters = useMemo(
     () => Object.fromEntries([...searchParams.entries()].filter(([key]) => key !== "q" && key !== "sort")),
     [searchParams]
   );

  


  useEffect(() => {
    let isMounted = true;

    const fetchSearchResults = async () => {
      setIsSearching(true);
      try {
        let results = await searchEventsAndBookings(searchTerm, selectedFilters);

        if (isMounted) {
          // Apply sorting before setting results
          results = sortResults(results, sortOption);
          setSearchResults(results || []);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        if (isMounted) setSearchResults([]);
      } finally {
        if (isMounted) setIsSearching(false);
      }
    };

    fetchSearchResults();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, selectedFilters, sortOption]); 

  // Function to handle sorting
  const sortResults = (results: any[], sortOption: string) => {
    if (!results) return [];
  
    switch (sortOption) {
      case "Ascending":
        return [...results].sort((a, b) => a.eventName.localeCompare(b.eventName));
  
      case "Descending":
        return [...results].sort((a, b) => b.eventName.localeCompare(a.eventName));
  
      case "Newest":
        return [...results].sort(
          (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        );
  
      default:
        return results;
    }
  };
  
  if (!searchTerm) return null;

  return (
    <div className="flex items-center   py-4 max-xs:px-0">
      <div
        className={`w-full  flex flex-col items-center py-4  mx-auto ${textColor}`}
      >

      {loading || isSearching ? (
        <Spinner />
      ) : searchResults.length === 0 ? (
        searchTerm ? <p>No search results found.</p> : null
      ) : (
       <>
        <SearchSort />

<div className="w-full grid grid-cols-1 xs:grid-cols-2 2sm:grid-cols-3 md:grid-cols-3  gap-6 justify-items-center">
  {searchResults.map((card, index) => {
  
    return (
      <Card
        key={index}
        image={card.eventImage}
        title={card.eventNamePrefix ? `${card.eventNamePrefix} ${card.eventName}` : card.eventName}
        description={card.eventDescription}
       // tags={Array.isArray(card.eventCategory) ? card.eventCategory : [card.eventCategory]}
        buttonText={card.buttonText || "Learn More"}
        className="h-full w-full text-left border"
        buttonAlignment="center"
        textAlignment="left"
        buttonFullWidth
        buttonColor
        buttonTextColor
        imageClassName="rounded-lg"
        scale
        onClick={() => handleLearnMore(card.id, card.slug,  card.collectionName)}
      />
    );
  })}
</div>
       </>
      )}
      </div>
    </div>
  );
};

    

export default SearchContents;
