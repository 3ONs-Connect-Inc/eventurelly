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
      centeredSlides={true}
      initialSlide={1}
      loop={true}
      breakpoints={{
        220: { slidesPerView: 1, centeredSlides: true },
        360: { slidesPerView: 1.5, centeredSlides: true },
        480: { slidesPerView: 2 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      navigation={false}
      modules={[Navigation]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="w-full flex max-xs:items-center justify-items-center"
    >
      {events.map((card, index) => {
      const fallbackImage =
        cardData.find((fallback) => fallback.eventName === card.eventName)?.image ||
        cardData[index % cardData.length]?.image ||
        "/images/top-picks/img6.png";

      return (
        <SwiperSlide key={index} className="flex  justify-center">
        <Card
          key={index}
          image={card.image || fallbackImage}
          title={card.eventName}
          description={card.eventDescription}
          buttonText={card.buttonText || "Learn More"}
          className="self-start text-left border"
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
