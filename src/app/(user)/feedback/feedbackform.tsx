import React, { useState, ChangeEvent, FormEvent } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import axios from 'axios';

function FeedbackForm({ listingId }: { listingId: string }) {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const userId = useSelector((state: any) => state.auth.token.uid);
  const token = useSelector((state: any) => state.auth.token.access);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/app2/submitfeedback/',
        {
          listing_id: listingId,
          rating,
          message,
          feedback_by: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  

      if (!response) {
        throw new Error('Failed to submit feedback');
      }

      // Feedback submitted successfully
      console.log('Feedback submitted successfully');
    } catch (err) {
      console.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (e: ChangeEvent<{}>, value: number | null) => {
    if (value !== null) {
      setRating(value);
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <form className="p-4 bg-white shadow rounded-xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
        <div className="mb-4">
          <label className="block mb-1">Rating</label>
          <div className="flex items-center space-x-2">
            <Stack spacing={1}>
              <Rating name="size-large" defaultValue={2} size="large" value={rating} onChange={handleRatingChange} />
            </Stack>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea id="message" value={message} onChange={handleMessageChange} className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" disabled={loading} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{loading ? 'loading' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
