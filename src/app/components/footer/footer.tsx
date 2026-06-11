"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sendpodtdata } from "@/app/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EXPLORE = [
  { label: "Home",               href: "/"          },
  { label: "Property Listings",  href: "/DetailHome"},
  { label: "About Us",           href: "/aboutus"   },
  { label: "Contact Us",         href: "/contactus" },
];
const COMPANY = [
  { label: "Our Story",  href: "/aboutus" },
  { label: "Careers",    href: "#"        },
  { label: "Blog",       href: "#"        },
  { label: "Pricing",    href: "#"        },
];
const SOCIAL = [
  { label: "Facebook",  href: "#", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
  { label: "Twitter",   href: "#", d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
  { label: "Instagram", href: "#", d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" },
  { label: "LinkedIn",  href: "#", d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
];

export default function Footer() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const senderId = useSelector((state: any) => state.auth.token.uid);
  const token    = useSelector((state: any) => state.auth.token.access);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await sendpodtdata.post("/api/contact/", { sender: senderId, message }, token);
      if (res.data) toast.success("Message sent successfully!");
      setMessage("");
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="footer-root">
      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image src="/images/logo.jpg" alt="HomeSphere" width={40} height={40} className="object-cover" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                Home<span style={{ color: "var(--color-accent)" }}>Sphere</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              India&apos;s trusted real estate platform. Discover, buy, sell, and rent properties with confidence and ease.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL.map(({ label, href, d }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseOver={e => (e.currentTarget.style.background = "var(--color-accent)")}
                  onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={d}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-3">
              {EXPLORE.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseOver={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                    onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    <span className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-3">
              {COMPANY.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseOver={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                    onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    <span className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-6">Get in Touch</h4>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Have a question or feedback? Drop us a message and we&apos;ll respond shortly.
            </p>
            <textarea
              rows={3}
              placeholder="Your message..."
              className="w-full text-sm rounded-xl px-4 py-3 resize-none transition-all focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSend}
              disabled={sending || !message.trim()}
              className="btn btn-gold w-full mt-3 py-3 text-sm disabled:opacity-50 cursor-pointer"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2024 HomeSphere. All rights reserved. Designed with care.
          </span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <Link
                key={t}
                href="#"
                className="text-xs transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseOver={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
