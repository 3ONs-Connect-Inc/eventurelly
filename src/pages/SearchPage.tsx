import SearchContents from "../components/Home/SearchContents";
import { SearchBar } from "../components/Home/SearchBar";
import Seo from "../components/Seo";
import { useIconColor } from "../hooks/ui/useIconColor";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { useFetchEvents } from "../hooks/events/useFetchEvents";
import { useNavigate } from "react-router-dom";

interface SearchProps{
collectionName?: string; 
}

const SearchPage: React.FC<SearchProps> = ({collectionName}) => {
  const { bgColor } = useIconColor();
  const navigate = useNavigate();

  const { loading,  error } = useFetchEvents(collectionName || 'events');

  
  const handleLearnMore = (id: string, slug: string, collectionName: string) => {
    const formattedSlug = slug.replace(/\s+/g, "-");
    navigate(`/event-details/${collectionName}/${id}/${formattedSlug}`);
  };
  

   if (loading) return <Spinner />;
   if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      className={`${bgColor} relative overflow-hidden  min-h-screen flex flex-col overflow-x-hidden  mt-0  max-w-full `}
    >
      <Seo
        title="Search"    
        description="Search page."
        name="Eventurelly."
        type="website"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow ">
        <SearchBar />

        <SearchContents    
           loading={loading}
           handleLearnMore={handleLearnMore}
         />
     
      </div>
      <Footer showButtons={true}/>
    </div>
  );
};

export default SearchPage;
