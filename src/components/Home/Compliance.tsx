const Compliance = () => {
  return (
    <div className="flex items-center py-10 px-6 max-xs:px-0">
      <div className="w-full max-w-7xl  bg-blue-100  mx-auto py-10 px-6 rounded-lg flex flex-col md:flex-row items-center gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-start max-md:items-center">
          <span className="text-gray text-sm font-semibold rounded-lg px-4 py-2 bg-white">
            Compliances
          </span>
          <h2 className="text-large/14 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8 font-bold mt-3 max-md:text-center text-dark-gray">
            Compliance Standards
          </h2>
          <p className="font-normal text-xl max-sm:text-tiny mt-4 text-gray-600  max-md:text-center">
            Ensuring seamless and trustworthy experiences for corporate clients
            through strict adherence to compliance standards and regulations.
          </p>
          <button className="bg-primary bg-hover cursor-pointer max-sm:text-tiny text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg flex items-center space-x-4 mt-8 mb-4">
            <span>Learn More</span>
            <img
              src="/images/icon/arrow-up.png"
              alt="icon"
              className="w-2.5 h-2.5"
            />
          </button>
        </div>

        {/* Right Section  */}
        <div className="md:w-1/2 flex flex-wrap justify-center gap-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <img
              src="/images/brands/peda.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10"
            />
            <img
              src="/images/brands/iso.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10"
            />
            <img
              src="/images/brands/pipa.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10"
            />
            <img
              src="/images/brands/soc.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10"
            />
          </div>

          <div className="flex justify-center gap-4 flex-wrap mt-4 max-md:mt-0">
            <img
              src="/images/brands/ccpa.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10"
            />
            <img
              src="/images/brands/dss.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10"
            />
            <img
              src="/images/brands/gdpr.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10 "
            />
            <img
              src="/images/brands/fr.png"
              loading="lazy"
              alt="brand"
              className="h-12 md:h-16 max-xs:h-8 max-sm:h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
