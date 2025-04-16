import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "../../ui/Card";
import { cardData } from "../../../../data";


interface EventSwiperProps {
  events: any[];
  swiperRef: any;
  handleLearnMore: (id: string, slug: string) => void;
}

const EventSwiper: React.FC<EventSwiperProps> = ({ events, swiperRef, handleLearnMore }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      breakpoints={{
        220: { slidesPerView: 1},
        360: { slidesPerView: 1.5 },
        480: { slidesPerView: 2},
       // 640: { slidesPerView: 2 },
        768: { slidesPerView: 3},
      }}
     
      navigation={false}
      modules={[Navigation]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="w-full h-full max-xs:-mt-15 flex max-xs:items-center justify-items-center"
    >
      {events.map((card, index) => {
      const fallbackImage =
        cardData.find((fallback) => fallback.eventName === card.eventName)?.image ||
        cardData[index % cardData.length]?.image ||
        "/images/top-picks/img6.png";

      return (
        <SwiperSlide key={index} className="flex w-full  h-full justify-center">
        <Card
          key={index}
          image={card.image || fallbackImage}
          title={`${card.eventNamePrefix} ${card.eventName}`}
          date={card.eventDate}
          location={card.location}
          description={card.eventDesc}
          buttonText={card.buttonText || "Learn More"}
          className="card-container self-start text-left border"
          buttonAlignment="center"
          textAlignment="left"
          buttonFullWidth
          buttonColor
          buttonTextColor
          imageClassName="w-full h-full"
          onClick={() => handleLearnMore(card.id, card.slug)}
        />
      </SwiperSlide>
        
      );  
    })}
    </Swiper>
  );
};

export default EventSwiper;
