import CommonWrapper from "@/components/common/CommonWrapper";
import { Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import mainOffice from "@/assets/images/office_main.png";
import teamMeeting from "@/assets/images/team_meeting.png";
import employeeSocial from "@/assets/images/employee_social.png";

export default function AboutCompany() {
  const galleryImages = [teamMeeting, employeeSocial, mainOffice, teamMeeting];

  return (
    <div className="space-y-6">
      <CommonWrapper className="p-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">About Company</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Are you a User Experience Designer with a track record of
              delivering intuitive digital experiences that drive results? Are
              you a strategic storyteller and systems thinker who can concept
              and craft smart, world-class campaigns across a variety of
              mediums?
            </p>
            <p>
              Deloitte's Green Dot Agency is looking to add a Lead User
              Experience Designer to our experience design team. We want a
              passionate creative who's inspired by new trends and emerging
              technologies, and is able to integrate them into memorable user
              experiences. A problem solver who is entrepreneurial,
              collaborative, hungry, and humble; can deliver beautifully
              designed, leading-edge experiences under tight deadlines; and who
              has demonstrated proven expertise.
            </p>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="space-y-6">
          {/* Main Video/Image Placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-border">
            <img
              src={mainOffice}
              alt="Main Office"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/40">
              <div className="size-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                <Play className="size-8 text-primary fill-primary ml-1" />
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative px-2">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12 static!"
            >
              {galleryImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-4/3 rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow cursor-zoom-in">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <style>{`
                            .swiper-button-next, .swiper-button-prev {
                                color: var(--primary);
                                background: white;
                                width: 44px;
                                height: 44px;
                                border-radius: 50%;
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                                transition: all 0.3s ease;
                            }
                            .swiper-button-next:after, .swiper-button-prev:after {
                                font-size: 18px;
                                font-weight: bold;
                            }
                            .swiper-button-next:hover, .swiper-button-prev:hover {
                                background: var(--primary);
                                color: white;
                            }
                            .swiper-pagination-bullet-active {
                                background: var(--primary) !important;
                            }
                        `}</style>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
