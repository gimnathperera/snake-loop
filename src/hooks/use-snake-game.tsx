import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { 
  Direction, 
  Position, 
  GRID_SIZE,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  INITIAL_FOOD,
  GAME_SPEED
} from "@/types/snake-game";
import { checkCollision, generateRandomPosition, isPositionOnSnake } from "@/utils/snake-game-utils";

interface UseSnakeGameProps {
  onEatFood?: () => void;
  onGameOver?: () => void;
}

export const useSnakeGame = ({ onEatFood, onGameOver }: UseSnakeGameProps = {}) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useLocalStorage<number>("snake-high-score", 0);
  const [hasShownHighScoreToast, setHasShownHighScoreToast] = useState(false);


  const gameIntervalRef = useRef<number | null>(null);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const shouldGrowRef = useRef<boolean>(false);
  const { toast } = useToast();

  // Update direction ref whenever direction state changes
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Generate food at random position (not on snake)
  const generateNewFood = (currentSnake: Position[]): void => {
    let newFood: Position;
    let foodOnSnake = true;
    
    // Keep generating until we find a position not on the snake
    while (foodOnSnake) {
      newFood = generateRandomPosition(GRID_SIZE);
      
      foodOnSnake = isPositionOnSnake(newFood, currentSnake);
      
      if (!foodOnSnake) {
        setFood(newFood);
        return;
      }
    }
  };

  // Update game state
  const updateGame = () => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;
      
      if (checkCollision(head, newSnake, GRID_SIZE)) {
        handleGameOver();
        return prevSnake;
      }
      
      newSnake.unshift(head);
      
      if (head.x === food.x && head.y === food.y) {
        // Play eat sound
        onEatFood?.();
        
        setScore(prevScore => {
          const newScore = prevScore + 1;
          // Check for high score
          if (newScore > highScore && !hasShownHighScoreToast) {
            setHighScore(newScore);
            setHasShownHighScoreToast(true);
            toast({
              title: "New High Score!",
              description: `You've reached ${newScore} points!`,
            });
          }
          return newScore;
        });
        
        // Generate new food
        generateNewFood(newSnake);
        
        // Snake should grow (don't remove tail)
        shouldGrowRef.current = true;
      } else if (!shouldGrowRef.current) {
        // Remove the tail if we're not growing
        newSnake.pop();
      } else {
        // Reset the growth flag after growing once
        shouldGrowRef.current = false;
      }
      
      return newSnake;
    });
  };

  const handleGameOver = () => {
    setGameOver(true);
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
    
    // Play game over sound
    onGameOver?.();
    
    if (score > highScore) {
      setHighScore(score);
    }
  };

  // Reset the game to initial state
  const resetGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
    
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(INITIAL_FOOD);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    shouldGrowRef.current = false;
    setHasShownHighScoreToast(false);
  };

  // Toggle pause state
  const togglePause = () => {
    setIsPaused(!isPaused);
  };


  return {
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
  };
};
