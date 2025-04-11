
import React from "react";
import { RotateCcw, Trophy } from "lucide-react";

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, highScore, onRestart }) => {
  const isNewHighScore = score >= highScore && score > 0;
  
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
      <div className="bg-[#1A1F3C] p-6 rounded-lg shadow-lg text-center max-w-xs w-full border border-[#33CCFF]/30">
        <h2 className="text-2xl font-bold text-white mb-1">Game Over</h2>
        
        {isNewHighScore ? (
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold text-xl">
              <Trophy className="w-5 h-5" />
              <span>New High Score!</span>
            </div>
          </div>
        ) : (
          <p className="text-white/80 mb-4">Better luck next time!</p>
        )}
        
        <div className="flex justify-between mb-6 px-4">
          <div className="text-center">
            <p className="text-white/60 text-sm">Score</p>
            <p className="text-white text-xl font-bold">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm">Best</p>
            <p className="text-white text-xl font-bold">{highScore}</p>
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="bg-[#FF3366] text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 mx-auto hover:bg-[#FF3366]/90 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Play Again
        </button>
      </div>
    </div>
  );
};
