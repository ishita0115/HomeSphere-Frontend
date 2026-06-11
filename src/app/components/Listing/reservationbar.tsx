"use client";
import { useState } from "react";
import { profileApiservive } from "@/app/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export type Property = {
  id: string;
  booking_by?: number;
};

interface ReservationSidebarProps {
  property: Property | null;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({ property }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const uiid = useSelector((state: any) => state.auth.token.uid);
  const token = useSelector((state: any) => state.auth.token.access);

  const today = new Date().toISOString().split("T")[0];

  const performBooking = async () => {
    if (!selectedDate) { toast.error("Please select a date before booking."); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Listing", property?.id || "");
      formData.append("which_date", selectedDate);
      formData.append("booked_by", uiid.toString());
      await profileApiservive.post("/app2/bookings/", formData, token);
      toast.success("Booking confirmed!");
      setSelectedDate("");
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6 col-span-2 rounded-2xl border border-navy-100 shadow-card bg-white">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">Book a Visit</h2>
      <p className="text-xs text-navy-400 mb-6">Select a date to schedule your property visit</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
            Visit Date
          </label>
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer bg-white"
          />
        </div>

        {selectedDate && (
          <div className="flex items-center gap-2 p-3 bg-navy-50 rounded-xl">
            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span className="text-xs text-navy-600">
              Visit on <strong>{new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
            </span>
          </div>
        )}

        <button
          onClick={performBooking}
          disabled={loading || !selectedDate}
          className="btn btn-gold w-full py-3.5 text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Booking…
            </span>
          ) : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default ReservationSidebar;
