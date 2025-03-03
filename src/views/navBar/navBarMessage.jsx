import React, { useState, useEffect } from 'react';

const NavBarMessage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const messages = [
    'Get flat 5% Off on your First Order',
    'Quality and Care is our Priority',
    'Visit relaxpro_matresses store to avail huge discounts...!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger exit animation
      setIsExiting(true);

      // Wait for the exit animation to finish before switching messages
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => {
          return prevIndex === messages.length - 1 ? 0 : prevIndex + 1;
        });

        // Start the entry animation after switching the message
        setIsExiting(false);
      }, 1000); // This timeout matches the exit animation duration
    }, 3000); // Switch messages every 3 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    // <div className="bg-gradient-to-r from-[#313380] via-[#1f246d] to-[#1a1c5a] p-1">
    <div className="bg-sky-950  p-1">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="message-container">
            <h1
              className={`message-text text-white text-sm transition-opacity duration-500 ${
                isExiting
                  ? 'animate-slideOutDown opacity-0'
                  : 'animate-slideInDown opacity-100'
              }`}
            >
              {messages[currentMessageIndex]}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarMessage;
