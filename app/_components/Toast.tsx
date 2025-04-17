"use client";
import { useState, useEffect } from "react";

export const Toast = ({ message }: { message: string }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-center">
      {/* Toaster body */}
      <div className="bg-gray-200 rounded-lg p-4 shadow-lg w-64 flex flex-col items-center">
        {/* Toaster slots */}
        <div className="bg-gray-800 rounded-t-lg w-full p-2 flex justify-between items-center">
          <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
        </div>

        {/* Message in toast */}
        <div className="bg-amber-100 w-full p-4 text-center font-medium text-gray-800 rounded-b-lg border-t-2 border-gray-400 animate-bounce">
          {message}
        </div>

        {/* Toaster controls */}
        <div className="mt-2 flex justify-between w-full px-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="w-12 h-4 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Toaster base/cord */}
      <div className="bg-gray-300 w-16 h-2 rounded-b-lg"></div>
      <div className="bg-gray-400 w-1 h-6"></div>
    </div>
  );
};
