import "swiper/swiper-bundle.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroImage from "../ui/hero/HeroImage";
import HeroContent from "../ui/hero/HeroContent";
import HeroContainer from "../ui/hero/HeroContainer";
import { useAppSelector } from "../../hooks/redux";
import { carousel } from "../constants";

export const HeroSection = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return (
    <HeroContainer className="relative  px-6 max-md:p-0  mb-4 max-sm:mb-2 gap-10 ">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) => {
            return `<span class="${className} swiper-pagination-bullet"></span>`;
          },
        }}
        onSwiper={(swiper) => {
          if (!swiper || !swiper.autoplay) return;
          swiper.el.addEventListener("mouseenter", () =>
            swiper.autoplay?.stop()
          );
          swiper.el.addEventListener("mouseleave", () =>
            swiper.autoplay?.start()
          );
        }}
        className="w-full"
      >
        {carousel.map((item, index) => (
          <SwiperSlide key={index}>
       
            <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-10 mt-10 mb-10 md:mb-14">
              {isLoggedIn ? (
                <HeroContent
                  title={item.title}
                  description={item.desc}
                  alignCenter={false}
                  buttonProps={{
                    label: "Get Started",
                    to: "#topPickSection",
                    className:
                      "bg-primary whitespace-nowrap text-white bg-hover",
                    image: "/images/icon/arrow-up.png",
                  }}
                />
              ) : (
                <HeroContent
                  title={item.title}
                  description={item.desc}
                  alignCenter={false}
                  buttonProps={{
                    label: "Get Started",
                    to: "#teamBondingSection",
                    className:
                      "bg-primary whitespace-nowrap text-white bg-hover",
                    image: "/images/icon/arrow-up.png",
                  }}
                />
              )}

              <HeroImage src={item.img} alt={item.title} rounded />
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="swiper-button-prev"></button>
      <button className="swiper-button-next"></button>
    </HeroContainer>
  );
};
