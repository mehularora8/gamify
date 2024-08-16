'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DatesPage() {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/available-dates')
      .then(response => response.json())
      .then(dates => {
        setAvailableDates(dates);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dates:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center mt-8">Loading available dates...</div>;
  }

  return (
    <div className="container mx-auto my-12 px-4 flex flex-col min-w-[100%]">
      <ul className="space-y-2">
        {availableDates.map(date => (
          <li key={date} className="text-left">
            <Link href={`/game/${date}`}>
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                {new Date(date).toISOString().slice(0, 10)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}