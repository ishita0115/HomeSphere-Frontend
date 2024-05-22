"use client"
import React, { useState, ChangeEvent } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

interface StepTwoProps {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => void;
}

const StepTwo: NextPage<StepTwoProps> = ({ handleImageChange }) => {
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null, null]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormData, index: number) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }

      handleImageChange(e, fieldName);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews(prevPreviews => {
          const newPreviews = [...prevPreviews];
          newPreviews[index] = reader.result as string;
          return newPreviews;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex mt-3 dark:bg-gray-900 items-center justify-center">
      <div className="bg-white shadow-[#4689ab] w-3/5 h-4/5 items-center mt-1 dark:bg-gray-800 shadow-lg rounded-xl w-100 p-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">Add Your Listing Photos</h2>
        <h5 className="text-2xl font-bold text-red-800 dark:text-white text-center mb-4">Please select exactly 4 images</h5>
        <div className="flex flex-col space-y-4">
          {[1, 2, 3, 4].map(index => (
            <div key={index}>
              <label htmlFor={`image${index}`} className="block mt-2 ml-4">Image {index}</label>
              <input type="file" className="mt-2 ml-4" id={`image${index}`} name={`image${index}`} onChange={(e) => handleInputChange(e, `image${index}` as keyof FormData, index - 1)} />
              {imagePreviews[index - 1] && (
                <div className="mt-2 ml-4" style={{ width: '50%', height: '50%' }}>
                  <Image src={imagePreviews[index - 1] as string} width={500} height={500} alt={`Image ${index} Preview`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
