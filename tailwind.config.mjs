/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: 'rgb(var(--vscode-bg) / <alpha-value>)',
          sidebar: 'rgb(var(--vscode-sidebar) / <alpha-value>)',
          editor: 'rgb(var(--vscode-editor) / <alpha-value>)',
          tabs: 'rgb(var(--vscode-tabs) / <alpha-value>)',
          tabActive: 'rgb(var(--vscode-tabActive) / <alpha-value>)',
          tabInactive: 'rgb(var(--vscode-tabInactive) / <alpha-value>)',
          menu: 'rgb(var(--vscode-menu) / <alpha-value>)',
          statusbar: 'rgb(var(--vscode-statusbar) / <alpha-value>)',
          border: 'rgb(var(--vscode-border) / <alpha-value>)',
          text: 'rgb(var(--vscode-text) / <alpha-value>)',
          textMuted: 'rgb(var(--vscode-textMuted) / <alpha-value>)',
          textSubtle: 'rgb(var(--vscode-textSubtle) / <alpha-value>)',
          accent: 'rgb(var(--vscode-accent) / <alpha-value>)',
          accentAlt: 'rgb(var(--vscode-accentAlt) / <alpha-value>)',
          green: 'rgb(var(--vscode-green) / <alpha-value>)',
          yellow: 'rgb(var(--vscode-yellow) / <alpha-value>)',
          pink: 'rgb(var(--vscode-pink) / <alpha-value>)',
          mauve: 'rgb(var(--vscode-mauve) / <alpha-value>)',
          peach: 'rgb(var(--vscode-peach) / <alpha-value>)',
          teal: 'rgb(var(--vscode-teal) / <alpha-value>)',
          red: 'rgb(var(--vscode-red) / <alpha-value>)',
          surface0: 'rgb(var(--vscode-surface0) / <alpha-value>)',
          surface1: 'rgb(var(--vscode-surface1) / <alpha-value>)',
          surface2: 'rgb(var(--vscode-surface2) / <alpha-value>)',
          overlay0: 'rgb(var(--vscode-overlay0) / <alpha-value>)',
          overlay1: 'rgb(var(--vscode-overlay1) / <alpha-value>)',
          terminal: 'rgb(var(--vscode-terminal) / <alpha-value>)',
          lineNumber: 'rgb(var(--vscode-lineNumber) / <alpha-value>)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'editor': '0.875rem',
        'editor-sm': '0.8125rem',
      },
      animation: {
        'cursor-blink': 'blink 1.2s step-end infinite',
        'typing': 'typing 2s steps(40) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          from: { boxShadow: '0 0 5px rgba(137, 180, 250, 0.2)' },
          to: { boxShadow: '0 0 20px rgba(137, 180, 250, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
