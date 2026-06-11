"use client";
import useLoginModal from "@/app/redux/hooks/loginhook";
import AnimatedSection from "@/app/components/ui/AnimatedSection";
import Link from "next/link";

const FEATURES = [
  { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Verified Listings" },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Secure Payments" },
  { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", label: "24/7 Support" },
  { icon: "M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z", label: "Virtual Tours" },
];

export default function GetStarted() {
  const loginModal = useLoginModal();

  return (
    <section className="cta-section py-28">
      <div className="content max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <div>
            <AnimatedSection direction="right">
              <span className="section-label" style={{ background: "rgba(229,176,58,0.2)", borderColor: "rgba(229,176,58,0.4)", color: "#EEC766" }}>
                Get Started Today
              </span>
              <h2 className="text-display-sm font-heading font-bold text-white mt-5 mb-5 leading-tight">
                Start Your Property Journey With HomeSphere
              </h2>
              <p className="text-white/65 text-lg leading-relaxed max-w-md">
                Access thousands of verified listings, connect with trusted sellers, and find your perfect home — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
                <button
                  onClick={() => loginModal.open()}
                  className="btn btn-gold text-base px-8 py-4 cursor-pointer animate-pulse-gold"
                >
                  Get Started Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </button>
                <Link href="/DetailHome" className="btn btn-ghost text-base px-8 py-4">
                  Browse Listings
                </Link>
              </div>

              <p className="text-white/35 text-sm mt-5">No credit card required · Free forever plan available</p>
            </AnimatedSection>
          </div>

          {/* Right feature grid */}
          <AnimatedSection direction="left" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map(({ icon, label }, i) => (
                <div
                  key={label}
                  className="p-6 rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
                    </svg>
                  </div>
                  <p className="text-white font-heading font-semibold text-sm">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
