export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  category: 'Web' | 'Mobile' | 'SaaS';
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Plataforma de comercio electrónico full stack con carrito de compras, pasarela de pagos y panel de administración.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'Web',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'task-management',
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con drag & drop, notificaciones en tiempo real y colaboración en equipo.',
    stack: ['Angular', 'Firebase', 'TailwindCSS', 'RxJS'],
    category: 'SaaS',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'fleet-tracker',
    title: 'Fleet Tracker Mobile',
    description: 'App mobile para monitoreo de flotas con GPS en tiempo real, alertas y reportes de rendimiento.',
    stack: ['Flutter', 'Dart', 'Google Maps API', 'Firebase'],
    category: 'Mobile',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'portfolio-vscode',
    title: 'Portfolio VS Code',
    description: 'Portfolio profesional con diseño estilo VS Code, construido con Astro, React y TailwindCSS.',
    stack: ['Astro', 'React', 'TailwindCSS', 'TypeScript'],
    category: 'Web',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'api-gateway',
    title: 'API Gateway Service',
    description: 'Microservicio API Gateway con rate limiting, autenticación JWT y documentación OpenAPI.',
    stack: ['Go', 'Docker', 'Redis', 'PostgreSQL'],
    category: 'SaaS',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'fitness-app',
    title: 'FitTrack Mobile',
    description: 'App de seguimiento fitness con rutinas personalizadas, progreso visual y sincronización con wearables.',
    stack: ['React Native', 'TypeScript', 'Node.js', 'MongoDB'],
    category: 'Mobile',
    demoUrl: '#',
    repoUrl: '#',
  },
];
