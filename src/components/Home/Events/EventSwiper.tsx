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
        220: { slidesPerView: 1 },
        360: { slidesPerView: 1.5 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
      }}
      navigation={false}
      modules={[Navigation]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="w-full h-full"
    >
      {events.map((card, index) => {
        const fallbackImage =
          cardData.find((fallback) => fallback.eventName === card.eventName)?.image ||
          cardData[index % cardData.length]?.image ||
          "/images/top-picks/img6.png";

        return (
          <SwiperSlide key={index} className="flex justify-center h-full">
            <div className="h-full w-full max-w-xs sm:max-w-sm md:max-w-md flex">
              <Card
                image={card.image || fallbackImage}
                title={`${card.eventNamePrefix} ${card.eventName}`}
                date={card.eventDate}
                location={card.location}
                description={card.eventDescription}
                buttonText={card.buttonText || "Learn More"}
                className="h-full w-full text-left border"
                buttonAlignment="center"
                textAlignment="left"
                buttonFullWidth
                buttonColor
                buttonTextColor
                imageClassName="rounded-lg w-full h-48 "
                onClick={() => handleLearnMore(card.id, card.slug)}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default EventSwiper;
