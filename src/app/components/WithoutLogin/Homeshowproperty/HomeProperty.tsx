import React from "react";
import data from "@/app/utils/slider.json";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import AnimatedSection from "@/app/components/ui/AnimatedSection";

const sliderSettings = {
  spaceBetween: 24,
  slidesPerView: 1 as const,
  breakpoints: {
    480:  { slidesPerView: 1.3 },
    640:  { slidesPerView: 2   },
    900:  { slidesPerView: 2.5 },
    1200: { slidesPerView: 3   },
  },
};

export default function HomeProperty() {
  return (
    <section id="residencies" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">Featured Listings</span>
            <h2 className="text-display-sm font-heading font-bold text-primary mt-4 leading-tight">
              Find Your Dream Home
            </h2>
            <p className="text-navy-500 mt-3 text-base max-w-md leading-relaxed">
              Hand-picked properties from across India — browse and find the one that feels right.
            </p>
          </div>

          <div className="flex items-center gap-3 relative flex-shrink-0">
            <SwiperNav />
          </div>
        </AnimatedSection>

        <Swiper {...sliderSettings}>
          <MobileNav />
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <AnimatedSection delay={i * 0.08} direction="up">
                <div className="r-card group">
                  <div className="relative overflow-hidden" style={{ height: 210 }}>
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Badge */}
                    <span className={`absolute top-3 left-3 badge ${card.sale_type === "For Sale" ? "badge-sale" : "badge-rent"}`}>
                      {card.sale_type}
                    </span>
                  </div>
                  <div className="r-card-body">
                    <h3 className="font-heading font-bold text-primary text-base leading-snug mb-1">{card.name}</h3>
                    <p className="text-navy-500 text-sm line-clamp-2 leading-relaxed">{card.detail}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-navy-50">
                      <span className="text-xs text-navy-400 font-medium">View Details</span>
                      <div className="w-7 h-7 rounded-full bg-navy-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <svg className="w-3.5 h-3.5 text-primary group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

const SwiperNav = () => {
  const swiper = useSwiper();
  return (
    <div className="r-buttons">
      <button onClick={() => swiper?.slidePrev()} className="r-prevButton" aria-label="Previous">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button onClick={() => swiper?.slideNext()} className="r-nextButton" aria-label="Next">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};

const MobileNav = () => {
  const swiper = useSwiper();
  return (
    <div className="sm:hidden flex justify-end gap-2 mb-4">
      <button onClick={() => swiper?.slidePrev()} className="r-prevButton" aria-label="Previous">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button onClick={() => swiper?.slideNext()} className="r-nextButton" aria-label="Next">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};
