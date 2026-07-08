import React from 'react';
import { ChatIcon } from './Icons';

const FloatingContactButton = () => {
  const handleClick = () => {
    window.open("https://wa.me/916377790409", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-primary text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-primary-dark transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-light min-w-[56px] min-h-[56px] flex items-center justify-center"
      aria-label="Contact us"
    >
      <ChatIcon className="text-xl sm:text-2xl w-6 h-6" />
    </button>
  );
};

export default FloatingContactButton;
