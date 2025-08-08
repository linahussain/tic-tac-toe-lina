
import React from 'react';
import { SquareValue } from '../types';
import Square from './Square';

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winningSquares: number[] | null;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningSquares, disabled }) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningSquares ? winningSquares.includes(i) : false}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-3 bg-slate-950/50 rounded-lg w-full max-w-md aspect-square">
      {squares.map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
