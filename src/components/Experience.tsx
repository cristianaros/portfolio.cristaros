import type { Locale } from '../i18n';

interface ExperienceEntry {
  period: { es: string; en: string };
  organization: string;
  organizationUrl?: string;
  organizationLinkLabel?: { es: string; en: string };
  role: { es: string; en: string };
  description: { es: string; en: string };
  areas?: { es: string[]; en: string[] };
  featuredProject?: {
    title: string;
    category: string;
    description: { es: string; en: string };
    areas: { es: string[]; en: string[] };
    url: string;
  };
}

const entries: ExperienceEntry[] = [
  {
    period: { es: 'Julio 2026 – Vigente', en: 'July 2026 – Present' },
    organization: 'QuantSoft (QUANTUM SOFTWARE SYSTEMS SPA)',
    role: { es: 'Desarrollo de software', en: 'Software development' },
    description: {
      es: 'Trabajo en el diseño y desarrollo de soluciones de software en estas áreas:',
      en: 'I work on the design and development of software solutions in these areas:',
    },
    areas: {
      es: [
        'Protocolo de contexto modelo (MCP)',
        'Diseño de software',
        'Infraestructura de software',
        'Ingeniería web',
        'Desarrollo de API',
        'Redes neuronales',
        'Amazon Web Services (AWS)',
      ],
      en: [
        'Model Context Protocol (MCP)',
        'Software design',
        'Software infrastructure',
        'Web engineering',
        'API development',
        'Neural networks',
        'Amazon Web Services (AWS)',
      ],
    },
    featuredProject: {
      title: 'EyeQuant AI',
      category: 'SaaS',
      description: {
        es: 'Plataforma de análisis cuantitativo impulsada por IA que identifica señales de mercado en acciones, ETFs y criptomonedas mediante modelos evaluados fuera de muestra, para complementar el análisis de inversionistas y traders.',
        en: 'AI-powered quantitative analysis platform that identifies market signals in stocks, ETFs, and cryptocurrencies using out-of-sample evaluated models to support investors and traders.',
      },
      areas: {
        es: ['IA', 'Modelos cuantitativos', 'Acciones', 'ETFs', 'Criptomonedas'],
        en: ['AI', 'Quantitative models', 'Stocks', 'ETFs', 'Cryptocurrencies'],
      },
      url: 'https://www.eyequant.ai/',
    },
  },
  {
    period: { es: '2025 Diciembre - 2026 Febrero', en: 'December 2025 - February 2026' },
    organization: 'Electric Automatic Chile',
    organizationUrl: 'https://github.com/electricautomaticchile',
    organizationLinkLabel: { es: 'GitHub de la empresa', en: 'Company GitHub' },
    role: { es: 'Práctica profesional', en: 'Professional internship' },
    description: {
      es: 'Desarrollé una aplicación móvil multiplataforma con Flutter y Dart para visualizar consumo energético, gestionar facturas digitales y recibir notificaciones. Integré un backend con MongoDB.',
      en: 'Built a cross-platform Flutter and Dart app for energy usage, digital invoices, and notifications, connected to a MongoDB backend.',
    },
  },
  {
    period: { es: '2025', en: '2025' },
    organization: 'AgrH2infO',
    organizationUrl: 'https://upla.cl',
    organizationLinkLabel: { es: 'upla.cl', en: 'upla.cl' },
    role: { es: 'Práctica inicial universitaria', en: 'University internship' },
    description: {
      es: 'Desarrollé una plataforma web con Bootstrap 5 y JavaScript que integra Open-Meteo para mostrar datos meteorológicos en tiempo real.',
      en: 'Built a Bootstrap 5 and JavaScript web platform using Open-Meteo to display real-time weather data.',
    },
  },
];

export default function Experience({ locale }: { locale: Locale }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pt-8 pb-10 sm:px-12" aria-labelledby="experience-heading">
      <p className="font-mono text-sm text-vscode-textMuted mb-3">// {locale === 'en' ? 'professional experience' : 'experiencia profesional'}</p>
      <h1 id="experience-heading" className="text-2xl sm:text-3xl font-semibold text-vscode-text mb-6">
        {locale === 'en' ? 'Experience' : 'Experiencia'}
      </h1>
      <div className="border-l border-vscode-border space-y-7">
        {entries.map((entry) => (
          <article key={entry.organization} className="relative pl-5 sm:pl-7">
            <span aria-hidden="true" className="absolute -left-1 top-2 h-2 w-2 rounded-full bg-vscode-accent" />
            <p className="font-mono text-xs text-vscode-accent mb-1">{entry.period[locale]}</p>
            <h2 className="text-base font-semibold text-vscode-text">{entry.role[locale]} · {entry.organization}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-vscode-textSubtle">{entry.description[locale]}</p>
            {entry.organizationUrl && (
              <a
                href={entry.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center rounded-md border border-vscode-accent/30 px-3 py-1.5 text-xs font-medium text-vscode-accent hover:bg-vscode-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
              >
                {entry.organizationLinkLabel?.[locale] ?? entry.organizationUrl} ↗
              </a>
            )}
            {entry.areas && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={locale === 'en' ? 'Areas of work' : 'Áreas de trabajo'}>
                {entry.areas[locale].map((area) => (
                  <li key={area} className="rounded-md border border-vscode-border/50 bg-vscode-surface0/40 px-2 py-1 text-xs text-vscode-textSubtle">
                    {area}
                  </li>
                ))}
              </ul>
            )}
            {entry.featuredProject && (
              <div className="mt-5 max-w-2xl rounded-lg border border-vscode-border bg-vscode-surface0/20 p-4">
                <p className="text-xs uppercase tracking-wider text-vscode-textMuted">
                  {locale === 'en' ? 'Featured work' : 'Trabajo destacado'} · {entry.featuredProject.category}
                </p>
                <h3 className="mt-1 text-base font-semibold text-vscode-text">{entry.featuredProject.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-vscode-textSubtle">{entry.featuredProject.description[locale]}</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={locale === 'en' ? 'Project topics' : 'Áreas del proyecto'}>
                  {entry.featuredProject.areas[locale].map((area) => (
                    <li key={area} className="rounded-md border border-vscode-border/50 bg-vscode-surface0/40 px-2 py-1 text-xs text-vscode-textSubtle">
                      {area}
                    </li>
                  ))}
                </ul>
                <a
                  href={entry.featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center rounded-md border border-vscode-accent/30 px-3 py-1.5 text-xs font-medium text-vscode-accent hover:bg-vscode-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
                >
                  {locale === 'en' ? 'Visit site' : 'Ir a la página'} ↗
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
