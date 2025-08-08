
import React from 'react';
import { Players, SquareValue } from '../types';

interface ScoreboardProps {
  players: Players;
  currentPlayer: SquareValue;
  isAiOpponent: boolean;
}

const PlayerCard: React.FC<{name: string, score: number, mark: string, isActive: boolean, isAi: boolean}> = ({ name, score, mark, isActive, isAi }) => {
    const activeClass = isActive ? 'bg-slate-700 scale-105 shadow-lg' : 'bg-slate-800';
    const markColor = mark === 'X' ? 'text-sky-400' : 'text-pink-500';

    return (
        <div className={`p-4 rounded-lg transition-all duration-300 ${activeClass}`}>
            <div className="flex justify-between items-center">
                <p className="text-lg font-semibold truncate">{name} {isAi && '(AI)'}</p>
                <p className={`text-2xl font-bold ${markColor}`}>{mark}</p>
            </div>
            <p className="text-sm text-slate-400 mt-1">Score</p>
            <p className="text-3xl font-bold text-center mt-2">{score}</p>
        </div>
    );
}


const Scoreboard: React.FC<ScoreboardProps> = ({ players, currentPlayer, isAiOpponent }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      <PlayerCard 
        name={players.X.name}
        score={players.X.score}
        mark="X"
        isActive={currentPlayer === 'X'}
        isAi={false}
      />
      <PlayerCard 
        name={players.O.name}
        score={players.O.score}
        mark="O"
        isActive={currentPlayer === 'O'}
        isAi={isAiOpponent}
      />
    </div>
  );
};

export default Scoreboard;
