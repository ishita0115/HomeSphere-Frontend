import React from "react";
import useLoginModal from "@/app/redux/hooks/loginhook";

const GetStarted = () => {
  const loginModal = useLoginModal();

  return (
    <section className="g-wrapper">
      <div className="g-container innerWidth paddings">
        {/* Top label */}
        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-4">
          Join HomeSphere Today
        </span>

        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight max-w-2xl mx-auto text-center">
          Start Your Property Journey With Us
        </h2>

        <p className="mt-5 text-white/70 text-lg text-center max-w-lg mx-auto leading-relaxed">
          Access thousands of verified listings, connect with trusted sellers, and find your perfect home — all in one place.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["Verified Listings", "Secure Payments", "24/7 Support", "Virtual Tours"].map((f) => (
            <span
              key={f}
              className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              {f}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => loginModal.open()}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-base cursor-pointer"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          <span className="text-white/50 text-sm">No credit card required</span>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
