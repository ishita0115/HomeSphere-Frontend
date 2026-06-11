"use client";
import AnimatedSection from "../ui/AnimatedSection";

const steps = [
  {
    n: "01",
    title: "Search & Filter",
    desc: "Use our smart search to filter by location, type, price, bedrooms, and more. Find exactly what you need in seconds.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    ),
  },
  {
    n: "02",
    title: "Explore & Compare",
    desc: "View high-quality photos, virtual tours, floor plans, and neighborhood maps. Compare multiple properties side by side.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
  },
  {
    n: "03",
    title: "Connect & Close",
    desc: "Contact sellers directly, schedule viewings, and complete secure transactions — all within the HomeSphere platform.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface-secondary relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "linear-gradient(rgba(11,45,85,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,45,85,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="section-label">Simple Process</span>
          <h2 className="text-display-sm font-heading font-bold text-primary mt-4 mb-4">
            How HomeSphere Works
          </h2>
          <p className="text-navy-500 text-lg max-w-xl mx-auto leading-relaxed">
            From search to ownership in three simple steps. Our streamlined process makes finding your dream home effortless.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.6%+2rem)] right-[calc(16.6%+2rem)] h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent z-0" />

          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 0.15} direction="up">
              <div className="step-card group relative text-center">
                <span className="step-number">{step.n}</span>

                {/* Icon ring */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-navy-50 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-all duration-300 shadow-xs relative z-10">
                    {step.icon}
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-2xl bg-accent/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                </div>

                <h3 className="text-xl font-heading font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{step.desc}</p>

                {/* Step number badge */}
                <div className="mt-5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/15 text-accent-dark text-xs font-bold font-heading">
                  {i + 1}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
