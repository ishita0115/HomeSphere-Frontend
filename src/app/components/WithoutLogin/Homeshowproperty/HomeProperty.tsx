import React from "react";
import data from "@/app/utils/slider.json";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "@/app/utils/common";
const HomeProperty = () => {
  return (
    <div id="residencies" className="r-wrapper m-5">
    <div className="paddings innerWidth r-container">
      <div className="flexColStart r-head">
        <span className="orangeText text-xl flex justify-center text-center ">Find Your Dream Home</span>
      </div>
      <Swiper {...sliderSettings}>
        <SlideNextButton />
        {/* slider */}
        {data.map((card, i) => (
          <SwiperSlide key={i}>
            <div className="flexColStart r-card rounded">
              <img src={card.image} alt="home" className="rounded-lg" />

              <span className=" r-price">
                <span style={{ color: "orange" }}></span>
                <span>{card.sale_type}</span>
              </span>
              <div> <div className="text-lg">{card.name}</div>
              <span className="text-sm">{card.detail}</span></div>
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  );
};

export default HomeProperty;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-center ">
    <div className="flexCenter r-buttons  ">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
    </div>
  );
};