"use client";
import React, { useState } from "react";
import Image from "next/image";
import AnimatedSection from "@/app/components/ui/AnimatedSection";

interface AboutProps {
  cardTitle1: string; cardTitle2: string; cardTitle3: string;
  cardSubText1: string; cardSubText2: string; cardSubText3: string;
}

const STATS_ICONS = [
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
];

const SERVICES = [
  { name: "House",     src: "/aboutus/house.png"     },
  { name: "Apartment", src: "/aboutus/apartment.png" },
  { name: "Flat",      src: "/aboutus/office.png"    },
  { name: "Colonial",  src: "/aboutus/warehouse.png" },
];

export default function About({ cardTitle1, cardTitle2, cardTitle3, cardSubText1, cardSubText2, cardSubText3 }: AboutProps) {
  const [showFull, setShowFull] = useState(false);
  const stats = [
    { title: cardTitle1, sub: cardSubText1, icon: STATS_ICONS[0] },
    { title: cardTitle2, sub: cardSubText2, icon: STATS_ICONS[1] },
    { title: cardTitle3, sub: cardSubText3, icon: STATS_ICONS[2] },
  ];

  return (
    <>
      {/* ── Our Story ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Text side */}
            <AnimatedSection direction="right">
              <span className="section-label">About HomeSphere</span>
              <h2 className="text-display-sm font-heading font-bold text-primary mt-5 leading-tight">
                Our Story
                <span className="block text-lg font-medium text-navy-400 mt-2">Experience HomeSphere Innovation</span>
              </h2>
              <p className="text-navy-500 leading-relaxed text-base mt-5">
                Welcome to HomeSphere, where innovation meets real estate. Our platform serves homeowners, landlords, and developers — whether it&apos;s new homes, resale properties, rentals, plots, or co-living spaces.
              </p>
              {showFull && (
                <p className="text-navy-500 leading-relaxed text-base mt-4">
                  HomeSphere delivers advertising, marketing, sales solutions, personalized search, virtual reality experiences, and comprehensive post-transaction services. Our vision is to redefine the Indian property landscape — becoming the preferred destination for buyers, renters, and sellers alike.
                </p>
              )}
              <button
                onClick={() => setShowFull(!showFull)}
                className="btn btn-outline mt-8 text-sm cursor-pointer"
              >
                {showFull ? "Show Less" : "Read More"}
                <svg className={`w-4 h-4 transition-transform ${showFull ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </AnimatedSection>

            {/* Image side */}
            <AnimatedSection direction="left" delay={0.15} className="relative">
              <div className="relative">
                <img
                  src="/images/immio.jpg"
                  alt="HomeSphere office"
                  className="w-full rounded-3xl object-cover shadow-card-hover"
                  style={{ maxHeight: 420 }}
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-2xl px-7 py-5 shadow-card-hover">
                  <p className="font-heading font-extrabold text-3xl gradient-text-gold">15+</p>
                  <p className="text-white/70 text-xs font-medium mt-1">Years of Excellence</p>
                </div>
                {/* Floating rating badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-4 shadow-card-hover border border-navy-50">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="font-heading font-bold text-primary">4.9/5</span>
                  </div>
                  <p className="text-navy-400 text-xs mt-1">Client Rating</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24">
            {stats.map(({ title, sub, icon }, i) => (
              <AnimatedSection key={sub} delay={i * 0.12}>
                <div className="group relative bg-white border border-navy-100 hover:border-navy-200 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-card-hover overflow-hidden cursor-default">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-navy-50 group-hover:bg-primary flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                      <svg className="w-7 h-7 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
                      </svg>
                    </div>
                    <p className="font-heading font-extrabold text-3xl text-primary capitalize">{title}</p>
                    <p className="text-navy-400 text-sm mt-2">{sub}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promise banner ── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #EEF2F7 0%, #F8FAFD 100%)" }}>
        <AnimatedSection className="max-w-[1400px] mx-auto px-6 text-center">
          <span className="section-label">Our Promise</span>
          <h2 className="text-display-sm font-heading font-bold text-primary mt-4 mb-4">
            We Will Find the Best Option
          </h2>
          <p className="text-navy-500 max-w-2xl mx-auto leading-relaxed text-base">
            Real estate — property consisting of land and buildings — is one of life&apos;s biggest decisions. We guide you through every step with expertise, transparency, and care.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <span className="section-label">What We Offer</span>
            <h2 className="text-display-sm font-heading font-bold text-primary mt-4">
              Services for Every Need
            </h2>
            <p className="text-navy-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
              A unique platform designed to make every aspect of your property journey simple, secure, and seamless.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {SERVICES.map(({ name, src }, i) => (
              <AnimatedSection key={name} delay={i * 0.1}>
                <div className="group flex flex-col items-center bg-navy-50 hover:bg-primary rounded-2xl p-10 transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-card-hover cursor-default">
                  <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-white/15 flex items-center justify-center mb-5 shadow-xs transition-colors">
                    <Image src={src} alt={name} width={38} height={38} />
                  </div>
                  <p className="font-heading font-bold text-sm text-primary group-hover:text-white transition-colors capitalize">{name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
