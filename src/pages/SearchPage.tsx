import SearchContents from "../components/Home/SearchContents";
import { SearchBar } from "../components/Home/SearchBar";
import Seo from "../components/Seo";
import { useIconColor } from "../hooks/useIconColor";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { bgColor } = useIconColor();
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
        <SearchContents />
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
