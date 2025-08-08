
import React from 'react';
import { Players, SquareValue } from '../types';
import { LoadingSpinner } from './icons';

interface GameStatusProps {
  winner: SquareValue | 'DRAW';
  players: Players;
  currentPlayer: SquareValue;
  isAiThinking: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, players, currentPlayer, isAiThinking }) => {
  let message;
  if (winner) {
    if (winner === 'DRAW') {
      message = "It's a Draw!";
    } else {
      message = `🎉 ${players[winner].name} Wins! 🎉`;
    }
  } else if (isAiThinking) {
    message = (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
        <span>AI is thinking...</span>
      </div>
    );
  } else {
    message = `${players[currentPlayer!].name}'s Turn`;
  }

  return (
    <div className="h-16 flex items-center justify-center text-xl font-semibold text-center my-4 p-2 rounded-lg bg-slate-800 w-full max-w-md">
      {message}
    </div>
  );
};

export default GameStatus;
