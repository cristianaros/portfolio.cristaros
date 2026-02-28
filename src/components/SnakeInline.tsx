import React, { useState, useEffect, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 14;
const INITIAL_SPEED = 140;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 60;
const INITIAL_LENGTH = 4;

const NOKIA_GREEN = '#43523d';
const NOKIA_BG = '#9bbc0f';
const NOKIA_DARK = '#0f380f';
const NOKIA_LIGHT = '#8bac0f';

function createInitialSnake(): Point[] {
  const startX = Math.floor(GRID_SIZE / 2) - INITIAL_LENGTH;
  const startY = Math.floor(GRID_SIZE / 2);
  const snake: Point[] = [];
  for (let i = 0; i < INITIAL_LENGTH; i++) {
    snake.push({ x: startX + (INITIAL_LENGTH - 1 - i), y: startY });
  }
  return snake;
}

function spawnFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

function drawGame(
  canvas: HTMLCanvasElement,
  snake: Point[],
  food: Point
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = GRID_SIZE * CELL_SIZE;
  const H = GRID_SIZE * CELL_SIZE;

  // Background
  ctx.fillStyle = NOKIA_BG;
  ctx.fillRect(0, 0, W, H);

  // Grid dots
  ctx.fillStyle = NOKIA_LIGHT;
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, 1, 1);
    }
  }

  // Food
  ctx.fillStyle = NOKIA_DARK;
  ctx.fillRect(food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);

  // Snake
  snake.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? NOKIA_DARK : NOKIA_GREEN;
    ctx.fillRect(seg.x * CELL_SIZE + 1, seg.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
  });
}

export default function SnakeInline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('snake-high-score');
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  });

  // All mutable game state in a single ref to avoid stale closures
  const gameRef = useRef({
    snake: createInitialSnake(),
    food: { x: 15, y: 10 } as Point,
    direction: 'RIGHT' as Direction,
    nextDirection: 'RIGHT' as Direction,
    speed: INITIAL_SPEED,
    score: 0,
    loopId: null as number | null,
    state: 'menu' as 'menu' | 'playing' | 'gameover',
  });

  // Draw on mount
  useEffect(() => {
    const g = gameRef.current;
    g.snake = createInitialSnake();
    g.food = spawnFood(g.snake);
    if (canvasRef.current) drawGame(canvasRef.current, g.snake, g.food);
  }, []);

  const stopLoop = () => {
    if (gameRef.current.loopId !== null) {
      clearInterval(gameRef.current.loopId);
      gameRef.current.loopId = null;
    }
  };

  const doGameOver = () => {
    const g = gameRef.current;
    stopLoop();
    g.state = 'gameover';
    setGameState('gameover');
    if (g.score > (parseInt(localStorage.getItem('snake-high-score') || '0', 10))) {
      localStorage.setItem('snake-high-score', String(g.score));
      setHighScore(g.score);
    }
  };

  const tick = () => {
    const g = gameRef.current;
    if (g.state !== 'playing') return;

    const snake = [...g.snake];
    const head = { ...snake[0] };
    g.direction = g.nextDirection;

    switch (g.direction) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      doGameOver(); return;
    }
    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      doGameOver(); return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === g.food.x && head.y === g.food.y) {
      g.score += 10;
      setScore(g.score);
      g.food = spawnFood(snake);
      g.speed = Math.max(MIN_SPEED, g.speed - SPEED_INCREMENT);
      // Restart interval with new speed
      stopLoop();
      g.loopId = window.setInterval(tick, g.speed);
    } else {
      snake.pop();
    }

    g.snake = snake;
    if (canvasRef.current) drawGame(canvasRef.current, g.snake, g.food);
  };

  const startGame = () => {
    const g = gameRef.current;
    stopLoop();
    g.snake = createInitialSnake();
    g.food = spawnFood(g.snake);
    g.direction = 'RIGHT';
    g.nextDirection = 'RIGHT';
    g.speed = INITIAL_SPEED;
    g.score = 0;
    g.state = 'playing';
    setScore(0);
    setGameState('playing');
    if (canvasRef.current) drawGame(canvasRef.current, g.snake, g.food);
    g.loopId = window.setInterval(tick, g.speed);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (g.state === 'menu' || g.state === 'gameover') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startGame();
        }
        return;
      }
      const dir = g.direction;
      switch (e.key) {
        case 'ArrowUp': case 'w': e.preventDefault(); if (dir !== 'DOWN') g.nextDirection = 'UP'; break;
        case 'ArrowDown': case 's': e.preventDefault(); if (dir !== 'UP') g.nextDirection = 'DOWN'; break;
        case 'ArrowLeft': case 'a': e.preventDefault(); if (dir !== 'RIGHT') g.nextDirection = 'LEFT'; break;
        case 'ArrowRight': case 'd': e.preventDefault(); if (dir !== 'LEFT') g.nextDirection = 'RIGHT'; break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      stopLoop();
    };
  }, []);

  const changeDir = (dir: Direction) => {
    const g = gameRef.current;
    if (g.state !== 'playing') return;
    const cur = g.direction;
    if (dir === 'UP' && cur !== 'DOWN') g.nextDirection = 'UP';
    if (dir === 'DOWN' && cur !== 'UP') g.nextDirection = 'DOWN';
    if (dir === 'LEFT' && cur !== 'RIGHT') g.nextDirection = 'LEFT';
    if (dir === 'RIGHT' && cur !== 'LEFT') g.nextDirection = 'RIGHT';
  };

  return (
    <div className="flex items-center justify-center h-full w-full overflow-auto py-6">
      {/* Nokia Phone Frame */}
      <div className="bg-[#2c2c3a] rounded-[2rem] p-6 shadow-2xl border border-[#45475a]" style={{ minWidth: '340px' }}>
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
          <div className="relative">
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
                className="absolute inset-0 rounded flex flex-col items-center justify-center cursor-pointer"
                style={{ backgroundColor: `${NOKIA_BG}ee` }}
                onClick={startGame}
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
                  Clic o ENTER para jugar
                </div>
              </div>
            )}
          </div>
        </div>

        {/* D-Pad */}
        <div className="flex flex-col items-center mt-4 gap-1">
          <div className="flex gap-1">
            <div className="w-10 h-10" />
            <button
              aria-label="Arriba"
              onMouseDown={() => changeDir('UP')}
              className="w-10 h-10 rounded-t-lg bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[#cdd6f4] transition-colors"
            >▲</button>
            <div className="w-10 h-10" />
          </div>
          <div className="flex gap-1">
            <button
              aria-label="Izquierda"
              onMouseDown={() => changeDir('LEFT')}
              className="w-10 h-10 rounded-l-lg bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[#cdd6f4] transition-colors"
            >◄</button>
            <div className="w-10 h-10 rounded bg-[#313244] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#45475a]" />
            </div>
            <button
              aria-label="Derecha"
              onMouseDown={() => changeDir('RIGHT')}
              className="w-10 h-10 rounded-r-lg bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[#cdd6f4] transition-colors"
            >►</button>
          </div>
          <div className="flex gap-1">
            <div className="w-10 h-10" />
            <button
              aria-label="Abajo"
              onMouseDown={() => changeDir('DOWN')}
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
            aria-label="Botón B"
            className="w-10 h-10 rounded-full bg-[#45475a] hover:bg-[#585b70] active:bg-[#313244] flex items-center justify-center text-[10px] text-[#cdd6f4] font-bold transition-colors"
          >B</button>
        </div>

        {/* Controls hint */}
        <div className="text-center mt-3 text-[10px] text-[#6c7086]">
          WASD / Flechas · ENTER o Clic para jugar
        </div>
      </div>
    </div>
  );
}
