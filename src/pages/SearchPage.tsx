import SearchContents from "../components/Home/SearchContents";
import { SearchBar } from "../components/Home/SearchBar";
import Seo from "../components/Seo";
import { useColor } from "../hooks/ui/useColor";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { useFetchEvents } from "../hooks/events/useFetchEvents";
import { useNavigate } from "react-router-dom";

interface SearchProps{
collectionName?: string; 
}

const SearchPage: React.FC<SearchProps> = ({collectionName}) => {
  const { bgColor } = useColor();
  const navigate = useNavigate();

  const { loading,  error } = useFetchEvents(collectionName || 'events');

  
  const handleLearnMore = (id: string, slug: string, collectionName: string) => {
    const formattedSlug = slug.replace(/\s+/g, "-");
    navigate(`/event-details/${collectionName}/${id}/${formattedSlug}`);
  };
  

   if (loading) return <Spinner />;
   if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div
      className={`${bgColor} relative overflow-hidden  min-h-screen flex flex-col overflow-x-hidden  mt-0  max-w-full `}
    >
  <Seo
  title="Search Events | Find What You're Looking For on Eventurelly"
  description="Use Eventurelly’s powerful search to quickly find events, organizers, and venues that match your interests."
  name="Eventurelly"
  type="website"
/>

      <div
        className={`w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow  ${bgColor}`}
      >
        <div className="max-w-7xl mx-auto px-6 max-xs:px-0">
        <SearchBar />

<SearchContents    
   loading={loading}
   handleLearnMore={handleLearnMore}
 />
        </div>
      </div>
      <div className="max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16 ">
 <Footer showButtons={true}/>
 </div>

    </div>
  );
};

export default SearchPage;
