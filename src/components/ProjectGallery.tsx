import React, { useState } from 'react';
import { projects, type Project } from '../data/projects';

const categoryColors: Record<string, string> = {
  Web: 'badge-blue',
  Mobile: 'badge-green',
  SaaS: 'badge-mauve',
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <div
    className="group bg-vscode-sidebar border border-vscode-border rounded-lg overflow-hidden hover:border-vscode-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-vscode-accent/5 animate-slide-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Card Header */}
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-vscode-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="text-vscode-text font-semibold text-sm group-hover:text-vscode-accent transition-colors">
            {project.title}
          </h3>
        </div>
        <span className={`badge ${categoryColors[project.category] || 'badge-blue'} text-[10px]`}>
          {project.category}
        </span>
      </div>

      <p className="text-vscode-textMuted text-[13px] leading-relaxed">
        {project.description}
      </p>

      {/* Stack Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 bg-vscode-surface0/70 text-vscode-textSubtle text-[11px] rounded-md border border-vscode-border/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-vscode-accent border border-vscode-accent/30 rounded-md hover:bg-vscode-accent/10 transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ver Demo
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-vscode-textSubtle border border-vscode-surface1 rounded-md hover:border-vscode-textMuted hover:text-vscode-text transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Repositorio
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function ProjectGallery() {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="syntax-comment">{'// proyectos.tsx'}</span>
        </div>
        <h2 className="text-3xl font-bold text-vscode-text mb-2">
          Galería de <span className="text-vscode-accent">Proyectos</span>
        </h2>
        <p className="text-vscode-textMuted text-sm">
          Full Stack & Mobile Development
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-md border transition-all duration-200 ${
              filter === cat
                ? 'bg-vscode-accent/20 text-vscode-accent border-vscode-accent/40'
                : 'bg-transparent text-vscode-textMuted border-vscode-border hover:border-vscode-textMuted hover:text-vscode-text'
            }`}
          >
            {cat === 'all' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}
