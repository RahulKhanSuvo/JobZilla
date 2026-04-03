import Container from "@/components/common/Container";
import ClientReviewHeader from "./components/ClientReviewHeader";
import ReviewCard, { type Review } from "./components/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const mockReviews: Review[] = [
  {
    id: 3,
    text: "The platform's ease of use and the depth of talent available have made our recruitment efforts much more productive. It's now our go-to source for finding top-tier technical talent.",
    clientName: "Mark Wilson",
    clientRole: "CTO at TechFlow",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
    rating: 5,
  },
  {
    id: 4,
    text: "Working with this platform has been a game changer for our recruiting. We can truly identify and assess a talent pool more efficiently and have our talent ready to start in their new role faster.",
    clientName: "Jane Smith",
    clientRole: "HR Manager",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    rating: 5,
  },
  {
    id: 5,
    text: "The candidates we found through this platform were highly qualified and a great fit for our company culture. The process was smooth and efficient from start to finish.",
    clientName: "Robert Brown",
    clientRole: "Software Engineering Director",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    rating: 5,
  },
  {
    id: 6,
    text: "The candidates we found through this platform were highly qualified and a great fit for our company culture. The process was smooth and efficient from start to finish.",
    clientName: "Robert Brown",
    clientRole: "Software Engineering Director",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    rating: 5,
  },
  {
    id: 7,
    text: "The candidates we found through this platform were highly qualified and a great fit for our company culture. The process was smooth and efficient from start to finish.",
    clientName: "Robert Brown",
    clientRole: "Software Engineering Director",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    rating: 5,
  },
  {
    id: 8,
    text: "The candidates we found through this platform were highly qualified and a great fit for our company culture. The process was smooth and efficient from start to finish.",
    clientName: "Robert Brown",
    clientRole: "Software Engineering Director",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    rating: 5,
  },
  {
    id: 9,
    text: "The candidates we found through this platform were highly qualified and a great fit for our company culture. The process was smooth and efficient from start to finish.",
    clientName: "Robert Brown",
    clientRole: "Software Engineering Director",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    rating: 5,
  },
];

export default function ClientReview() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950/20 py-24 transition-colors duration-300 overflow-hidden">
      <Container>
        <ClientReviewHeader />
      </Container>

      <div className="w-full mt-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".client-review-pagination",
            renderBullet: function (_index, className) {
              return `<span class="${className} size-2! m-0! rounded-full bg-slate-200 dark:bg-slate-800 transition-all duration-300 [&.swiper-pagination-bullet-active]:size-2.5! [&.swiper-pagination-bullet-active]:bg-emerald-500! [&.swiper-pagination-bullet-active]:shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>`;
            },
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 4,
              centeredSlides: false,
            },
            1536: {
              slidesPerView: 4,
              centeredSlides: false,
            },
          }}
          className="pb-20 px-4! md:px-10!"
        >
          {mockReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="client-review-pagination mt-11 flex items-center justify-center gap-2" />
      </div>
    </div>
  );
}
