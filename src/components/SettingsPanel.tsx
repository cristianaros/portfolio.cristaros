import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from '../i18n';

interface Settings {
  theme: 'dark' | 'light';
  fontSize: number;
  showLineNumbers: boolean;
  terminalVisible: boolean;
}

const defaultSettings: Settings = {
  theme: 'dark',
  fontSize: 14,
  showLineNumbers: true,
  terminalVisible: true,
};

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem('portfolio-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      delete parsed.fontFamily;
      const legacyFontSizes: Record<string, number> = { small: 12, medium: 14, large: 16 };
      const storedFontSize = parsed.fontSize;
      const fontSize = typeof storedFontSize === 'number'
        ? Math.min(24, Math.max(10, storedFontSize))
        : legacyFontSizes[storedFontSize] ?? defaultSettings.fontSize;
      return { ...defaultSettings, ...parsed, fontSize };
    }
    // Migrate old theme setting
    const oldTheme = localStorage.getItem('portfolio-theme');
    if (oldTheme === 'light' || oldTheme === 'dark') {
      return { ...defaultSettings, theme: oldTheme };
    }
  } catch {}
  return defaultSettings;
}

function saveSettings(settings: Settings) {
  localStorage.setItem('portfolio-settings', JSON.stringify(settings));
  // Keep legacy key in sync for the head script
  localStorage.setItem('portfolio-theme', settings.theme);
}

function applySettings(settings: Settings) {
  document.documentElement.setAttribute('data-theme', settings.theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    settings.theme === 'light' ? '#fafafa' : '#1e1e2e',
  );

  // Apply the adjustable font size to editor content. Its typeface is set in global CSS.
  const editorEls = document.querySelectorAll('#editor-content');
  editorEls.forEach((el) => {
    (el as HTMLElement).style.fontSize = `${settings.fontSize}px`;
  });

  // Toggle line numbers
  document.querySelectorAll('.line-number').forEach((el) => {
    (el as HTMLElement).style.display = settings.showLineNumbers ? '' : 'none';
  });

  // Toggle terminal visibility via custom event
  window.dispatchEvent(new CustomEvent('portfolio-settings', { detail: settings }));
}

// ========== Settings Toggle Section ==========
const SettingsToggle: React.FC<{
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-2 px-1 group">
    <div>
      <div className="text-[13px] text-vscode-text">{label}</div>
      {description && <div className="text-[11px] text-vscode-textMuted">{description}</div>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent ${
        checked ? 'bg-vscode-accent' : 'bg-vscode-surface1'
      }`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-4' : ''
        }`}
      />
    </button>
  </div>
);

// ========== Settings Select Section ==========
const SettingsSelect: React.FC<{
  label: string;
  description?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}> = ({ label, description, value, options, onChange }) => (
  <div className="py-2 px-1">
    <div className="text-[13px] text-vscode-text mb-1">{label}</div>
    {description && <div className="text-[11px] text-vscode-textMuted mb-2">{description}</div>}
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 text-[12px] rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent ${
            value === opt.value
              ? 'bg-vscode-accent/20 border-vscode-accent text-vscode-accent'
              : 'bg-vscode-surface0/30 border-vscode-border text-vscode-textMuted hover:text-vscode-text hover:border-vscode-textSubtle'
          }`}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

// ========== Main Settings Panel ==========
export default function SettingsPanel() {
  const locale = useLocale();
  const tr = (es: string, en: string) => locale === 'en' ? en : es;
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);

  const closeSettings = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => openerRef.current?.focus());
  }, []);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    applySettings(loaded);
  }, []);

  // Listen for external toggle events (from config.json button)
  useEffect(() => {
    const handler = () => {
      openerRef.current = document.activeElement as HTMLElement | null;
      setIsOpen((prev) => !prev);
    };
    window.addEventListener('toggle-settings', handler);
    return () => window.removeEventListener('toggle-settings', handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSettings();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSettings]);

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      saveSettings(next);
      applySettings(next);
      // Sync the toggle icons in the activity bar
      if (key === 'theme') {
        const iconSun = document.getElementById('icon-sun');
        const iconMoon = document.getElementById('icon-moon');
        if (iconSun && iconMoon) {
          iconSun.style.display = value === 'dark' ? 'block' : 'none';
          iconMoon.style.display = value === 'light' ? 'block' : 'none';
        }
      }
      return next;
    });
  }, []);

  return (
    <>
      {/* Gear Button */}
      <button
        onClick={() => {
          openerRef.current = document.activeElement as HTMLElement | null;
          setIsOpen((open) => !open);
        }}
        className={`w-10 h-10 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent ${
          isOpen
            ? 'text-vscode-text bg-vscode-surface0/30'
            : 'text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-surface0/30'
        }`}
        title={tr('Configuración', 'Settings')}
        aria-label={tr('Configuración', 'Settings')}
        aria-expanded={isOpen}
        aria-controls="settings-panel-dialog"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Overlay Panel */}
      {typeof document !== 'undefined'
        ? createPortal(
        <div
          aria-hidden={!isOpen}
          className={`pointer-events-none fixed inset-x-0 bottom-0 top-[calc(2.5rem_+_env(safe-area-inset-top))] z-50 transition-opacity duration-200 ease-out md:top-9 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            type="button"
            className={`absolute inset-0 h-full cursor-default bg-black/20 transition-opacity duration-200 md:left-12 ${
              isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-label={tr('Cerrar configuración', 'Close settings')}
            onClick={closeSettings}
          />

          {/* Panel — fixed to the left, next to the activity bar */}
          <div
            ref={dialogRef}
            id="settings-panel-dialog"
            role="dialog"
            aria-modal={isOpen || undefined}
            aria-hidden={!isOpen}
            inert={!isOpen}
            aria-labelledby="settings-panel-title"
            className={`absolute left-0 md:left-12 inset-y-0 w-80 max-w-full bg-vscode-sidebar border-r border-vscode-border shadow-2xl overflow-y-auto z-50 transition-transform duration-200 ease-out ${
              isOpen ? 'pointer-events-auto translate-x-0' : 'pointer-events-none -translate-x-full'
            }`}
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-vscode-border sticky top-0 z-10 bg-vscode-sidebar">
              <span id="settings-panel-title" className="text-[13px] font-semibold text-vscode-text uppercase tracking-wider">
                {tr('Configuración', 'Settings')}
              </span>
              <button
                ref={closeButtonRef}
                onClick={closeSettings}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-vscode-surface0/50 text-vscode-textMuted hover:text-vscode-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
                aria-label={tr('Cerrar configuración', 'Close settings')}
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-4 py-3 space-y-1">
              {/* === Apariencia === */}
              <div className="text-[11px] uppercase tracking-wider text-vscode-textMuted font-semibold pb-1 pt-1">
                {tr('Apariencia', 'Appearance')}
              </div>

              <SettingsSelect
                label={tr('Tema de Color', 'Color theme')}
                description={tr('Cambia entre modo oscuro y claro', 'Switch between dark and light mode')}
                value={settings.theme}
                options={[
                  { value: 'dark', label: tr('🌙 Oscuro', '🌙 Dark') },
                  { value: 'light', label: tr('☀️ Claro', '☀️ Light') },
                ]}
                onChange={(v) => updateSetting('theme', v as Settings['theme'])}
              />

              <div className="py-2 px-1">
                <div className="flex items-center justify-between text-[13px] text-vscode-text mb-1">
                  <label htmlFor="editor-font-size">{tr('Tamaño de Fuente', 'Font size')}</label>
                  <output htmlFor="editor-font-size" className="text-vscode-accent tabular-nums">
                    {settings.fontSize}px
                  </output>
                </div>
                <div className="text-[11px] text-vscode-textMuted mb-2">
                  {tr('Ajusta el tamaño del texto entre 10 y 24 px', 'Adjust text size between 10 and 24 px')}
                </div>
                <input
                  id="editor-font-size"
                  type="range"
                  min="10"
                  max="24"
                  step="1"
                  value={settings.fontSize}
                  onChange={(event) => updateSetting('fontSize', Number(event.target.value))}
                  className="w-full h-2 accent-vscode-accent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vscode-accent"
                  aria-label={tr('Tamaño de fuente del editor', 'Editor font size')}
                />
                <div className="flex justify-between text-[10px] text-vscode-textMuted tabular-nums" aria-hidden="true">
                  <span>10px</span>
                  <span>24px</span>
                </div>
              </div>

              <div className="border-t border-vscode-border/50 my-2" />

              {/* === Editor === */}
              <div className="text-[11px] uppercase tracking-wider text-vscode-textMuted font-semibold pb-1 pt-1">
                Editor
              </div>

              <SettingsToggle
                label={tr('Números de Línea', 'Line numbers')}
                description={tr('Mostrar u ocultar los números de línea', 'Show or hide line numbers')}
                checked={settings.showLineNumbers}
                onChange={(v) => updateSetting('showLineNumbers', v)}
              />

              <div className="hidden md:block">
                <SettingsToggle
                  label={tr('Terminal Visible', 'Terminal visible')}
                  description={tr('Muestra u oculta el panel de terminal', 'Show or hide the terminal panel')}
                  checked={settings.terminalVisible}
                  onChange={(v) => updateSetting('terminalVisible', v)}
                />
              </div>

              <div className="border-t border-vscode-border/50 my-2" />

              {/* === Sobre === */}
              <div className="text-[11px] uppercase tracking-wider text-vscode-textMuted font-semibold pb-1 pt-1">
                {tr('Acerca de', 'About')}
              </div>
              <div className="bg-vscode-surface0/20 rounded-lg p-3 text-[12px] space-y-1.5">
                <div className="text-vscode-accent font-semibold">Portfolio V1.1</div>
                <div className="text-vscode-textMuted">
                  {tr('Construido por', 'Built by')} <span className="text-vscode-accent">Cristian Aros</span>
                </div>
                <ul className="text-vscode-textMuted space-y-1 pt-1">
                  <li><span className="text-vscode-textSubtle">Astro 5</span> {tr('genera páginas estáticas.', 'generates static pages.')}</li>
                  <li><span className="text-vscode-textSubtle">React 19</span> {tr('aporta componentes interactivos hidratados en el navegador.', 'adds interactive browser components.')}</li>
                  <li><span className="text-vscode-textSubtle">TypeScript</span> {tr('y', 'and')} <span className="text-vscode-textSubtle">Tailwind CSS</span> {tr('dan tipos y estilos.', 'provide types and styles.')}</li>
                  <li>{tr('Publicado en', 'Hosted on')} <span className="text-vscode-textSubtle">Vercel</span>.</li>
                </ul>
              </div>

              <div className="border-t border-vscode-border/50 my-2" />
            </div>
          </div>
        </div>,
        document.body,
      )
        : null}

    </>
  );
}
