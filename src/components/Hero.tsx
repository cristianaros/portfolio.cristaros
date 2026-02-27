import React, { useState, useEffect, useRef } from 'react';
import { BlurText, ShinyText } from './reactbits/TextAnimations';
import { AnimatedContent, Magnet } from './reactbits/Animations';

interface LineProps {
  number: number;
  children: React.ReactNode;
  className?: string;
}

const Line: React.FC<LineProps> = ({ number, children, className = '' }) => (
  <div className={`flex items-start hover:bg-white/[0.02] transition-colors ${className}`}>
    <span className="line-number shrink-0 py-0.5">{number}</span>
    <div className="flex-1 py-0.5 pr-4">{children}</div>
  </div>
);

const EmptyLine: React.FC<{ number: number }> = ({ number }) => (
  <Line number={number}><span>&nbsp;</span></Line>
);

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <EmptyLine number={1} />
      <EmptyLine number={2} />
      <EmptyLine number={3} />

      {/* Line 4: Comment */}
      <Line number={4}>
        <span className="syntax-comment">{'// Vista Previa del Componente'}</span>
      </Line>

      {/* Line 5: Greeting tag */}
      <Line number={5}>
        <AnimatedContent delay={200}>
          <span className="syntax-punctuation">{'<'}</span>
          <span className="syntax-tag">Greeting</span>
          <span className="syntax-attribute"> user</span>
          <span className="syntax-punctuation">{'="'}</span>
          <span className="syntax-string">Recruiter</span>
          <span className="syntax-punctuation">{'"'}</span>
          <span className="syntax-punctuation">{' />'}</span>
        </AnimatedContent>
      </Line>

      <EmptyLine number={6} />

      {/* Line 7: Title with BlurText animation */}
      <Line number={7} className="!items-center">
        <AnimatedContent delay={400}>
          <h1 className="text-4xl md:text-5xl font-bold text-vscode-text leading-tight py-2">
            <BlurText text="Hola, soy" delay={80} />
            {' '}
            <ShinyText text="Cristian" className="text-4xl md:text-5xl font-bold" speed={4} />
            {' '}👋
          </h1>
        </AnimatedContent>
      </Line>

      <EmptyLine number={8} />

      {/* Line 9: Description */}
      <Line number={9}>
        <AnimatedContent delay={700}>
          <p className="text-base md:text-lg text-vscode-textSubtle leading-relaxed max-w-2xl">
            Soy un <span className="text-vscode-accent font-semibold">Ingeniero Civil Informático</span> enfocado en construir
            aplicaciones web modernas, escalables y con arquitectura limpia.
            Busco crecer como <span className="text-vscode-green font-semibold">desarrollador full stack</span>, priorizando
            código limpio, buenas prácticas y diseño centrado en el usuario.
          </p>
        </AnimatedContent>
      </Line>

      <EmptyLine number={10} />
      <EmptyLine number={11} />
      <EmptyLine number={12} />

      {/* Line 13: Badges */}
      <Line number={13}>
        <AnimatedContent delay={200}>
          <div className="flex flex-wrap gap-2 py-1">
            <span className="badge badge-mauve">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              UI/UX Design
            </span>
            <span className="badge badge-green">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Performance
            </span>
          </div>
        </AnimatedContent>
      </Line>

      <EmptyLine number={14} />
      <EmptyLine number={15} />

      {/* Line 16: Buttons */}
      <Line number={16}>
        <AnimatedContent delay={200}>
          <div className="flex flex-wrap gap-3 py-2">
            <Magnet strength={0.15}>
              <a
                href="/cv.pdf"
                download="Cristian_Aros_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-vscode-accent text-vscode-bg font-semibold text-sm rounded-md hover:bg-vscode-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-vscode-accent/25 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Descargar CV
              </a>
            </Magnet>
            <Magnet strength={0.15}>
              <a
                href="mailto:contacto@cristianaros.dev"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-vscode-textSubtle font-semibold text-sm rounded-md border border-vscode-surface1 hover:border-vscode-accent hover:text-vscode-accent transition-all duration-200 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Contactar
              </a>
            </Magnet>
          </div>
        </AnimatedContent>
      </Line>

      <EmptyLine number={17} />
      <EmptyLine number={18} />
    </div>
  );
}
