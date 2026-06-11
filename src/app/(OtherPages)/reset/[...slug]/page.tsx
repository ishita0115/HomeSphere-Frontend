"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const INPUT = "w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-primary placeholder-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

const ResetPassword = ({ params }: { params: { slug: string[] } }) => {
  const [serverError, setServerError] = useState<Record<string, string[]>>({});
  const [serverMsg, setServerMsg] = useState<{ msg?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { slug } = params;
  const [uid, token] = [slug[0], slug[1]];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/reset-password/${uid}/${token}/`,
        { password: data.get("password"), password2: data.get("password2") },
        { headers: { "Content-type": "application/json" } }
      );
      setServerMsg(res.data);
      setServerError({});
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setServerMsg({});
        setServerError(err.response.data.errors || { non_field_errors: ["An error occurred"] });
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
            </svg>
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-primary">Set New Password</h1>
            <p className="text-xs text-navy-400">Choose a strong, unique password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">New Password</label>
            <input type="password" name="password" required placeholder="Enter new password" className={INPUT} />
            {serverError?.password && <p className="text-red-500 text-xs mt-1">{serverError.password[0]}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">Confirm Password</label>
            <input type="password" name="password2" required placeholder="Confirm new password" className={INPUT} />
            {serverError?.password2 && <p className="text-red-500 text-xs mt-1">{serverError.password2[0]}</p>}
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
              {serverMsg.msg} Redirecting…
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-60">
            {loading ? "Saving…" : "Save New Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
