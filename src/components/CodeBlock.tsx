import React, { useEffect } from 'react';

interface LineProps {
  number: number;
  children: React.ReactNode;
}

const Line: React.FC<LineProps> = ({ number, children }) => (
  <div className="flex items-start hover:bg-white/[0.02] transition-colors">
    <span className="line-number shrink-0 py-0.5">{number}</span>
    <div className="flex-1 py-0.5 pr-4">{children}</div>
  </div>
);

const EmptyLine: React.FC<{ number: number }> = ({ number }) => (
  <Line number={number}><span>&nbsp;</span></Line>
);

const TechBadge: React.FC<{ icon: string; name: string; color: string }> = ({ icon, name, color }) => {
  const colorMap: Record<string, string> = {
    blue: 'badge-blue',
    green: 'badge-green',
    pink: 'badge-pink',
    yellow: 'badge-yellow',
    mauve: 'badge-mauve',
    peach: 'badge-peach',
    teal: 'badge-teal',
  };

  return (
    <span className={`badge ${colorMap[color] || 'badge-blue'}`}>
      <span>{icon}</span>
      {name}
    </span>
  );
};

function hasAnimated(): boolean {
  try { return sessionStorage.getItem('codeblock-animated') === 'true'; } catch { return false; }
}

export default function CodeBlock() {
  const startLine = 19;
  const alreadyAnimated = hasAnimated();

  useEffect(() => {
    if (!alreadyAnimated) {
      try { sessionStorage.setItem('codeblock-animated', 'true'); } catch {}
    }
  }, []);

  return (
    <div className={alreadyAnimated ? '' : 'animate-fade-in'}>
      {/* const stackTecnologico = { */}
      <Line number={startLine}>
        <span>
          <span className="syntax-keyword">const </span>
          <span className="syntax-variable">stackTecnologico</span>
          <span className="syntax-punctuation"> = {'{'}</span>
        </span>
      </Line>

      <EmptyLine number={startLine + 1} />

      {/* frontend: */}
      <Line number={startLine + 2}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">frontend:</span>
          <TechBadge icon="⚛️" name="React" color="blue" />
          <TechBadge icon="🚀" name="Astro" color="peach" />
          <TechBadge icon="🎨" name="Tailwind" color="teal" />
          <TechBadge icon="📘" name="TypeScript" color="blue" />
          <span className="syntax-comment">{'// Componentes robustos'}</span>
        </div>
      </Line>

      <EmptyLine number={startLine + 3} />

      {/* backend: */}
      <Line number={startLine + 4}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">backend:</span>
          <TechBadge icon="⚙️" name="C++" color="blue" />
          <TechBadge icon="🟣" name="Kotlin" color="mauve" />
          <TechBadge icon="🐘" name="PHP" color="mauve" />
          <TechBadge icon="🗄️" name="MySQL" color="yellow" />
        </div>
      </Line>

      <EmptyLine number={startLine + 5} />

      {/* mobile: */}
      <Line number={startLine + 6}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">mobile:</span>
          <TechBadge icon="💙" name="Flutter" color="blue" />
          <TechBadge icon="📱" name="React Native" color="teal" />
        </div>
      </Line>

      <EmptyLine number={startLine + 7} />

      {/* herramientas: */}
      <Line number={startLine + 8}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">herramientas:</span>
          <TechBadge icon="🐙" name="GitHub" color="mauve" />
          <TechBadge icon="📦" name="Git" color="peach" />
          <TechBadge icon="🐳" name="Docker" color="blue" />
          <TechBadge icon="💻" name="VS Code" color="blue" />
        </div>
      </Line>

      <EmptyLine number={startLine + 9} />

      {/* }; */}
      <Line number={startLine + 10}>
        <span className="syntax-punctuation">{'};'}</span>
      </Line>

      <EmptyLine number={startLine + 11} />
    </div>
  );
}
