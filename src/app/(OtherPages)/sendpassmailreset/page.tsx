"use client";
import { useState } from "react";
import axios from "axios";

const INPUT = "w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-primary placeholder-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

const SendPasswordResetEmail = () => {
  const [serverError, setServerError] = useState<any>({});
  const [serverMsg, setServerMsg] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/send-reset-password-email/`,
        { email: data.get("email") },
        { headers: { "Content-type": "application/json" } }
      );
      setServerMsg(res.data);
      setServerError({});
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setServerMsg({});
        setServerError(err.response.data.errors || {});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-card p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-primary">Reset Password</h1>
            <p className="text-xs text-navy-400">Enter your email to receive a reset link</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">Email Address</label>
            <input type="email" name="email" required placeholder="you@example.com" className={INPUT} />
            {serverError?.email && <p className="text-red-500 text-xs mt-1">{serverError.email[0]}</p>}
          </div>

          {serverError?.non_field_errors && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {serverError.non_field_errors[0]}
            </div>
          )}
          {serverMsg?.msg && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {serverMsg.msg}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-60">
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendPasswordResetEmail;
