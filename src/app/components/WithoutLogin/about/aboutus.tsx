"use client";
import React, { useState } from "react";
import Image from "next/image";

interface AboutProps {
  cardTitle1: string;
  cardTitle2: string;
  cardTitle3: string;
  cardSubText1: string;
  cardSubText2: string;
  cardSubText3: string;
}

const About: React.FC<AboutProps> = ({
  cardTitle1, cardTitle2, cardTitle3,
  cardSubText1, cardSubText2, cardSubText3,
}) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      {/* ── Our Story ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-widest">About Us</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2 mb-5 leading-tight">
                Our Story
                <span className="block text-xl font-medium text-slate-500 mt-1">Experience HomeSphere Innovation</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Welcome to HomeSphere, where innovation meets real estate. Our platform serves homeowners, landlords, and developers — whether it&apos;s new homes, resale properties, rentals, plots, or co-living spaces.
              </p>
              {showFull && (
                <p className="text-slate-600 leading-relaxed text-base mt-4">
                  HomeSphere delivers advertising, marketing, sales solutions, personalized search, virtual reality experiences, and comprehensive post-transaction services for both buyers and renters. Our vision is to redefine the Indian property landscape and become the preferred destination for consumers and partners alike.
                </p>
              )}
              <button
                onClick={() => setShowFull(!showFull)}
                className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer text-sm"
              >
                {showFull ? "Show Less" : "Read More"}
                <svg className={`w-4 h-4 transition-transform ${showFull ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/images/immio.jpg"
                alt="Company Office"
                className="w-full rounded-2xl shadow-card-hover object-cover"
                style={{ maxHeight: 400 }}
              />
              <div className="absolute -bottom-5 -left-5 bg-accent text-white rounded-2xl px-6 py-4 shadow-lg">
                <p className="font-heading font-bold text-2xl">15+</p>
                <p className="text-xs font-medium opacity-90">Years of Experience</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
            {[
              { title: cardTitle1, sub: cardSubText1, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: cardTitle2, sub: cardSubText2, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: cardTitle3, sub: cardSubText3, icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
            ].map(({ title, sub, icon }) => (
              <div key={sub} className="group bg-surface-secondary hover:bg-primary rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-card-hover cursor-default">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-white/15 mb-4 transition-colors">
                  <svg className="w-7 h-7 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
                  </svg>
                </div>
                <p className="font-heading font-bold text-3xl text-primary group-hover:text-white transition-colors capitalize">{title}</p>
                <p className="text-slate-500 group-hover:text-white/75 text-sm mt-1 transition-colors">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── We Will Find the Best ── */}
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Our Promise</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2 mb-4">
            We Will Find the Best Option
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed text-base">
            Real estate is property consisting of land and the buildings on it, along with its natural resources. We help you navigate every step of your property journey with confidence.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2">Services for Maximum Efficiency</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
              We&apos;ve developed a unique platform where you can work, create, and transact — with everything thought through to the smallest detail.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {services.map(({ name, imgSrc, alt }) => (
              <div
                key={name}
                className="group flex flex-col items-center bg-surface-secondary hover:bg-primary rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-card-hover cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-white/15 flex items-center justify-center mb-4 transition-colors">
                  <Image src={imgSrc} alt={alt} width={36} height={36} />
                </div>
                <p className="font-heading font-semibold text-sm text-primary group-hover:text-white transition-colors text-center capitalize">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const services = [
  { name: "House", imgSrc: "/aboutus/house.png", alt: "House" },
  { name: "Apartment", imgSrc: "/aboutus/apartment.png", alt: "Apartment" },
  { name: "Flat", imgSrc: "/aboutus/office.png", alt: "Flat" },
  { name: "Colonial", imgSrc: "/aboutus/warehouse.png", alt: "Colonial" },
];

export default About;
