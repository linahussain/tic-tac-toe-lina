
import React from 'react';
import { SquareValue } from '../types';
import { IconX, IconO } from './icons';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning, disabled }) => {
  const baseStyle = "aspect-square rounded-lg flex items-center justify-center p-2 transition-all duration-200";
  const bgStyle = isWinning 
    ? "bg-emerald-500" 
    : "bg-slate-800 hover:bg-slate-700";
  
  const icon = value === 'X' ? <IconX /> : value === 'O' ? <IconO /> : null;

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`${baseStyle} ${bgStyle}`}
      aria-label={`Square ${value ? `with ${value}` : 'empty'}`}
    >
      <div className="w-3/4 h-3/4 transform scale-0 animate-pop-in">
          {icon}
      </div>
    </button>
  );
};

// Add keyframes to tailwind.config.js if you had one, or in a style tag.
// Since we can't, we'll use a style tag in App.tsx to define this custom animation.
export default Square;
