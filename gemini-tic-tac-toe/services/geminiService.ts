
import { GoogleGenAI, Type } from "@google/genai";
import { SquareValue } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI opponent will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAiMove = async (board: SquareValue[], aiPlayer: 'X' | 'O'): Promise<number> => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  
  const availableIndices = board
    .map((value, index) => (value === null ? index : null))
    .filter((value): value is number => value !== null);

  if (availableIndices.length === 0) {
    throw new Error("No available moves for AI.");
  }

  const prompt = `You are an expert Tic-Tac-Toe player. Your mark is '${aiPlayer}'. The human player's mark is '${humanPlayer}'.
The game board is represented by a 9-element array. The indices are 0-8, from top-left to bottom-right.
The current board state is: ${JSON.stringify(board)}.
A 'null' value means the square is empty.
The available moves are at indices: [${availableIndices.join(', ')}].
Your task is to return the index of your next move. Choose the move that gives you the highest chance of winning. If you cannot win, choose a move to block the human player from winning. If neither is possible, pick a strategic square.
Respond with only the JSON object containing your chosen move.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            move: {
              type: Type.INTEGER,
              description: `The index (0-8) of your chosen move from the available indices: [${availableIndices.join(', ')}]`,
            },
          },
          required: ['move']
        },
         thinkingConfig: { thinkingBudget: 0 } 
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (typeof result.move === 'number' && availableIndices.includes(result.move)) {
      return result.move;
    } else {
      console.error("AI returned an invalid or unavailable move:", result.move);
      // Fallback to a random move from available ones
      return availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }
  } catch (error) {
    console.error("Error fetching AI move from Gemini API:", error);
    // Fallback to a random move in case of API error
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  }
};
