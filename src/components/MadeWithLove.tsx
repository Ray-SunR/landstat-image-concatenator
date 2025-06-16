'use client';

import { useState } from 'react';

export default function MadeWithLove() {
  const [isClicked, setIsClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setShowMessage(true);
    
    setTimeout(() => {
      setIsClicked(false);
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className={`
          relative w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 
          rounded-full shadow-lg hover:shadow-xl transition-all duration-300
          hover:scale-110 active:scale-95 group
          ${isClicked ? 'animate-bounce' : 'hover:animate-pulse'}
        `}
        title="Made with love by Renchen ❤️"
      >
        <span className="text-white text-xl group-hover:scale-125 transition-transform duration-200">
          ❤️
        </span>
        
        <div className={`
          absolute inset-0 rounded-full bg-pink-400 opacity-30
          ${isClicked ? 'animate-ping' : ''}
        `} />
      </button>

      <div className={`
        absolute bottom-16 right-0 transform transition-all duration-500 ease-out
        ${showMessage 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }
      `}>
        <div className="relative">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-xl border-2 border-pink-200 min-w-max">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-800">
                Made with love by 
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Renchen
              </span>
              <span className={`text-red-500 ${isClicked ? 'animate-pulse' : ''}`}>
                ❤️
              </span>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-4 transform translate-y-1/2">
            <div className="w-3 h-3 bg-white border-r-2 border-b-2 border-pink-200 rotate-45" />
          </div>
        </div>
      </div>

      {isClicked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-500 text-sm animate-bounce"
              style={{
                left: `${Math.random() * 40 - 20}px`,
                top: `${Math.random() * 40 - 20}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
