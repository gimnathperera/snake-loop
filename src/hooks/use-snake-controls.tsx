
import { useEffect } from "react";
import { Direction } from "@/types/snake-game";

interface UseSnakeControlsProps {
  gameOver: boolean;
  directionRef: React.MutableRefObject<Direction>;
  setDirection: (direction: Direction) => void;
  togglePause: () => void;
  resetGame: () => void;
  onPause?: () => void;
}

export const useSnakeControls = ({
  gameOver,
  directionRef,
  setDirection,
  togglePause,
  resetGame
}: UseSnakeControlsProps) => {
  // Handle key presses for movement
  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameOver) return;
    
    const currentDirection = directionRef.current;
    
    // Process arrow keys - prevent 180 degree turns
    switch (e.key) {
      case "ArrowUp":
        if (currentDirection.y !== 1) { // Not going down
          setDirection({ x: 0, y: -1 });
        }
        break;
      case "ArrowDown":
        if (currentDirection.y !== -1) { // Not going up
          setDirection({ x: 0, y: 1 });
        }
        break;
      case "ArrowLeft":
        if (currentDirection.x !== 1) { // Not going right
          setDirection({ x: -1, y: 0 });
        }
        break;
      case "ArrowRight":
        if (currentDirection.x !== -1) { // Not going left
          setDirection({ x: 1, y: 0 });
        }
        break;
      case " ": // Spacebar
        togglePause();
        break;
      case "r":
      case "R":
        resetGame();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver]); // Only re-add listener if gameOver changes
};
