import React from "react";
import data from "@/app/utils/slider.json";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "@/app/utils/common";

const HomeProperty = () => {
  return (
    <section id="residencies" className="py-20 bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">Featured</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2 leading-tight">
              Find Your Dream Home
            </h2>
            <p className="text-slate-500 mt-2 text-base max-w-md">
              Hand-picked properties from across India — browse and find the one that feels right.
            </p>
          </div>
          {/* Slider controls positioned here */}
          <div className="hidden sm:flex items-center gap-3 relative" style={{ minWidth: 100 }}>
            <SwiperButtons />
          </div>
        </div>

        <Swiper {...sliderSettings}>
          <MobileSwiperButtons />
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="r-card">
                <img src={card.image} alt={card.name} />
                <div className="flex items-center justify-between mt-1">
                  <span className="r-price">{card.sale_type}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-base leading-snug">{card.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{card.detail}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const SwiperButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <button onClick={() => swiper.slidePrev()} className="r-prevButton" aria-label="Previous">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton" aria-label="Next">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </>
  );
};

const MobileSwiperButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="sm:hidden flex justify-end gap-3 mb-4">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton" aria-label="Previous">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton" aria-label="Next">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};

export default HomeProperty;
