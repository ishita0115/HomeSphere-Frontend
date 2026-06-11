"use client";
import React, { useState, ChangeEvent } from "react";
import StepOne from "../../components/steps/step1";
import StepTwo from "../../components/steps/step2";
import StepThree from "../../components/steps/step3";
import { profileApiservive } from "@/app/apiService";
import { useSelector } from "react-redux";
import sellermiddleware from "../sellermiddleware";
import { toast } from "react-toastify";

const STEPS = [
  {
    label: "Listing Details",
    desc: "Basic info about your property",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    label: "Photos",
    desc: "Upload property images",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: "Location",
    desc: "Pin your property on the map",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
];

const HorizontalNonLinearStepper = () => {
  const token = useSelector((state: any) => state.auth.token.access);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: "", address: "", city: "", description: "", extrafacility: "",
    rental_choice: "", price: 0, bedrooms: 0, bathrooms: 0,
    sale_type: "", home_type: "", country: "",
    image1: null, image2: null, image3: null, image4: null,
    latitude: 0, longitude: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;
    if (name === "bedrooms" || name === "bathrooms") {
      const v = parseFloat(value);
      if (v < 1 || v > 10) { toast.error(`${name} must be between 1–10`); return; }
      newValue = v;
    }
    if (name === "price") {
      const v = parseFloat(value);
      if (v < 1000 || v > 1000000000) { toast.error("Price must be ₹1,000 – ₹1,00,00,00,000"); return; }
      newValue = v;
    }
    setFormData((p: any) => ({ ...p, [name]: newValue }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const files = e.target.files;
    if (files?.[0]) setFormData((p: any) => ({ ...p, [fieldName]: files[0] }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p: any) => ({ ...p, [name]: value }));
  };

  const sendDataToBackend = async () => {
    setSubmitting(true);
    const fd = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) fd.append(key, formData[key]);
    }
    try {
      const res = await profileApiservive.post("/app2/ManageListingView/", fd, token);
      if (res) { toast.success("Listing created successfully!"); setSubmitted(true); }
    } catch (error: any) {
      const data = error?.response?.data?.error;
      if (data) {
        const msgs = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n");
        toast.error(msgs);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = () => {
    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);
    if (activeStep === STEPS.length - 1) {
      sendDataToBackend();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setSubmitted(false);
    setFormData({
      title: "", address: "", city: "", description: "", extrafacility: "",
      rental_choice: "", price: 0, bedrooms: 0, bathrooms: 0,
      sale_type: "", home_type: "", country: "",
      image1: null, image2: null, image3: null, image4: null,
      latitude: 0, longitude: 0,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-card p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="font-heading font-bold text-2xl text-primary mb-2">Listing Published!</h2>
          <p className="text-navy-400 text-sm mb-8">Your property has been successfully listed on HomeSphere.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleReset} className="btn btn-outline px-6 py-3 text-sm cursor-pointer">
              Add Another
            </button>
            <a href="/DetailHome" className="btn btn-primary px-6 py-3 text-sm cursor-pointer">
              View Listings
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Page hero */}
      <div className="bg-white border-b border-navy-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="section-label mb-2">Sell or Rent</p>
          <h1 className="font-heading font-bold text-3xl text-primary">List Your Property</h1>
          <p className="text-navy-400 mt-1 text-sm">Complete 3 simple steps to publish your listing</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Custom stepper */}
        <div className="flex items-start gap-0 mb-10">
          {STEPS.map((step, i) => {
            const isDone = completed[i];
            const isActive = activeStep === i;
            return (
              <React.Fragment key={i}>
                <button
                  onClick={() => setActiveStep(i)}
                  className="flex flex-col items-center flex-1 cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-2 ${
                    isDone
                      ? "bg-emerald-500 text-white shadow-md"
                      : isActive
                      ? "bg-primary text-white shadow-gold"
                      : "bg-white text-navy-300 border-2 border-navy-100 group-hover:border-primary group-hover:text-primary"
                  }`}>
                    {isDone ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : step.icon}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${isActive ? "text-primary" : isDone ? "text-emerald-600" : "text-navy-400"}`}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-navy-400 hidden sm:block">{step.desc}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 flex items-center mt-5">
                    <div className={`h-0.5 w-full transition-all duration-500 ${completed[i] ? "bg-emerald-400" : "bg-navy-100"}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step content */}
        <div>
          {activeStep === 0 && <StepOne formData={formData} handleChange={handleChange} />}
          {activeStep === 1 && <StepTwo handleImageChange={handleImageChange} />}
          {activeStep === 2 && <StepThree formData={formData} handleInputChange={handleInputChange} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-100">
          <button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-navy-200 text-navy-600 hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>

          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${
                i === activeStep ? "w-6 h-2 bg-primary" : completed[i] ? "w-2 h-2 bg-emerald-400" : "w-2 h-2 bg-navy-200"
              }`} />
            ))}
          </div>

          <button
            onClick={handleComplete}
            disabled={submitting}
            className="btn btn-primary flex items-center gap-2 px-6 py-2.5 text-sm cursor-pointer disabled:opacity-60"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Publishing…
              </>
            ) : activeStep === STEPS.length - 1 ? (
              <>
                Publish Listing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </>
            ) : (
              <>
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default sellermiddleware(HorizontalNonLinearStepper);
