import React from 'react';

// Star component which fills based on the percentage of fill
const Star = ({ percentage }) => {
  return (
    <div className="relative w-5 h-5">
      {/* Empty star */}
      <svg
        className="absolute w-full h-full text-gray-300"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.104 6.492a1 1 0 00.95.69h6.83c.969 0 1.371 1.24.588 1.81l-5.534 4.004a1 1 0 00-.363 1.118l2.105 6.492c.3.921-.755 1.688-1.538 1.118l-5.534-4.004a1 1 0 00-1.176 0l-5.534 4.004c-.783.57-1.838-.197-1.538-1.118l2.105-6.492a1 1 0 00-.363-1.118L2.676 11.92c-.783-.57-.381-1.81.588-1.81h6.83a1 1 0 00.95-.69l2.104-6.492z"
        />
      </svg>

      {/* Filled part of the star */}
      <svg
        className="absolute top-0 left-0 w-full h-full text-yellow-400"
        fill="currentColor"
        stroke="white"
        strokeWidth="1.5"
        style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.104 6.492a1 1 0 00.95.69h6.83c.969 0 1.371 1.24.588 1.81l-5.534 4.004a1 1 0 00-.363 1.118l2.105 6.492c.3.921-.755 1.688-1.538 1.118l-5.534-4.004a1 1 0 00-1.176 0l-5.534 4.004c-.783.57-1.838-.197-1.538-1.118l2.105-6.492a1 1 0 00-.363-1.118L2.676 11.92c-.783-.57-.381-1.81.588-1.81h6.83a1 1 0 00.95-.69l2.104-6.492z"
        />
      </svg>
    </div>
  );
};

export const Rating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, i) => {
        const starRating = Math.min(Math.max(rating - i, 0), 1); // Determines the fill percentage
        return <Star key={i} percentage={starRating * 100} />;
      })}
    </div>
  );
};
