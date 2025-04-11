
import { useEffect } from "react";
import { GAME_SPEED } from "@/types/snake-game";

interface UseGameLoopProps {
  gameOver: boolean;
  isPaused: boolean;
  updateGame: () => void;
  gameIntervalRef: React.MutableRefObject<number | null>;
  isGameStarted: boolean;
  onEatFood?: () => void;
  onGameOver?: () => void;
}

export const useGameLoop = ({
  gameOver,
  isPaused,
  isGameStarted,
  updateGame,
  gameIntervalRef,
  onEatFood,
  onGameOver,
}: UseGameLoopProps) => {
  useEffect(() => {
    if (gameOver || isPaused || !isGameStarted) { // Add isGameStarted check
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = null;
      }
      return;
    }

    gameIntervalRef.current = window.setInterval(() => {
      updateGame();
    }, GAME_SPEED);
    
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
    };
  }, [gameOver, isPaused, isGameStarted, updateGame, gameIntervalRef]);
};
