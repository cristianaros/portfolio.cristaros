<div align="center">

# 💻 Portfolio — Cristian Aros

### Ingeniero Civil Informático & Desarrollador Full Stack

Un portfolio interactivo diseñado como un **IDE (Visual Studio Code)**, construido con Astro, React y TailwindCSS.

[![Astro](https://img.shields.io/badge/Astro-5.5-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📋 Descripción

Este portfolio simula la interfaz de **Visual Studio Code**, ofreciendo una experiencia inmersiva donde cada sección del portfolio es un "archivo" dentro del editor. Incluye explorador de archivos, pestañas, terminal decorativa, panel de configuración funcional y un easter egg 🐍.

## ✨ Características

| Característica        | Descripción                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| 🗂️ **Layout IDE**     | Interfaz completa de VS Code con activity bar, explorador, pestañas y barra de estado              |
| 📄 **README.md**      | Página principal con presentación, stack tecnológico y botones de contacto                         |
| 📦 **proyectos.json** | Galería de proyectos renderizada como JSON                                                         |
| 🐍 **snake.astro**    | Juego Snake estilo Nokia como easter egg integrado en el editor                                    |
| ⚙️ **Configuración**  | Panel funcional: tema oscuro/claro, tamaño de fuente, familia tipográfica, visibilidad de terminal |
| 🎨 **Temas**          | Modo oscuro (Catppuccin Mocha) y modo claro con persistencia en localStorage                       |
| 💻 **Terminal**       | Terminal decorativa con animación de comandos git y npm                                            |
| 🧩 **Konami Code**    | Código secreto oculto en el panel de configuración                                                 |

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Hero.tsx                 # Sección principal con saludo y CTA
│   ├── ProjectGallery.tsx       # Galería de proyectos
│   ├── SettingsPanel.tsx        # Panel de configuración funcional
│   ├── SnakeInline.tsx          # Juego Snake estilo Nokia
│   ├── Terminal.tsx             # Terminal decorativa
│   ├── ActivityBarWidgets.tsx   # Widgets de la barra lateral
│   ├── ThemeToggle.tsx          # Toggle de tema
│   └── CodeBlock.tsx            # Bloques de código con sintaxis
├── layouts/
│   └── IDELayout.astro          # Layout principal tipo IDE
├── pages/
│   ├── index.astro              # README.md — Página principal
│   ├── proyectos.astro          # proyectos.json — Proyectos
│   └── snake.astro              # snake.astro — Easter egg
└── styles/
    └── global.css               # Variables CSS y temas
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/cristianaros/portfolio.cristaros.git

# Entrar al directorio
cd portfolio.cristaros

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:4321/`

## 📦 Scripts Disponibles

| Comando           | Descripción                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo    |
| `npm run build`   | Genera la build de producción       |
| `npm run preview` | Previsualiza la build de producción |

## 🛠️ Stack Tecnológico

- **Framework:** [Astro 5.5](https://astro.build/) — Renderizado estático con islas de React
- **UI Library:** [React 19](https://react.dev/) — Componentes interactivos (client:load)
- **Estilos:** [TailwindCSS 3.4](https://tailwindcss.com/) — Utility-first CSS
- **Lenguaje:** [TypeScript 5.7](https://www.typescriptlang.org/) — Tipado estático
- **Deploy:** [Vercel](https://vercel.com/) — Despliegue automático
- **Tema:** Catppuccin Mocha (oscuro) / Custom Quartz (claro)

## 🗺️ Roadmap

### En progreso

- [ ] 🔧 Arreglar la configuración dentro de `snake.astro` — El panel de settings debe respetar el contexto visual de la página del juego
- [ ] 🔧 Arreglar la configuración general — Algunas opciones necesitan pulirse para funcionar de forma consistente en todas las páginas
- [ ] 📄 Dar utilidad a `config.json` — Actualmente es un archivo decorativo en el explorador; debe ser funcional
- [ ] 🐍 Mejorar el juego Snake — Agregar efectos de sonido, animaciones, niveles de dificultad y mejores controles táctiles
- [ ] 🔄 Evitar re-animaciones al navegar — Las secciones del explorador (README.md, proyectos.json) no deberían repetir la animación de carga al volver a ellas
- [ ] 🖥️ Corregir la animación de la terminal — La terminal no debería volver a ejecutar su animación de comandos al cambiar de pestaña
- [ ] 📱 Mejorar vista mobile — Adaptar el layout IDE para pantallas pequeñas con una experiencia optimizada

### Futuras mejoras

- [ ] 🌐 Internacionalización (ES/EN)
- [ ] 📊 Sección de experiencia laboral
- [ ] 🎯 Integración con API de GitHub para mostrar repos en tiempo real
- [ ] 🔔 Notificaciones simuladas estilo VS Code
- [ ] 📝 Blog integrado como archivos `.md`

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados © 2026 Cristian Aros.

---

<div align="center">

**Construido  por Cristian Aros**

Astro + React + TailwindCSS

</div>
