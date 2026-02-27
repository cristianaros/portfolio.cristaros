import React, { useState, useEffect } from 'react';
import SettingsPanel from './SettingsPanel';
import SnakeGame from './SnakeGame';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function ActivityBarWidgets() {
  const [showSnake, setShowSnake] = useState(false);

  // Konami code listener
  useEffect(() => {
    let index = 0;
    const handleKey = (e: KeyboardEvent) => {
      const expected = KONAMI_CODE[index];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        index++;
        if (index === KONAMI_CODE.length) {
          setShowSnake(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <SettingsPanel />
      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
    </>
  );
}
