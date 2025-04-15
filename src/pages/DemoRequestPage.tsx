import Seo from "../components/Seo";
import Footer from "../components/Footer";
import { useIconColor } from "../hooks/ui/useIconColor";
import RequestHero from "../components/request-demo/RequestHero";
import RequestForm from "../components/request-demo/RequestForm";
import BackToTop from "../components/BackToTop";
import useFetchCountries from "../hooks/ui/useFetchCountries";

const DemoRequest = () => { 
  const { bgGradient, bgColor } = useIconColor();
  const countries = useFetchCountries();

  return (
    <div className={`${bgColor} overflow-hidden min-h-screen flex flex-col overflow-x-hidden mt-0 max-w-full`}>
      <Seo
        title="Request Demo"
        description="Request Demo page."
        name="Eventurelly."
        type="event"
      />

      <div className="relative w-full  flex flex-col items-center mb-6">
        <div
          className={`${bgGradient} max-h-[900px]  flex flex-col w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative pb-40`}
        >
          <RequestHero />
      
        </div>
        <div className="-mt-45 w-full  max-w-5xl px-6 max-xs:px-0 sm:px-8 lg:px-12 xl:px-16  relative
         max-[768px]:-mt-35">
          <RequestForm countries={countries}/>
          </div>
         
      </div>

      <BackToTop />
      <div className="max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16 ">
 <Footer showButtons={false}/>
 </div>

    </div>
  );
};

export default DemoRequest;


