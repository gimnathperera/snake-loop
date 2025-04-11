
export type Direction = { x: number; y: number };
export type Position = { x: number; y: number };

// Game constants
export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [{ x: 10, y: 10 }];
export const INITIAL_DIRECTION = { x: 1, y: 0 }; // Start moving right
export const INITIAL_FOOD = { x: 5, y: 5 };
export const GAME_SPEED = 200; // ms
