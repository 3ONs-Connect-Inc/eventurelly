import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import PrivacyPolicy from '../components/footerPages/PrivacyPolicy'
import Seo from '../components/Seo';
import { useColor } from '../hooks/ui/useColor';

const PrivacyPolicyPage = () => {
    const {bgColor } = useColor();
  return (
    <div
      className={`${bgColor}  overflow-hidden  min-h-screen flex flex-col overflow-x-hidden  mt-0  max-w-full `}
    >
      <Seo
        title="Privacy and Policy"
        description="Privacy and Policy page."
        name="Eventurelly."
        type="website"
      />

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex-grow  ">
        <div className="max-w-7xl  mx-auto px-6 max-xs:px-0">
        <PrivacyPolicy />
        </div>
      </div>  
      <BackToTop />
      <div className="max-xs:px-0 px-6 sm:px-8 lg:px-12 xl:px-16 ">
        <Footer showButtons={true} />
      </div>
    </div>
  )  
}

export default PrivacyPolicyPage
