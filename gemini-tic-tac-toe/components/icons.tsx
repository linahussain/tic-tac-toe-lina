
import React from 'react';

export const IconX = () => (
  <svg className="w-full h-full text-sky-400" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
    <path d="M10 10 L42 42 M42 10 L10 42" />
  </svg>
);

export const IconO = () => (
  <svg className="w-full h-full text-pink-500" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="6">
    <circle cx="26" cy="26" r="18" />
  </svg>
);

export const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
