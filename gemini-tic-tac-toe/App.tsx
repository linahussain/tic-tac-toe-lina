
import React, { useState, useEffect, useCallback } from 'react';
import { SquareValue, GameMode, GameStage, Players } from './types';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import GameStatus from './components/GameStatus';
import GameSetup from './components/GameSetup';
import { getAiMove } from './services/geminiService';

const calculateWinner = (squares: SquareValue[]): { winner: SquareValue, line: number[] } | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};


const App: React.FC = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.SETUP);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.SINGLE_PLAYER);
  const [players, setPlayers] = useState<Players>({
    X: { name: 'Player 1', score: 0 },
    O: { name: 'Player 2', score: 0 },
  });
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winnerInfo, setWinnerInfo] = useState<{ winner: SquareValue, line: number[] } | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const winner = winnerInfo ? winnerInfo.winner : null;

  const handleStartGame = (mode: GameMode, playerNames: { p1: string; p2: string }) => {
    setGameMode(mode);
    setPlayers({
      X: { name: playerNames.p1, score: 0 },
      O: { name: playerNames.p2, score: 0 },
    });
    setGameStage(GameStage.PLAYING);
    resetBoard();
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinnerInfo(null);
    setIsDraw(false);
  };
  
  const handleNewGame = () => {
    setGameStage(GameStage.SETUP);
    // Reset scores when starting a totally new game configuration
    setPlayers({
        X: { name: 'Player 1', score: 0 },
        O: { name: 'Player 2', score: 0 },
    });
  };

  const handleNextRound = () => {
    resetBoard();
  };

  const handleSquareClick = (i: number) => {
    if (winner || board[i] || isAiThinking) {
      return;
    }

    const newBoard = board.slice();
    newBoard[i] = currentPlayer;
    setBoard(newBoard);
  };

  const triggerAiMove = useCallback(async (currentBoard: SquareValue[]) => {
      setIsAiThinking(true);
      try {
          const aiMove = await getAiMove(currentBoard, 'O');
          handleSquareClick(aiMove);
      } catch (error) {
          console.error("AI failed to make a move:", error);
          // If AI fails, maybe allow human to play or auto-pick a random spot
      } finally {
          setIsAiThinking(false);
      }
  }, []);


  useEffect(() => {
    const winnerCheck = calculateWinner(board);
    if (winnerCheck) {
      setWinnerInfo(winnerCheck);
      setPlayers(prev => ({
        ...prev,
        [winnerCheck.winner!]: {
          ...prev[winnerCheck.winner!],
          score: prev[winnerCheck.winner!].score + 1
        }
      }));
    } else if (board.every(square => square !== null)) {
      setIsDraw(true);
    } else {
       // Only switch player if no winner and not a draw
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);

      if (gameMode === GameMode.SINGLE_PLAYER && nextPlayer === 'O' && !winnerCheck) {
        // use a short delay for better UX
        setTimeout(() => triggerAiMove(board), 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);
  
  // Custom animation styles
  const animationStyle = `
    @keyframes pop-in {
      0% { transform: scale(0); opacity: 0; }
      80% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-pop-in {
      animation: pop-in 0.3s ease-out forwards;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }
  `;

  if (gameStage === GameStage.SETUP) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <style>{animationStyle}</style>
            <GameSetup onStartGame={handleStartGame} />
        </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 animate-fade-in">
      <style>{animationStyle}</style>
      <div className="flex flex-col items-center space-y-4 w-full">
        <Scoreboard 
            players={players} 
            currentPlayer={currentPlayer}
            isAiOpponent={gameMode === GameMode.SINGLE_PLAYER}
        />
        <GameStatus 
            winner={winner || (isDraw ? 'DRAW' : null)}
            players={players}
            currentPlayer={currentPlayer}
            isAiThinking={isAiThinking}
        />
        <Board
          squares={board}
          onClick={handleSquareClick}
          winningSquares={winnerInfo ? winnerInfo.line : null}
          disabled={!!winner || isDraw || isAiThinking}
        />
        <div className="flex space-x-4">
          {(winner || isDraw) && (
            <button
              onClick={handleNextRound}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
              Next Round
            </button>
          )}
          <button
            onClick={handleNewGame}
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            New Game
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
