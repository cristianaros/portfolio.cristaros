import React, { useEffect, useRef } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({ text, className = '', delay = 50 }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll('.char');
    chars?.forEach((char, i) => {
      (char as HTMLElement).style.animationDelay = `${i * delay}ms`;
    });
  }, [delay]);

  return (
    <span ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block opacity-0 animate-fade-in"
          style={{ animationDelay: `${i * delay}ms`, animationFillMode: 'forwards' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  from = '#89b4fa',
  to = '#cba6f7',
  className = '',
}) => (
  <span
    className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}
    style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
  >
    {children}
  </span>
);

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '', speed = 3 }) => (
  <span
    className={`relative inline-block bg-clip-text text-transparent ${className}`}
    style={{
      backgroundImage: 'linear-gradient(90deg, #cdd6f4 0%, #89b4fa 50%, #cdd6f4 100%)',
      backgroundSize: '200% 100%',
      animation: `shimmer ${speed}s ease-in-out infinite`,
    }}
  >
    {text}
    <style>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </span>
);

interface RotatingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

export const RotatingText: React.FC<RotatingTextProps> = ({ texts, className = '', interval = 2000 }) => {
  const [index, setIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className={`inline-block transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} ${className}`}>
      {texts[index]}
    </span>
  );
};

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 100 }) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-0"
          style={{
            animation: `blurIn 0.6s ease-out ${i * delay}ms forwards`,
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
      <style>{`
        @keyframes blurIn {
          from {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  );
};
