// src/components/ui/tooltip.jsx
import React, { useState } from 'react';

export const Tooltip = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex"
      >
        {children}
      </div>
      {isVisible && (
        <div className={`
          absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 
          rounded-lg shadow-sm whitespace-nowrap ${positionClasses[position]}
        `}>
          {content}
          <div className={`
            absolute w-2 h-2 bg-gray-900 transform rotate-45
            ${position === "top" ? "top-full left-1/2 -translate-x-1/2 -mt-1" : ""}
            ${position === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 -mb-1" : ""}
            ${position === "left" ? "left-full top-1/2 -translate-y-1/2 -ml-1" : ""}
            ${position === "right" ? "right-full top-1/2 -translate-y-1/2 -mr-1" : ""}
          `} />
        </div>
      )}
    </div>
  );
};
