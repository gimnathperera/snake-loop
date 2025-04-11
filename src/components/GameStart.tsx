import React from 'react';

interface GameStartProps {
  onStart: () => void;
}

export const GameStart = ({ onStart }: GameStartProps) => {
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to Snake Loop!</h2>
        <p className="mb-6">Use arrow keys to move, space to pause, R to restart</p>
        <button
          onClick={onStart}
          className="bg-[#FF3366] text-white px-6 py-2 rounded-full hover:bg-[#FF3366]/80 transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};