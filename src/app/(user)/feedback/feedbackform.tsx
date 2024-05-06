import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
function FeedbackForm() {
  return (
    <div>
      <form className="max-w-md mx-auto p-4 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
        <div className="mb-4">
          <label className="block mb-1">Rating</label>
          <div className="flex items-center space-x-2">
          <Stack spacing={1}>
            <Rating name="size-large" defaultValue={2} size="large" />
          </Stack>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea id="message" className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
