import Container from "@/components/common/Container";
import logo from "@/assets/logos/Logo-3.png";
import logo2 from "@/assets/logos/Logo-4.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function Sponsor() {
  return (
    <div className="bg-[#123841] py-10 ">
      <Container>
        <div className="">
          <h2 className="text-xl md:text-2xl text-white font-bold text-center  mb-8">
            Over 100,000 recruiters use Jobtex to modernize their hiring
          </h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={6}
            centeredSlides={false}
            loop={true}
            speed={600} // normal slide animation speed (not 8000)
            autoplay={{
              delay: 5000, // 5 seconds
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 50 },
              768: { slidesPerView: 4, spaceBetween: 60 },
              1024: { slidesPerView: 5, spaceBetween: 80 },
            }}
            className="overflow-hidden!"
          >
            {/* Repeat logos to make loop feel seamless (at least 6–10 recommended) */}
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo}
                alt="Sponsor Logo 1"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo2}
                alt="Sponsor Logo 2"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo}
                alt="Sponsor Logo 1"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo2}
                alt="Sponsor Logo 2"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo}
                alt="Sponsor Logo 1"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo2}
                alt="Sponsor Logo 2"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo}
                alt="Sponsor Logo 1"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo2}
                alt="Sponsor Logo 2"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo}
                alt="Sponsor Logo 1"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <img
                src={logo2}
                alt="Sponsor Logo 2"
                className="h-12 md:h-10 w-auto object-contain"
              />
            </SwiperSlide>
            {/* Add more duplicates if you have only 2 logos – makes seamless infinite feel */}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}
