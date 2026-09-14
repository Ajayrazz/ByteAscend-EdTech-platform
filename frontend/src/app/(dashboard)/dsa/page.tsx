import React from 'react';
import DSASheetClient from './DSASheetClient';

export const metadata = {
  title: 'DSA Practice Sheet | ByteAscend',
  description: 'Practice the most important DSA interview questions.',
};

async function getCurriculum() {
  try {
    const res = await fetch('http://localhost:8083/api/dsa/sheet/days', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching curriculum:", error);
    return []; // Return empty array or fallback
  }
}

export default async function DSAPage() {
  const initialDays = await getCurriculum();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <DSASheetClient initialDays={initialDays} />
    </div>
  );
}
