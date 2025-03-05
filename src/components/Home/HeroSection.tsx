import { useIconColor } from "../../hooks/useIconColor";
import LazyImage from "../LazyImage";

export const HeroSection: React.FC = () => {
  const { textColor, pColor } = useIconColor();

  return (
    <div className="flex flex-row max-md:flex-col-reverse md:w-full items-center justify-between mt-10 w-full max-w-7xl mx-auto mb-10 gap-10">
      <div className="text-center md:text-left space-y-3 w-1/2 max-md:w-full  md:justify-center">
        <h2
          className={`${textColor}  max-sm:-mt-2 text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8 font-bold`}
        >
          Strengthen Bonds, Elevate Teams
        </h2>
        <p
          className={`${pColor} font-normal text-base  md:text-xl max-sm:text-tiny`}
        >
          Unlock unforgettable experiences that bring your team closer than
          ever. Strengthen connections, boost morale, and foster collaboration
          with our expert-led team bonding events.
        </p>
        <div className="flex max-sm:justify-center">
          <button className="bg-primary bg-hover cursor-pointer max-sm:text-tiny text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg flex items-center space-x-4 mt-8  max-sm:mt-2 mb-4">
            <span>Get started</span>
            <img
              src="/images/icon/arrow-up.png"
              alt="icon"
              className="w-2.5 h-2.5"
            />
          </button>
        </div>
      </div>
      <div className="w-1/2 max-md:w-full flex justify-center">
        <LazyImage
          src="/images/ppl/blob.png"
          alt="image"
          className="w-full max-w-full sm:max-w-full"
        />
      </div>
    </div>
  );
};
