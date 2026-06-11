"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Home Buyer · Mumbai",
    avatar: "PS",
    color: "#0B2D55",
    rating: 5,
    text: "HomeSphere made the entire home buying process incredibly smooth. The search filters helped me narrow down options perfectly, and the virtual tours saved so much time. Found my dream apartment in just 2 weeks!",
  },
  {
    name: "Arjun Mehta",
    role: "Property Seller · Delhi",
    avatar: "AM",
    color: "#E5B03A",
    rating: 5,
    text: "I listed my property on HomeSphere and received serious inquiries within days. The platform is professional, trustworthy, and the support team is always responsive. Sold at my asking price within a month.",
  },
  {
    name: "Kavita Nair",
    role: "Tenant · Bangalore",
    avatar: "KN",
    color: "#1A4570",
    rating: 5,
    text: "The rental listings are detailed and accurate. I loved the map integration to check proximity to my office. The booking system made scheduling viewings seamless. Highly recommend HomeSphere!",
  },
  {
    name: "Rahul Gupta",
    role: "Real Estate Investor · Pune",
    avatar: "RG",
    color: "#B87A14",
    rating: 5,
    text: "As an investor, I need accurate property data fast. HomeSphere delivers with real-time listings, price analytics, and a responsive team. This platform has become an essential tool in my investment workflow.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="section-label">Client Stories</span>
          <h2 className="text-display-sm font-heading font-bold text-primary mt-4 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-navy-500 text-lg max-w-xl mx-auto">
            Thousands of happy homeowners, sellers, and tenants trust HomeSphere every day.
          </p>
        </AnimatedSection>

        {/* Stats row */}
        <AnimatedSection delay={0.1} className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "10K+", label: "Happy Clients" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-4 rounded-2xl bg-navy-50 border border-navy-100">
              <p className="text-2xl font-heading font-bold text-primary">{value}</p>
              <p className="text-xs text-navy-500 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </AnimatedSection>

        {/* Testimonial carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured (large) */}
          <AnimatedSection className="lg:col-span-2" direction="right">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="testimonial-card h-full flex flex-col justify-between"
              >
                {/* Stars */}
                <div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-navy-700 text-lg leading-relaxed font-medium">
                    &ldquo;{testimonials[active].text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-navy-100">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold font-heading text-lg flex-shrink-0"
                    style={{ background: testimonials[active].color }}
                  >
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-primary">{testimonials[active].name}</p>
                    <p className="text-navy-500 text-sm">{testimonials[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>

          {/* Selector cards */}
          <AnimatedSection className="flex flex-col gap-3" direction="left">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  i === active
                    ? "bg-primary border-primary shadow-gold text-white"
                    : "bg-white border-navy-100 hover:border-navy-200 hover:shadow-card text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-heading text-sm flex-shrink-0 ${i === active ? "bg-white/20 text-white" : "text-white"}`}
                    style={{ background: i !== active ? t.color : undefined }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${i === active ? "text-white" : "text-primary"}`}>{t.name}</p>
                    <p className={`text-xs ${i === active ? "text-white/70" : "text-navy-400"}`}>{t.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
