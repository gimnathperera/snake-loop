
import React from "react";

type Position = { x: number; y: number };

interface GameBoardProps {
  gridSize: number;
  snake: Position[];
  food: Position;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gridSize, snake, food }) => {
  // Create a grid of cells
  const renderGrid = () => {
    const cells = [];
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Determine cell type
        const isSnakeHead = snake[0].x === x && snake[0].y === y;
        const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        
        // Set cell class based on content
        let cellClass = "bg-[#0A0E23]/70 border border-[#33CCFF]/10";
        
        if (isSnakeHead) {
          cellClass = "bg-[#39FF14] border border-[#39FF14]/50 rounded-sm"; // Snake head
        } else if (isSnakeBody) {
          cellClass = "bg-[#39FF14]/80 border border-[#39FF14]/30"; // Snake body
        } else if (isFood) {
          cellClass = "bg-[#FF3366] border border-[#FF3366]/50 rounded-full"; // Food
        }
        
        cells.push(
          <div 
            key={`${x}-${y}`} 
            className={`${cellClass}`}
            style={{
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
              position: "absolute",
              left: `${(x / gridSize) * 100}%`,
              top: `${(y / gridSize) * 100}%`,
              transition: isSnakeHead ? "none" : "all 0.1s ease",
            }}
          />
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="relative w-full h-full bg-[#0A0E23]">
      {renderGrid()}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-10 pointer-events-none">
        {Array.from({ length: gridSize * gridSize }).map((_, i) => (
          <div key={i} className="border border-[#33CCFF]/5" />
        ))}
      </div>
    </div>
  );
};
