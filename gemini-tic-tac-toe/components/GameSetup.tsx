
import React, { useState } from 'react';
import { GameMode } from '../types';

interface GameSetupProps {
  onStartGame: (gameMode: GameMode, playerNames: { p1: string; p2: string }) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.SINGLE_PLAYER);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Gemini AI');
  
  const isApiKeyMissing = !process.env.API_KEY;

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === GameMode.SINGLE_PLAYER) {
      setPlayer2Name('Gemini AI');
    } else {
      setPlayer2Name('Player 2');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(gameMode, { p1: player1Name, p2: player2Name });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800 p-8 rounded-2xl shadow-2xl animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-2 text-sky-400">Gemini</h1>
      <h2 className="text-3xl font-bold text-center mb-8">Tic-Tac-Toe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-slate-300 mb-2 font-semibold">Game Mode</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleModeChange(GameMode.SINGLE_PLAYER)}
              disabled={isApiKeyMissing}
              className={`p-3 rounded-lg text-center transition ${gameMode === GameMode.SINGLE_PLAYER ? 'bg-sky-500 font-bold' : 'bg-slate-700 hover:bg-slate-600'} ${isApiKeyMissing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Single Player
            </button>
            <button
              type="button"
              onClick={() => handleModeChange(GameMode.MULTIPLAYER)}
              className={`p-3 rounded-lg text-center transition ${gameMode === GameMode.MULTIPLAYER ? 'bg-pink-500 font-bold' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              Multiplayer
            </button>
          </div>
          {isApiKeyMissing && <p className="text-yellow-400 text-xs mt-2">API key not found. Single Player mode is disabled.</p>}
        </div>

        <div>
          <label htmlFor="player1" className="block text-slate-300 mb-2 font-semibold">Player 1 (X)</label>
          <input
            id="player1"
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className="w-full p-3 bg-slate-700 rounded-lg border-2 border-transparent focus:outline-none focus:border-sky-500 transition"
            required
          />
        </div>

        <div>
          <label htmlFor="player2" className="block text-slate-300 mb-2 font-semibold">Player 2 (O)</label>
          <input
            id="player2"
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            disabled={gameMode === GameMode.SINGLE_PLAYER}
            className="w-full p-3 bg-slate-700 rounded-lg border-2 border-transparent focus:outline-none focus:border-pink-500 transition disabled:opacity-50"
            required
          />
        </div>

        <button
          type="submit"
          disabled={gameMode === GameMode.SINGLE_PLAYER && isApiKeyMissing}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-lg text-xl transition-transform transform hover:scale-105 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default GameSetup;
