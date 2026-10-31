import React, { useEffect } from 'react';
import { useLocale } from '../i18n';
import {
  siAstro,
  siDocker,
  siFlutter,
  siGit,
  siGithub,
  siGo,
  siKotlin,
  siMysql,
  siNestjs,
  siNextdotjs,
  siPhp,
  siPostgresql,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

type BrandIcon = Pick<SimpleIcon, 'path' | 'hex' | 'title'> & { viewBox?: string };

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

const vscodeIcon = {
  title: 'Visual Studio Code',
  hex: '007ACC',
  viewBox: '0 0 128 128',
  path: 'M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z',
};

const TechBadge: React.FC<{ icon: BrandIcon; name: string; color: string }> = ({ icon, name, color }) => {
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
      <svg
        aria-hidden="true"
        className="w-4 h-4 shrink-0"
        viewBox={icon.viewBox ?? '0 0 24 24'}
        fill={`#${icon.hex}`}
        focusable="false"
      >
        <path d={icon.path} />
      </svg>
      {name}
    </span>
  );
};

function hasAnimated(): boolean {
  try { return sessionStorage.getItem('codeblock-animated') === 'true'; } catch { return false; }
}

export default function CodeBlock() {
  const locale = useLocale();
  const startLine = 10;
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
          <span className="syntax-variable">{locale === 'en' ? 'techStack' : 'stackTecnologico'}</span>
          <span className="syntax-punctuation"> = {'{'}</span>
        </span>
      </Line>

      <EmptyLine number={startLine + 1} />

      {/* stack de este portfolio: */}
      <Line number={startLine + 2}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">portfolio:</span>
          <TechBadge icon={siReact} name="React" color="blue" />
          <TechBadge icon={siAstro} name="Astro" color="peach" />
          <TechBadge icon={siTailwindcss} name="Tailwind CSS" color="teal" />
          <TechBadge icon={siTypescript} name="TypeScript" color="blue" />
          <span className="syntax-comment">{locale === 'en' ? '// Built with these technologies' : '// Stack utilizado en este sitio'}</span>
        </div>
      </Line>

      <EmptyLine number={startLine + 3} />

      {/* backend: */}
      <Line number={startLine + 4}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">backend:</span>
          <TechBadge icon={siGo} name="Go" color="teal" />
          <TechBadge icon={siNextdotjs} name="Next.js" color="blue" />
          <TechBadge icon={siNestjs} name="NestJS" color="pink" />
          <TechBadge icon={siPrisma} name="Prisma" color="teal" />
          <TechBadge icon={siKotlin} name="Kotlin" color="mauve" />
          <TechBadge icon={siPhp} name="PHP" color="mauve" />
          <TechBadge icon={siMysql} name="MySQL" color="yellow" />
          <TechBadge icon={siPostgresql} name="PostgreSQL" color="blue" />
        </div>
      </Line>

      <EmptyLine number={startLine + 5} />

      {/* mobile: */}
      <Line number={startLine + 6}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">mobile:</span>
          <TechBadge icon={siFlutter} name="Flutter" color="blue" />
          <TechBadge icon={siReact} name="React Native" color="teal" />
        </div>
      </Line>

      <EmptyLine number={startLine + 7} />

      {/* herramientas: */}
      <Line number={startLine + 8}>
        <div className="flex items-center flex-wrap gap-2 ml-8">
          <span className="syntax-attribute">{locale === 'en' ? 'tools:' : 'herramientas:'}</span>
          <TechBadge icon={siGithub} name="GitHub" color="mauve" />
          <TechBadge icon={siGit} name="Git" color="peach" />
          <TechBadge icon={siDocker} name="Docker" color="blue" />
          <TechBadge icon={vscodeIcon} name="VS Code" color="blue" />
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
