
import { Position } from "@/types/snake-game";

// Check if position is on snake
export const isPositionOnSnake = (position: Position, snake: Position[]): boolean => {
  return snake.some(segment => segment.x === position.x && segment.y === position.y);
};

// Generate random position
export const generateRandomPosition = (gridSize: number): Position => {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  };
};

// Check for collision with walls or self
export const checkCollision = (
  head: Position, 
  snake: Position[], 
  gridSize: number
): boolean => {
  // Wall collision
  if (
    head.x < 0 || 
    head.x >= gridSize || 
    head.y < 0 || 
    head.y >= gridSize
  ) {
    return true;
  }
  
  // Self collision (skip the head itself)
  return snake.some((segment, index) => 
    index > 0 && segment.x === head.x && segment.y === head.y
  );
};
