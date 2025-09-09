import React, { useState } from 'react';
import axios from 'axios';

const TryGlasses = () => {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [glassesImage, setGlassesImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!personImage || !glassesImage) {
      alert('נא לבחור גם תמונת פנים וגם תמונת משקפיים');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('person', personImage);
    formData.append('glasses', glassesImage);

    try {
      const response = await axios.post('http://localhost:4001/api/merge-glasses', formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResultImage(response.data.image); // קיבלת base64 או URL
    } catch (error) {
      alert('שגיאה בשילוב התמונות');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">נסה משקפיים על הפנים שלך</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPersonImage(e.target.files?.[0] || null)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setGlassesImage(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-fit"
        disabled={loading}
      >
        {loading ? 'יוצר תמונה...' : 'שלח ל־OpenAI'}
      </button>

      {resultImage && (
        <img
          src={resultImage}
          alt="תוצאה עם משקפיים"
          className="mt-4 border rounded max-w-md"
        />
      )}
    </div>
  );
};

export default TryGlasses;
