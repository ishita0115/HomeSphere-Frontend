"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";

interface StepTwoProps {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => void;
}

const SLOTS = [
  { field: "image1", label: "Cover Photo", hint: "Main image shown in listings" },
  { field: "image2", label: "Interior", hint: "Living room or main area" },
  { field: "image3", label: "Bedroom / Kitchen", hint: "Show another key room" },
  { field: "image4", label: "Exterior / View", hint: "Outside or surroundings" },
];

const StepTwo: React.FC<StepTwoProps> = ({ handleImageChange }) => {
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>, field: keyof FormData, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please upload an image file."); return; }
    handleImageChange(e, field);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviews(prev => { const n = [...prev]; n[idx] = reader.result as string; return n; });
    };
    reader.readAsDataURL(file);
  };

  const allUploaded = previews.every(Boolean);

  return (
    <div className="bg-white rounded-2xl shadow-card p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-navy-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-primary">Property Photos</h2>
            <p className="text-xs text-navy-400">Upload exactly 4 high-quality images</p>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${allUploaded ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
          {previews.filter(Boolean).length}/4 uploaded
        </div>
      </div>

      {/* Upload grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SLOTS.map(({ field, label, hint }, idx) => {
          const preview = previews[idx];
          return (
            <div key={field}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-navy-500 uppercase tracking-wide">{label}</span>
                {idx === 0 && (
                  <span className="text-[10px] px-2 py-0.5 bg-accent/10 text-accent font-semibold rounded-full">Cover</span>
                )}
              </div>
              <label
                htmlFor={field}
                className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed overflow-hidden cursor-pointer transition-all group ${
                  preview ? "border-primary/30 bg-navy-50" : "border-navy-200 hover:border-primary/50 hover:bg-navy-50/50"
                }`}
                style={{ height: "180px" }}
              >
                {preview ? (
                  <>
                    <Image src={preview} fill className="object-cover" alt={label} />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold bg-primary/80 px-3 py-1.5 rounded-lg transition-all">
                        Change Photo
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-navy-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                      <svg className="w-6 h-6 text-navy-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-navy-500 group-hover:text-primary transition-colors">Click to upload</p>
                    <p className="text-xs text-navy-400">{hint}</p>
                    <p className="text-[10px] text-navy-300">JPG, PNG, WEBP — max 10 MB</p>
                  </div>
                )}
                <input
                  type="file"
                  id={field}
                  name={field}
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleInput(e, field as keyof FormData, idx)}
                />
              </label>
            </div>
          );
        })}
      </div>

      {/* Tip */}
      <div className="flex items-start gap-3 mt-6 p-4 bg-navy-50 rounded-xl">
        <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p className="text-xs text-navy-500 leading-relaxed">
          Properties with bright, high-quality photos receive <strong className="text-primary">3× more inquiries</strong>. Use landscape photos for the best display.
        </p>
      </div>
    </div>
  );
};

export default StepTwo;
