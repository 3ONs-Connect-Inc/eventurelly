import Seo from "../components/Seo";
import Footer from "../components/Footer";
import { useIconColor } from "../hooks/useIconColor";
import RequestHero from "../components/request-demo/RequestHero";
import RequestForm from "../components/request-demo/RequestForm";
import BackToTop from "../components/BackToTop";

const DemoRequest = () => { 
  const { bgGradient, bgColor } = useIconColor();
  
  return (
    <div className={`${bgColor} overflow-hidden min-h-screen flex flex-col overflow-x-hidden mt-0 max-w-full`}>
      <Seo
        title="Request Demo"
        description="Request Demo page."
        name="Eventurelly."
        type="event"
      />

      <div className="relative w-full flex flex-col items-center">
        <div
          className={`${bgGradient} h-[700px] max-md:h-[890px] max-xs:h-[700px] flex flex-col w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative pb-40`}
        >
          <RequestHero />
        </div>
        <div className="-mt-25 w-full px-6 max-xs:px-0 sm:px-8 lg:px-12 xl:px-16 relative 
          max-[1295px]:-mt-35 max-[1095px]:-mt-50 max-[896px]:-mt-40 max-[768px]:-mt-35 
          max-[640px]:-mt-60 max-[559px]:-mt-70  max-[480px]:-mt-35 max-[450px]:-mt-45 max-[296px]:-mt-40">
          <RequestForm />
          </div>
     
      </div>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default DemoRequest;


