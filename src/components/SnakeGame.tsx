import React, { useState, useEffect, useCallback, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 14;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 60;

const NOKIA_GREEN = '#43523d';
const NOKIA_BG = '#9bbc0f';
const NOKIA_DARK = '#0f380f';
const NOKIA_LIGHT = '#8bac0f';

export default function SnakeGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const directionRef = useRef<Direction>('RIGHT');
  const nextDirectionRef = useRef<Direction>('RIGHT');
  const foodRef = useRef<Point>({ x: 15, y: 10 });
  const speedRef = useRef(INITIAL_SPEED);
  const gameLoopRef = useRef<number | null>(null);
  const scoreRef = useRef(0);

  useEffect(() => {
    const stored = localStorage.getItem('snake-high-score');
    if (stored) setHighScore(parseInt(stored, 10));
  }, []);

  const spawnFood = useCallback(() => {
    let food: Point;
    do {
      food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeRef.current.some((s) => s.x === food.x && s.y === food.y));
    foodRef.current = food;
  }, []);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = GRID_SIZE * CELL_SIZE;
    const H = GRID_SIZE * CELL_SIZE;

    // Background
    ctx.fillStyle = NOKIA_BG;
    ctx.fillRect(0, 0, W, H);

    // Grid dots (subtle)
    ctx.fillStyle = NOKIA_LIGHT;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, 1, 1);
      }
    }

    // Food
    const food = foodRef.current;
    ctx.fillStyle = NOKIA_DARK;
    ctx.fillRect(
      food.x * CELL_SIZE + 2,
      food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? NOKIA_DARK : NOKIA_GREEN;
      ctx.fillRect(
        seg.x * CELL_SIZE + 1,
        seg.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });
  }, []);

  const gameOver = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    const finalScore = scoreRef.current;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('snake-high-score', String(finalScore));
    }
    setGameState('gameover');
  }, [highScore]);

  const tick = useCallback(() => {
    const snake = [...snakeRef.current];
    const head = { ...snake[0] };
    directionRef.current = nextDirectionRef.current;

    switch (directionRef.current) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      gameOver();
      return;
    }

    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      gameOver();
      return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      spawnFood();
      // Speed up
      speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = window.setInterval(tick, speedRef.current);
      }
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
    drawGame();
  }, [drawGame, gameOver, spawnFood]);

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = 'RIGHT';
    nextDirectionRef.current = 'RIGHT';
    speedRef.current = INITIAL_SPEED;
    scoreRef.current = 0;
    setScore(0);
    spawnFood();
    setGameState('playing');
    drawGame();
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = window.setInterval(tick, speedRef.current);
  }, [tick, spawnFood, drawGame]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (gameState === 'menu' || gameState === 'gameover') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startGame();
        }
        return;
      }

      const dir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          e.preventDefault();
          if (dir !== 'DOWN') nextDirectionRef.current = 'UP';
          break;
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          if (dir !== 'UP') nextDirectionRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
          e.preventDefault();
          if (dir !== 'RIGHT') nextDirectionRef.current = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
          e.preventDefault();
          if (dir !== 'LEFT') nextDirectionRef.current = 'RIGHT';
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, startGame, onClose]);

  useEffect(() => {
    if (gameState === 'menu') drawGame();
  }, [gameState, drawGame]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      {/* Nokia Phone Frame */}
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        {/* Phone Body */}
        <div className="bg-[#2c2c3a] rounded-[2rem] p-6 shadow-2xl border border-[#45475a]"
          style={{ minWidth: '360px' }}
        >
          {/* Brand */}
          <div className="text-center mb-3">
            <span className="text-[13px] tracking-[0.3em] uppercase text-[#6c7086] font-bold">PORTFOLIO</span>
          </div>

          {/* Screen */}
          <div className="bg-[#9bbc0f] rounded-lg p-3 border-4 border-[#1a1a2e] shadow-inner">
            {/* Screen Header */}
            <div className="flex items-center justify-between mb-2 px-1">
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: NOKIA_DARK, fontWeight: 'bold' }}>
                SNAKE
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: NOKIA_DARK }}>
                {String(score).padStart(4, '0')}
              </span>
            </div>

            {/* Game Canvas */}
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="rounded border-2 border-[#0f380f] mx-auto block"
              style={{ imageRendering: 'pixelated' }}
            />

            {/* Menu / Game Over overlay */}
            {gameState !== 'playing' && (
              <div
                className="absolute rounded-lg flex flex-col items-center justify-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: GRID_SIZE * CELL_SIZE - 20,
                  backgroundColor: `${NOKIA_BG}ee`,
                  padding: '20px',
                  zIndex: 10,
                }}
              >
                <div style={{ fontFamily: 'monospace', fontSize: '16px', color: NOKIA_DARK, fontWeight: 'bold', marginBottom: '8px' }}>
                  {gameState === 'menu' ? '🐍 SNAKE' : 'GAME OVER'}
                </div>
                {gameState === 'gameover' && (
                  <div style={{ fontFamily: 'monospace', fontSize: '12px', color: NOKIA_GREEN, marginBottom: '4px' }}>
                    Score: {score}
                  </div>
                )}
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: NOKIA_GREEN, marginBottom: '4px' }}>
                  High: {Math.max(highScore, score)}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '10px', color: NOKIA_DARK, marginTop: '8px' }}>
                  [ENTER] para jugar
                </div>
              </div>
            )}
          </div>

          {/* D-Pad */}
          <div className="flex flex-col items-center mt-4 gap-1">
            <div className="flex gap-1">
              <div className="w-10 h-10" />
              <button
                aria-label="Arriba"
                onMouseDown={() => { if (directionRef.current !== 'DOWN') nextDirectionRef.current = 'UP'; }}
                className="w-10 h-10 rounded-t-lg bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[#cdd6f4] transition-colors"
              >▲</button>
              <div className="w-10 h-10" />
            </div>
            <div className="flex gap-1">
              <button
                aria-label="Izquierda"
                onMouseDown={() => { if (directionRef.current !== 'RIGHT') nextDirectionRef.current = 'LEFT'; }}
                className="w-10 h-10 rounded-l-lg bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[#cdd6f4] transition-colors"
              >◄</button>
              <div className="w-10 h-10 rounded bg-[#313244] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#45475a]" />
              </div>
              <button
                aria-label="Derecha"
                onMouseDown={() => { if (directionRef.current !== 'LEFT') nextDirectionRef.current = 'RIGHT'; }}
                className="w-10 h-10 rounded-r-lg bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[#cdd6f4] transition-colors"
              >►</button>
            </div>
            <div className="flex gap-1">
              <div className="w-10 h-10" />
              <button
                aria-label="Abajo"
                onMouseDown={() => { if (directionRef.current !== 'UP') nextDirectionRef.current = 'DOWN'; }}
                className="w-10 h-10 rounded-b-lg bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[#cdd6f4] transition-colors"
              >▼</button>
              <div className="w-10 h-10" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-8 mt-3">
            <button
              aria-label="Botón A (Iniciar)"
              onClick={startGame}
              className="w-10 h-10 rounded-full bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[10px] text-[#cdd6f4] font-bold transition-colors"
            >A</button>
            <button
              aria-label="Botón B (Cancelar/Salir)"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[10px] text-[#cdd6f4] font-bold transition-colors"
            >B</button>
          </div>

          {/* Controls hint */}
          <div className="text-center mt-3 text-[10px] text-[#6c7086]">
            WASD / Flechas · ESC para salir
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
