import React, { useState, useEffect } from 'react';

interface TerminalLine {
  prompt?: string;
  command?: string;
  highlight?: string;
  output?: string;
  success?: boolean;
  link?: string;
}

const lines: TerminalLine[] = [
  {
    prompt: '~/portfolio',
    command: 'git checkout ',
    highlight: 'feature/nuevo-diseño',
  },
  {
    output: "Cambiado a rama 'feature/nuevo-diseño'",
  },
  {
    prompt: '~/portfolio',
    command: 'npm run dev',
  },
  {
    success: true,
    output: 'Listo en 24ms',
  },
  {
    output: 'LOCAL:',
    link: 'http://localhost:4321/',
  },
];

function hasAnimated(): boolean {
  try {
    return sessionStorage.getItem('terminal-animated') === 'true';
  } catch {
    return false;
  }
}

function markAnimated() {
  try {
    sessionStorage.setItem('terminal-animated', 'true');
  } catch {}
}

export default function Terminal() {
  const alreadyAnimated = hasAnimated();
  const [visibleLines, setVisibleLines] = useState(alreadyAnimated ? lines.length : 0);
  const [isVisible, setIsVisible] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio-settings');
      if (stored) {
        const settings = JSON.parse(stored);
        return settings.terminalVisible !== false;
      }
    } catch {}
    return true;
  });

  useEffect(() => {
    // Skip animation if already played this session
    if (alreadyAnimated) return;

    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= lines.length) {
          clearInterval(interval);
          markAnimated();
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Listen for settings changes
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.terminalVisible === 'boolean') {
        setIsVisible(detail.terminalVisible);
      }
    };
    window.addEventListener('portfolio-settings', handler);
    return () => window.removeEventListener('portfolio-settings', handler);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="border-t border-vscode-border bg-vscode-terminal mt-auto">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-vscode-border bg-vscode-tabs">
        <div className="flex items-center gap-3">
          <span className="text-[11px] tracking-wider uppercase text-vscode-textMuted font-semibold flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Terminal
          </span>
        </div>
        <div className="flex items-center gap-2 text-vscode-textMuted">
          <button className="hover:text-vscode-text transition-colors text-lg leading-none">+</button>
          <button className="hover:text-vscode-text transition-colors text-sm leading-none">⌃</button>
          <button className="hover:text-vscode-text transition-colors text-sm leading-none">×</button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-[13px] space-y-1 min-h-[120px]">
        {lines.slice(0, visibleLines).map((line, idx) => (
          <div
            key={idx}
            className={alreadyAnimated ? '' : 'animate-fade-in'}
            style={alreadyAnimated ? undefined : { animationDelay: `${idx * 100}ms` }}
          >
            {line.prompt ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-vscode-accent">→</span>
                <span className="text-vscode-green">{line.prompt}</span>
                <span className="text-vscode-text">{line.command}</span>
                {line.highlight && (
                  <span className="text-vscode-peach font-semibold">{line.highlight}</span>
                )}
              </div>
            ) : line.success ? (
              <div className="flex items-center gap-2">
                <span className="text-vscode-green">✔</span>
                <span className="text-vscode-text">{line.output}</span>
              </div>
            ) : line.link ? (
              <div className="flex items-center gap-2">
                <span className="text-vscode-textMuted">{line.output}</span>
                <a
                  href={line.link}
                  className="text-vscode-accent underline hover:text-vscode-accentAlt transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  {line.link}
                </a>
              </div>
            ) : (
              <div className="text-vscode-textSubtle pl-6">{line.output}</div>
            )}
          </div>
        ))}

        {/* Blinking cursor */}
        {visibleLines >= lines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-vscode-accent">→</span>
            <span className="text-vscode-green">~/portfolio</span>
            <span className="w-2 h-4 bg-vscode-text animate-cursor-blink"></span>
          </div>
        )}
      </div>
    </div>
  );
}
