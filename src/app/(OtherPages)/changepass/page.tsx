"use client";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const INPUT = "w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-primary placeholder-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

const ChangePassword: React.FC = () => {
  const [serverError, setServerError] = useState<Record<string, any>>({});
  const [serverMsg, setServerMsg] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.auth.token.access);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/changepassword/`,
        { password: data.get("password"), password2: data.get("password2") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServerMsg(res.data);
      setServerError({});
      (e.target as HTMLFormElement).reset();
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-primary">Change Password</h1>
            <p className="text-xs text-navy-400">Set a new secure password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} id="password-change-form" className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">New Password</label>
            <input type="password" name="password" required placeholder="Enter new password" className={INPUT} />
            {serverError.password && <p className="text-red-500 text-xs mt-1">{serverError.password[0]}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">Confirm Password</label>
            <input type="password" name="password2" required placeholder="Confirm new password" className={INPUT} />
            {serverError.password2 && <p className="text-red-500 text-xs mt-1">{serverError.password2[0]}</p>}
          </div>

          {serverError.non_field_errors && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              {serverError.non_field_errors[0]}
            </div>
          )}
          {serverMsg.msg && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {serverMsg.msg}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-60">
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
