
export const Brands: React.FC = () => {
  return (
    <div className='flex flex-wrap 
     justify-center gap-6 mt-10 mb-10 px-4'>
      {["/images/brands/airbnb.png", 
      "/images/brands/hubspot.png",
       "/images/brands/google.png", 
       "/images/brands/microsoft.png",
        "/images/brands/walmart.png",
         "/images/brands/fedex.png"].map((src, index) => (
        <img key={index} src={src} loading="lazy" 
        alt="brand-logo" 
        className="w-[90px]
         h-[28px]
         object-contain max-sm:w-[75px] " 
        />
      ))}
    </div>
  )
};