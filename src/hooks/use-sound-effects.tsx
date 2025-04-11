import { useRef, useEffect } from 'react';

interface SoundEffects {
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playEatFood: () => void;
  playGameOver: () => void;
  playPause: () => void;
  playRestart: () => void;
  playGameStart: () => void;
}

export const useSoundEffects = (): SoundEffects => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const eatFoodRef = useRef<HTMLAudioElement | null>(null);
  const gameOverRef = useRef<HTMLAudioElement | null>(null);
  const pauseRef = useRef<HTMLAudioElement | null>(null);
  const restartRef = useRef<HTMLAudioElement | null>(null);
  const gameStartRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements
    backgroundMusicRef.current = new Audio('/audio/background.mp3');
    eatFoodRef.current = new Audio('/audio/eat.mp3');
    gameOverRef.current = new Audio('/audio/gameover.mp3');
    pauseRef.current = new Audio('/audio/pause.mp3');
    restartRef.current = new Audio('/audio/restart.mp3');
    gameStartRef.current = new Audio('/audio/start.mp3');

    // Configure background music
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.3;
    }

    return () => {
      // Cleanup
      backgroundMusicRef.current?.pause();
    };
  }, []);

  const playBackgroundMusic = () => {
    backgroundMusicRef.current?.play();
  };

  const stopBackgroundMusic = () => {
    backgroundMusicRef.current?.pause();
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.currentTime = 0;
    }
  };

  const playEatFood = () => {
    if (eatFoodRef.current) {
      eatFoodRef.current.currentTime = 0; // Reset the sound
      eatFoodRef.current.play().catch(error => console.log('Error playing eat sound:', error));
    }
  };

  const playGameOver = () => {
    if (gameOverRef.current) {
      gameOverRef.current.currentTime = 0; // Reset the sound
      stopBackgroundMusic();
      gameOverRef.current.play().catch(error => console.log('Error playing game over sound:', error));
    }
  };

  const playPause = () => {
    pauseRef.current?.play();
  };

  const playRestart = () => {
    restartRef.current?.play();
  };

  const playGameStart = () => {
    gameStartRef.current?.play();
    playBackgroundMusic();
  };

  return {
    playBackgroundMusic,
    stopBackgroundMusic,
    playEatFood,
    playGameOver,
    playPause,
    playRestart,
    playGameStart,
  };
};