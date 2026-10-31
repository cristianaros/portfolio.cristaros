import React, { useState, useEffect } from 'react';
import { BlurText, ShinyText } from './reactbits/TextAnimations';
import { AnimatedContent } from './reactbits/Animations';
import { useLocale } from '../i18n';

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

function hasAnimated(): boolean {
  try { return sessionStorage.getItem('hero-animated') === 'true'; } catch { return false; }
}

export default function Hero() {
  const locale = useLocale();
  const alreadyAnimated = hasAnimated();
  const [isVisible, setIsVisible] = useState(alreadyAnimated);

  useEffect(() => {
    if (!alreadyAnimated) {
      try { sessionStorage.setItem('hero-animated', 'true'); } catch {}
      setIsVisible(true);
    }
  }, []);

  // Wrapper: skip AnimatedContent delays if already animated
  const Wrap: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
    if (alreadyAnimated) return <>{children}</>;
    return <AnimatedContent delay={delay}>{children}</AnimatedContent>;
  };

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Line 1: Comment */}
      <Line number={1}>
        <span className="syntax-comment">{locale === 'en' ? '// Component preview' : '// Vista Previa del Componente'}</span>
      </Line>

      {/* Line 2: Greeting tag */}
      <Line number={2}>
        <Wrap delay={200}>
          <span className="syntax-punctuation">{'<'}</span>
          <span className="syntax-tag">Greeting</span>
          <span className="syntax-attribute"> user</span>
          <span className="syntax-punctuation">{'="'}</span>
          <span className="syntax-string">{locale === 'en' ? 'Recruiter' : 'Reclutador'}</span>
          <span className="syntax-punctuation">{'"'}</span>
          <span className="syntax-punctuation">{' />'}</span>
        </Wrap>
      </Line>

      <EmptyLine number={3} />

      {/* Line 4: Title with BlurText animation */}
      <Line number={4} className="!items-center">
        <Wrap delay={400}>
          <h1 className="text-4xl md:text-5xl font-bold text-vscode-text leading-tight py-2">
            {alreadyAnimated ? (
              <span>{locale === 'en' ? "Hi, I'm" : 'Hola, soy'}</span>
            ) : (
              <BlurText text={locale === 'en' ? "Hi, I'm" : 'Hola, soy'} delay={80} />
            )}
            {' '}
            <ShinyText text="Cristian Aros" className="text-4xl md:text-5xl font-bold" speed={4} />
          </h1>
        </Wrap>
      </Line>

      <EmptyLine number={5} />

      {/* Line 6: Description */}
      <Line number={6}>
        <Wrap delay={700}>
          <p className="text-base md:text-lg text-vscode-textSubtle leading-relaxed max-w-2xl">
            {locale === 'en' ? <>
              I am a <span className="text-vscode-accent font-semibold">Computer Engineering professional</span> focused on building modern, scalable web applications. My experience in <span className="text-vscode-green font-semibold">full-stack development</span> spans web architecture, dynamic interfaces with React, TypeScript, HTML, and CSS, backend services with Node.js, and cloud solutions using Amazon Web Services (AWS).
            </> : <>
              Soy un <span className="text-vscode-accent font-semibold">Ingeniero Civil Informático</span> enfocado en construir aplicaciones web modernas y escalables. Mi experiencia en <span className="text-vscode-green font-semibold">desarrollo full stack</span> abarca la arquitectura web, las interfaces dinámicas con React, TypeScript, HTML y CSS, los servicios backend con Node.js y las soluciones en la nube con Amazon Web Services (AWS).
            </>}
          </p>
        </Wrap>
      </Line>

      <EmptyLine number={7} />

      {/* Line 8: Buttons */}
      <Line number={8}>
          <div className="flex flex-wrap gap-3 py-2">
              <a
                href="/cv.pdf"
                download="CristianAros_CV_DesarrolladorSoftwareJunior.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-vscode-accent text-vscode-bg font-semibold text-sm rounded-md hover:bg-vscode-accent/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-text"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                {locale === 'en' ? 'Download CV' : 'Descargar CV'}
              </a>
              <a
                href="mailto:cristian.aros2001@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-vscode-textSubtle font-semibold text-sm rounded-md border border-vscode-surface1 hover:border-vscode-accent hover:text-vscode-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {locale === 'en' ? 'Contact me' : 'Contactar'}
              </a>
              <a
                href="https://www.linkedin.com/in/cristian-aros-019671299/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Cristian Aros (se abre en una pestaña nueva)"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-vscode-textSubtle font-semibold text-sm rounded-md border border-vscode-surface1 hover:border-vscode-accent hover:text-vscode-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.852 0-2.135 1.445-2.135 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/cristianaros"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Cristian Aros (se abre en una pestaña nueva)"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-vscode-textSubtle font-semibold text-sm rounded-md border border-vscode-surface1 hover:border-vscode-accent hover:text-vscode-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
              >
                <svg aria-hidden="true" className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576A12 12 0 0 0 12 0z" />
                </svg>
                GitHub
              </a>
          </div>
      </Line>

      <EmptyLine number={9} />
    </div>
  );
}
