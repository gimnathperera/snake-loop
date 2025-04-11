
import React from "react";
import { RotateCcw, Pause, Play } from "lucide-react";

interface GameControlsProps {
  score: number;
  highScore: number;  // We'll keep this prop but not display it during gameplay
  isPaused: boolean;
  onPause: () => void;
  onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  score,
  isPaused,
  onPause,
  onRestart,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="bg-[#1A1F3C] px-4 py-2 rounded-lg border border-[#33CCFF]/30">
          <p className="text-white text-sm">Score</p>
          <p className="text-white text-xl font-bold">{score}</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onPause}
            className="bg-[#1A1F3C] p-3 rounded-lg border border-[#33CCFF]/30 hover:bg-[#2A2F4C] transition-colors"
            aria-label={isPaused ? "Resume game" : "Pause game"}
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-white" />
            ) : (
              <Pause className="w-5 h-5 text-white" />
            )}
          </button>
          
          <button
            onClick={onRestart}
            className="bg-[#1A1F3C] p-3 rounded-lg border border-[#33CCFF]/30 hover:bg-[#2A2F4C] transition-colors"
            aria-label="Restart game"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
