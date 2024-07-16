import React from 'react';

interface StarProps {
  portion: number; // Values: 0, 1, 2, 3, 4, 5 (representing 0/5 to 5/5 portions colored)
}

const Star: React.FC<StarProps> = ({ portion }) => {
  const fillPercentage = (portion / 5) * 100;

  return (
    <div className="relative w-20 h-20">
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full text-gray-300"
        fill="currentColor"
      >
        <path d="M12 .587l3.668 7.425 8.212 1.195-5.94 5.782 1.402 8.166L12 18.896l-7.342 3.86 1.402-8.166L.12 9.207l8.212-1.195z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute top-0 left-0 w-full h-full"
        fill="currentColor"
        style={{ clipPath: `polygon(0 0, ${fillPercentage}% 0, ${fillPercentage}% 100%, 0 100%)` }}
      >
        <path d="M12 .587l3.668 7.425 8.212 1.195-5.94 5.782 1.402 8.166L12 18.896l-7.342 3.86 1.402-8.166L.12 9.207l8.212-1.195z" className="text-yellow-500" />
      </svg>
    </div>
  );
};

export default Star;
