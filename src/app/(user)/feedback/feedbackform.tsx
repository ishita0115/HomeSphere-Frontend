"use client";
import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 20 20"
            fill={star <= (hover || value) ? "#E5B03A" : "#D1D5DB"}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function FeedbackForm({ listingId }: { listingId: string }) {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const userId = useSelector((state: any) => state.auth.token.uid);
  const token = useSelector((state: any) => state.auth.token.access);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) { toast.error("Please select a rating"); return; }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/app2/submitfeedback/`,
        { listing_id: listingId, rating, message, feedback_by: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Feedback submitted successfully");
      router.push("/DetailHome");
    } catch {
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 mt-4">
      <h2 className="font-heading font-bold text-lg text-primary mb-5">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
            Your Rating
          </label>
          <StarPicker value={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="text-xs text-navy-400 mt-1">
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">
            Your Review
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Share your experience with this property…"
            className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-primary placeholder-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
