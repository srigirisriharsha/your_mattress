import React from 'react';
import matricesimage3 from '../../../assets/Images/matrices/Main.webp';
import matricesimage1 from '../../../assets/Images/matrices/Main2.avif';

const Section3 = () => {
  // Define each badge's position and label here (used only on larger screens)
  const badges = [
    { label: 'Bed Sheet', top: '35%', left: '60%' },
    { label: 'Latex Pillows', top: '20%', left: '50%' },
    { label: 'Duvet Cover', top: '30%', left: '70%' },
    { label: 'Comforter', top: '50%', left: '45%' },
    { label: 'Topper', top: '65%', left: '50%' },
    { label: 'Protector', top: '75%', left: '55%' },
    { label: 'Varam 3in1 Latex Bed', top: '85%', left: '50%' },
    { label: 'Zip Cover', top: '80%', left: '65%' },
  ];

  return (
    <div className="relative p-3 w-full h-auto bg-gray-100">
      {/* For mobile and tablet: Display only plain image */}
      <div className="block md:hidden">
        <img
          src={matricesimage1}
          alt="Plain Bed Layout"
          className="object-cover w-full h-full"
        />
      </div>

      {/* For larger screens: Display image with badges */}
      <div className="hidden md:block">
        <img
          src={matricesimage3}
          alt="Bed Layout with Badges"
          className="object-cover w-full h-full"
        />

        {/* Badges */}
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`absolute p-1 sm:p-2 bg-white text-xs sm:text-sm rounded-full 
            border-2 border-transparent transition-all duration-500 animate-pulse 
            hover:border-black`}
            style={{
              top: badge.top,
              left: badge.left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section3;
