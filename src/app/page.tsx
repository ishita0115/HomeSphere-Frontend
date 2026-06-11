"use client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import HomeProperty from "./components/WithoutLogin/Homeshowproperty/HomeProperty";
import GetStarted from "./components/WithoutLogin/Getstart/getstart";
import dynamic from "next/dynamic";
const Mapall = dynamic(() => import("./components/Alllistingmap/Mapall"), { ssr: false });
import Value from "./components/WithoutLogin/OurValue/detail";
import About from "./components/WithoutLogin/about/aboutus";
import Image from "next/image";
import heroBg from "/public/aboutus/heroBackground.jpg";
import Footer from "./components/footer/footer";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const uid = useSelector((state: any) => state.auth.token.uid);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-screen flex flex-col">
        {/* Background */}
        <Image
          src={heroBg}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/50 via-primary-dark/60 to-primary-dark/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-20">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-accent/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 shadow-lg">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            HomeSphere Real Estate
          </span>

          {/* Headline */}
          <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl">
            Find Your Perfect
            <span className="block text-accent">Dream Home</span>
          </h1>

          <p className="mt-6 text-lg text-white/75 max-w-xl leading-relaxed">
            Discover thousands of verified properties — buy, sell, or rent with confidence using HomeSphere&apos;s trusted platform.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/DetailHome"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Browse Listings
            </Link>
            <Link
              href="/aboutus"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl border border-white/30 transition-all duration-200 hover:-translate-y-0.5 text-base"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-5">
            <div className="grid grid-cols-3 divide-x divide-white/20">
              <StatItem value="10,000+" label="Properties Listed" />
              <StatItem value="$1B+" label="Property Brokered" />
              <StatItem value="15 Yrs" label="In Business" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <HomeProperty />

      {/* ── CTA (unauthenticated only) ── */}
      {!uid && <GetStarted />}

      {/* ── About / Stats ── */}
      <About
        cardTitle1="15 years"
        cardSubText1="in business"
        cardTitle2="$1 billion"
        cardSubText2="property brokered"
        cardTitle3="10,000+"
        cardSubText3="transactions"
      />

      {/* ── Our Value ── */}
      <Value />

      {/* ── Map (authenticated) ── */}
      {uid && (
        <section className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="mb-6">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl font-heading font-bold text-primary mt-1">Properties on the Map</h2>
          </div>
          <Mapall />
        </section>
      )}

      <Footer />
    </>
  );
}

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center px-4 py-1">
    <span className="text-white font-heading font-bold text-2xl md:text-3xl">{value}</span>
    <span className="text-white/65 text-xs mt-1 font-medium">{label}</span>
  </div>
);
