import React, { useState, useEffect } from 'react';
import { projects, type Project, type ProjectCategory } from '../data/projects';
import { useLocale, type Locale } from '../i18n';

const categoryColors: Record<ProjectCategory, string> = {
  Web: 'badge-blue',
  Mobile: 'badge-green',
  SaaS: 'badge-mauve',
};

function hasAnimated(): boolean {
  try { return sessionStorage.getItem('projects-animated') === 'true'; } catch { return false; }
}

const ProjectCard: React.FC<{ project: Project; index: number; skipAnim: boolean; locale: Locale }> = ({ project, index, skipAnim, locale }) => {
  const demoUrl = project.demoUrl && project.demoUrl !== '#' ? project.demoUrl : undefined;
  const repoUrl = project.repoUrl && project.repoUrl !== '#' ? project.repoUrl : undefined;
  const projectCategories = Array.isArray(project.category) ? project.category : [project.category];

  return (
    <div
      className={`group bg-vscode-sidebar border border-vscode-border rounded-lg overflow-hidden hover:border-vscode-accent/50 transition-[border-color,box-shadow] duration-300 hover:shadow-lg hover:shadow-vscode-accent/5 ${skipAnim ? '' : 'animate-slide-up'}`}
      style={skipAnim ? undefined : { animationDelay: `${index * 100}ms` }}
    >
    {/* Card Header */}
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <svg aria-hidden="true" className="w-5 h-5 text-vscode-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h2 className="text-vscode-text font-semibold text-sm group-hover:text-vscode-accent transition-colors text-pretty">
            {project.title}
          </h2>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          {projectCategories.map((category) => (
            <span key={category} className={`badge ${categoryColors[category]} text-[10px]`}>
              {locale === 'es' && category === 'Mobile' ? 'Móvil' : category}
            </span>
          ))}
        </div>
      </div>

      <p className="text-vscode-textMuted text-[13px] leading-relaxed">
        {locale === 'en' ? project.descriptionEn : project.description}
      </p>

      {/* Stack Tags */}
      <div className="flex flex-wrap gap-1.5">
        {(locale === 'en' ? project.stackEn ?? project.stack : project.stack).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 bg-vscode-surface0/70 text-vscode-textSubtle text-[11px] rounded-md border border-vscode-border/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      {(demoUrl || repoUrl) && (
        <div className="flex gap-2 pt-2">
          {demoUrl && (
          <a
            href={demoUrl}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-vscode-accent border border-vscode-accent/30 rounded-md hover:bg-vscode-accent/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {locale === 'en' ? 'Visit site' : 'Ir a la página'}
          </a>
        )}
          {repoUrl && (
          <a
            href={repoUrl}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-vscode-textSubtle border border-vscode-surface1 rounded-md hover:border-vscode-textMuted hover:text-vscode-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {locale === 'en' ? 'Repository' : 'Repositorio'}
          </a>
        )}
        </div>
      )}
    </div>
    </div>
  );
};

export default function ProjectGallery() {
  const locale = useLocale();
  const [filter, setFilter] = useState<string>('all');
  const alreadyAnimated = hasAnimated();

  useEffect(() => {
    if (!alreadyAnimated) {
      try { sessionStorage.setItem('projects-animated', 'true'); } catch {}
    }
  }, []);

  const allCategories = projects.flatMap((project) => Array.isArray(project.category) ? project.category : [project.category]);
  const categories = ['all', ...new Set(allCategories)];
  const filtered = filter === 'all'
    ? projects
    : projects.filter((project) => {
      const projectCategories = Array.isArray(project.category) ? project.category : [project.category];
      return projectCategories.includes(filter as ProjectCategory);
    });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 md:px-8 md:py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="syntax-comment">{locale === 'en' ? '// projects.tsx' : '// proyectos.tsx'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.035em] text-vscode-text mb-2 text-balance">
          {locale === 'en' ? 'Projects' : 'Galería de Proyectos'}
        </h1>
        <p className="text-vscode-textMuted text-sm">
          {locale === 'en' ? 'Full-stack & mobile development' : 'Desarrollo full stack y móvil'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-md border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent ${
              filter === cat
                ? 'bg-vscode-accent/20 text-vscode-accent border-vscode-accent/40'
                : 'bg-transparent text-vscode-textMuted border-vscode-border hover:border-vscode-textMuted hover:text-vscode-text'
            }`}
          >
            {cat === 'all' ? (locale === 'en' ? 'All' : 'Todos') : (locale === 'es' && cat === 'Mobile' ? 'Móvil' : cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} skipAnim={alreadyAnimated} locale={locale} />
        ))}
      </div>
    </div>
  );
}
