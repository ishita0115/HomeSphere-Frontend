"use client";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import heroBg from "/public/aboutus/heroBackground.jpg";
import HomeProperty from "./components/WithoutLogin/Homeshowproperty/HomeProperty";
import GetStarted from "./components/WithoutLogin/Getstart/getstart";
import Value from "./components/WithoutLogin/OurValue/detail";
import About from "./components/WithoutLogin/about/aboutus";
import Footer from "./components/footer/footer";
import AnimatedSection from "./components/ui/AnimatedSection";
import HowItWorks from "./components/home/HowItWorks";
import Testimonials from "./components/home/Testimonials";
import useSearchModal from "./redux/hooks/useSearchModel";

const Mapall = dynamic(() => import("./components/Alllistingmap/Mapall"), { ssr: false });

/* ── Hero search quick-filter types ─────────────────── */
const SALE_TYPES = ["Any", "For Sale", "For Rent"];
const HOME_TYPES = ["Any", "Apartment", "Villa", "Studio", "Commercial"];

export default function Home() {
  const uid = useSelector((state: any) => state.auth.token.uid);
  const searchModal = useSearchModal();
  const [saleType, setSaleType] = useState("Any");
  const [homeType, setHomeType] = useState("Any");

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════ */}
      <section className="hero-section" style={{ minHeight: "100vh" }}>
        {/* Background image */}
        <Image
          src={heroBg}
          alt="HomeSphere hero"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="hero-overlay" />

        {/* Floating particles — decorative */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-accent/10 animate-float"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                top: `${10 + i * 12}%`,
                left: `${5 + i * 15}%`,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-24 pb-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-8 shadow-gold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              India&apos;s #1 Real Estate Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl"
          >
            Find Your Perfect
            <span className="block gradient-text-gold mt-1">Dream Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-white/75 max-w-lg leading-relaxed"
          >
            Discover thousands of verified properties — buy, sell, or rent with confidence.
          </motion.p>

          {/* ── Hero Search Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mt-12"
          >
            <div className="hero-search p-2 md:p-3">
              <div className="flex flex-col md:flex-row gap-2 md:gap-0">

                {/* Sale type tabs */}
                <div className="flex gap-1 md:hidden mb-2">
                  {SALE_TYPES.slice(1).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSaleType(t)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${saleType === t ? "bg-primary text-white" : "bg-navy-50 text-navy-600 hover:bg-navy-100"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Location field */}
                <div
                  onClick={() => searchModal.open('location')}
                  className="flex-1 flex items-center gap-3 px-5 py-4 md:border-r border-navy-100 cursor-pointer hover:bg-navy-50/50 rounded-xl md:rounded-r-none transition-colors"
                >
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-navy-400 uppercase tracking-wide">Location</p>
                    <p className="text-sm text-navy-700 font-medium mt-0.5">Where are you looking?</p>
                  </div>
                </div>

                {/* Property type */}
                <div className="hidden md:flex items-center gap-3 px-5 py-4 border-r border-navy-100 cursor-pointer hover:bg-navy-50/50 transition-colors min-w-[160px]">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-navy-400 uppercase tracking-wide">Type</p>
                    <select
                      value={homeType}
                      onChange={(e) => setHomeType(e.target.value)}
                      className="text-sm text-navy-700 font-medium bg-transparent border-none outline-none cursor-pointer mt-0.5 w-full"
                    >
                      {HOME_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Sale / Rent */}
                <div className="hidden md:flex items-center gap-3 px-5 py-4 border-r border-navy-100 cursor-pointer hover:bg-navy-50/50 transition-colors min-w-[150px]">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-navy-400 uppercase tracking-wide">Purpose</p>
                    <select
                      value={saleType}
                      onChange={(e) => setSaleType(e.target.value)}
                      className="text-sm text-navy-700 font-medium bg-transparent border-none outline-none cursor-pointer mt-0.5 w-full"
                    >
                      {SALE_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Search button */}
                <div className="flex items-center px-3 py-2">
                  <Link
                    href="/DetailHome"
                    className="btn btn-gold flex items-center gap-2 px-6 py-4 rounded-xl w-full md:w-auto justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    Search
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            <span className="text-white/50 text-sm">Popular:</span>
            {["Mumbai", "Delhi", "Bangalore", "Pune"].map((city) => (
              <Link
                key={city}
                href="/DetailHome"
                className="text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm hover:bg-white/10"
              >
                {city}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="relative z-10 pb-10 px-6"
        >
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-white/15" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "1.5rem", padding: "1.25rem 2rem" }}>
              {[
                { value: "10,000+", label: "Properties" },
                { value: "$1 Billion",  label: "Brokered"   },
                { value: "15 Years",   label: "Experience"  },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center justify-center px-4 py-1">
                  <span className="text-white font-heading font-bold text-xl md:text-2xl">{value}</span>
                  <span className="text-white/55 text-xs mt-1 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
         ══════════════════════════════════════════════ */}
      <HowItWorks />

      {/* ══════════════════════════════════════════════
          FEATURED PROPERTIES
         ══════════════════════════════════════════════ */}
      <HomeProperty />

      {/* ══════════════════════════════════════════════
          CTA (unauthenticated)
         ══════════════════════════════════════════════ */}
      {!uid && <GetStarted />}

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
         ══════════════════════════════════════════════ */}
      <Testimonials />

      {/* ══════════════════════════════════════════════
          ABOUT + STATS + SERVICES
         ══════════════════════════════════════════════ */}
      <About
        cardTitle1="15 Years"  cardSubText1="in business"
        cardTitle2="$1 Billion" cardSubText2="property brokered"
        cardTitle3="10,000+"   cardSubText3="transactions"
      />

      {/* ══════════════════════════════════════════════
          OUR VALUE
         ══════════════════════════════════════════════ */}
      <Value />

      {/* ══════════════════════════════════════════════
          MAP (authenticated)
         ══════════════════════════════════════════════ */}
      {uid && (
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-[1400px] mx-auto px-6">
            <AnimatedSection className="mb-8">
              <span className="section-label">Explore</span>
              <h2 className="text-display-sm font-heading font-bold text-primary mt-4">
                Browse Properties on the Map
              </h2>
            </AnimatedSection>
            <Mapall />
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
