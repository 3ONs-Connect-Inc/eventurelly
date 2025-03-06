import { infoItems } from "../../../data";
import LazyImage from "../../components/LazyImage";
import { useIconColor } from "../../hooks/useIconColor";

  
const EventDetailHero = () => {
  const { textColor, pColor } = useIconColor();

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto mt-8 mb-10 p-4">
      {/* Full-width image */}
      <LazyImage src="/images/ppl/p4.png"
       alt="Escape Room" 
      className="w-full h-auto rounded-lg shadow-lg max-w-full sm:max-w-full " 
      delay={3000} 
      />
      
      {/* Centered content */}
      <div className="text-center w-full max-w-2xl mt-6">
      <h2
          className={`${textColor} mt-4 max-sm:-mt-2 text-large/15 max-md:text-bigger/11 max-sm:text-big/10 max-xs:text-mid/8 font-bold`} >
          Escape Room Challenge</h2>
          <p className={`${pColor} mt-4 font-normal text-base  md:text-xl max-sm:text-tiny`}>
          Put your team’s problem-solving skills to the test in this thrilling Escape Room Challenge!
        </p>
        
        {/* Rating */}
        <div className="flex font-semibold text-lg items-center justify-center mt-4 space-x-2">
          <span className="text-black font-bold">4.9</span>
          <img src="/images/icon/star.png" alt="Star" className="w-5 h-5" />
          <span className="text-primary border-l-2  border-border-gray pl-2">97 Reviews</span>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 w-full max-w-4xl bg-white p-4 rounded-lg shadow-md border">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 
              ${index !== infoItems.length - 1 ? 'border-r' : ''}`}  >
            <img src={item.icon} alt={item.title} className="w-8 h-8" loading="lazy" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default EventDetailHero;