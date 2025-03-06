import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { useIconColor } from '../hooks/useIconColor';

const DemoRequest = () => {
    const { bgColor } = useIconColor();
    return (
      <div
        className={`${bgColor}  overflow-hidden  min-h-screen flex flex-col overflow-x-hidden  mt-0  max-w-full `}
      >
          <Seo
          title="Team Building"
          description="Team Building page."
          name="Eventurelly."
          type="website"
        />
  
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow ">
        <div>Demo Request</div>
        </div>
        <Footer />
      </div>
    );
  };

export default DemoRequest