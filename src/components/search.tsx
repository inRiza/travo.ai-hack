'use client';
import { useState } from 'react';

interface TravelRecommendation {
  location: string;
  bestTimeToVisit: string;
  keyAttractions: string[];
  budgetRange: string;
  localTips: string[];
  ranking: number;
}

interface SearchProps {
  onRecommendationsGenerated: (recommendations: TravelRecommendation[]) => void;
}

export default function Search({ onRecommendationsGenerated }: SearchProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Sending prompt:', prompt);
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log('Raw API Response:', data);
      
      if (data.recommendations && Array.isArray(data.recommendations)) {
        console.log('Valid recommendations found:', data.recommendations);
        onRecommendationsGenerated(data.recommendations);
      } else {
        console.error('Invalid recommendations data structure:', data);
      }
    } catch (error) {
      console.error('Error in search component:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-row items-center space-x-4 w-full max-w-3xl border border-gray-200 px-2 py-2 rounded-full shadow-2xl bg-transparent'>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your dream destination..."
        className="ml-5 flex-grow bg-transparent outline-none placeholder:text-sm text-left w-full min-w-[400px]"
      />
      <button type="submit" disabled={loading} className='font-travel-body font-travel-body-semibold cursor-pointer px-8 py-2 text-white bg-green-600 rounded-full hover:bg-green-500 hover:scale-105 whitespace-nowrap transition'>
        {loading ? 'Generating...' : 'Find Now'}
      </button>
    </form>
  );
}