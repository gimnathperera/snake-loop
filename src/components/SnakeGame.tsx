
import { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";
import { GameControls } from "./GameControls";
import { GameOver } from "./GameOver";
import { useSnakeGame } from "@/hooks/use-snake-game";
import { useSnakeControls } from "@/hooks/use-snake-controls";
import { useGameLoop } from "@/hooks/use-game-loop";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { GRID_SIZE } from "@/types/snake-game";
import { GameStart } from "./GameStart";

const SnakeGame = () => {
  const {
    playBackgroundMusic,
    stopBackgroundMusic,
    playEatFood,
    playGameOver,
    playPause,
    playRestart,
    playGameStart,
  } = useSoundEffects();

  const {
    snake,
    food,
    direction,
    setDirection,
    gameOver,
    isPaused,
    score,
    highScore,
    resetGame,
    togglePause,
    updateGame,
    gameIntervalRef,
    directionRef,
  } = useSnakeGame({
    onEatFood: playEatFood,
    onGameOver: playGameOver,
  });
  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Set up keyboard controls
  useSnakeControls({
    gameOver,
    directionRef,
    setDirection,
    togglePause,
    resetGame,
    onPause: playPause,  // Add sound effect
  });

  // Add new state for game started
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Set up game loop
  useGameLoop({
    gameOver,
    isPaused,
    isGameStarted,
    updateGame,
    gameIntervalRef,
    onEatFood: playEatFood,  // Add sound effect
    onGameOver: playGameOver,  // Add sound effect
  });

  // Modify the initialization useEffect
  useEffect(() => {
    resetGame();
    setIsGameStarted(false);
    stopBackgroundMusic();
  }, []);

  // Add handler for starting the game
  const handleGameStart = () => {
    setIsGameStarted(true);
    resetGame();
    playGameStart();
  };

  // Handle pause with sound
  const handlePause = () => {
    togglePause();
    playPause();
  };

  // Handle restart with sound
  const handleRestart = () => {
    resetGame();
    playRestart();
    playBackgroundMusic();
  };

  return (
    <div className="flex flex-col items-center max-w-md w-full mx-auto gap-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wider relative group">
        <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-transparent bg-clip-text hover:scale-105 transition-transform duration-900 inline-block transform hover:rotate-2 animate-[pulse_3s_ease-in-out_infinite]">
          Snake Loop
        </span>
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
      </h1>
      
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-[#33CCFF]/30 shadow-[0_0_15px_rgba(51,204,255,0.3)]">
        <GameBoard 
          gridSize={GRID_SIZE} 
          snake={snake} 
          food={food} 
        />
        
        {/* Start Game Overlay */}
        {!isGameStarted && !gameOver && (
          <GameStart onStart={handleGameStart} />
        )}
        
        {/* Game Over Overlay */}
        {gameOver && (
          <GameOver 
            score={score} 
            highScore={highScore} 
            onRestart={resetGame} 
          />
        )}
        
        {/* Pause Overlay */}
        {isPaused && !gameOver && isGameStarted && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
              <button
                onClick={togglePause}
                className="bg-[#FF3366] text-white px-6 py-2 rounded-full hover:bg-[#FF3366]/80 transition-colors"
              >
                Resume
              </button>
            </div>
          </div>
        )}
      </div>
      
      <GameControls 
        score={score}
        highScore={highScore} 
        isPaused={isPaused} 
        onPause={handlePause}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default SnakeGame;
