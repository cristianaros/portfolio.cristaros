import React, { useState, useEffect, useCallback } from 'react';

interface Settings {
  theme: 'dark' | 'light';
  fontSize: 'small' | 'medium' | 'large';
  showLineNumbers: boolean;
  terminalVisible: boolean;
  fontFamily: 'jetbrains' | 'firacode' | 'cascadia';
}

const defaultSettings: Settings = {
  theme: 'dark',
  fontSize: 'medium',
  showLineNumbers: true,
  terminalVisible: true,
  fontFamily: 'jetbrains',
};

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem('portfolio-settings');
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) };
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

  const sizeMap = { small: '12px', medium: '14px', large: '16px' };
  const fontMap: Record<string, string> = {
    jetbrains: '"JetBrains Mono", monospace',
    firacode: '"Fira Code", monospace',
    cascadia: '"Cascadia Code", monospace',
  };

  // Apply font size and family only to editor content (not UI chrome)
  const editorEls = document.querySelectorAll('#editor-content');
  editorEls.forEach((el) => {
    (el as HTMLElement).style.fontSize = sizeMap[settings.fontSize];
    (el as HTMLElement).style.fontFamily = fontMap[settings.fontFamily];
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
      className={`relative w-9 h-5 rounded-full transition-colors ${
        checked ? 'bg-vscode-accent' : 'bg-vscode-surface1'
      }`}
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
          className={`px-3 py-1 text-[12px] rounded border transition-colors ${
            value === opt.value
              ? 'bg-vscode-accent/20 border-vscode-accent text-vscode-accent'
              : 'bg-vscode-surface0/30 border-vscode-border text-vscode-textMuted hover:text-vscode-text hover:border-vscode-textSubtle'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

// ========== Main Settings Panel ==========
export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    applySettings(loaded);
  }, []);

  // Listen for external toggle events (from config.json button)
  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-settings', handler);
    return () => window.removeEventListener('toggle-settings', handler);
  }, []);

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
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 flex items-center justify-center transition-colors ${
          isOpen
            ? 'text-vscode-text bg-vscode-surface0/30'
            : 'text-vscode-textMuted hover:text-vscode-text hover:bg-vscode-surface0/30'
        }`}
        title="Configuración"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      {isOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
          {/* Click-outside backdrop */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Panel — fixed to the left, next to the activity bar */}
          <div
            className="fixed left-12 top-0 bottom-0 w-80 bg-vscode-sidebar border-r border-vscode-border shadow-2xl overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideInLeft 0.2s ease-out' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-vscode-border sticky top-0 z-10 bg-vscode-sidebar">
              <span className="text-[13px] font-semibold text-vscode-text uppercase tracking-wider">
                Configuración
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-vscode-surface0/50 text-vscode-textMuted hover:text-vscode-text transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-4 py-3 space-y-1">
              {/* === Apariencia === */}
              <div className="text-[11px] uppercase tracking-wider text-vscode-textMuted font-semibold pb-1 pt-1">
                Apariencia
              </div>

              <SettingsSelect
                label="Tema de Color"
                description="Cambia entre modo oscuro y claro"
                value={settings.theme}
                options={[
                  { value: 'dark', label: '🌙 Oscuro' },
                  { value: 'light', label: '☀️ Claro' },
                ]}
                onChange={(v) => updateSetting('theme', v as Settings['theme'])}
              />

              <SettingsSelect
                label="Tamaño de Fuente"
                description="Ajusta el tamaño del texto en el editor"
                value={settings.fontSize}
                options={[
                  { value: 'small', label: '12px' },
                  { value: 'medium', label: '14px' },
                  { value: 'large', label: '16px' },
                ]}
                onChange={(v) => updateSetting('fontSize', v as Settings['fontSize'])}
              />

              <SettingsSelect
                label="Fuente"
                description="Familia tipográfica del editor"
                value={settings.fontFamily}
                options={[
                  { value: 'jetbrains', label: 'JetBrains' },
                  { value: 'firacode', label: 'Fira Code' },
                  { value: 'cascadia', label: 'Cascadia' },
                ]}
                onChange={(v) => updateSetting('fontFamily', v as Settings['fontFamily'])}
              />

              <div className="border-t border-vscode-border/50 my-2" />

              {/* === Editor === */}
              <div className="text-[11px] uppercase tracking-wider text-vscode-textMuted font-semibold pb-1 pt-1">
                Editor
              </div>

              <SettingsToggle
                label="Números de Línea"
                description="Mostrar u ocultar los números de línea"
                checked={settings.showLineNumbers}
                onChange={(v) => updateSetting('showLineNumbers', v)}
              />

              <SettingsToggle
                label="Terminal Visible"
                description="Muestra u oculta el panel de terminal"
                checked={settings.terminalVisible}
                onChange={(v) => updateSetting('terminalVisible', v)}
              />

              <div className="border-t border-vscode-border/50 my-2" />

              {/* === Sobre === */}
              <div className="text-[11px] uppercase tracking-wider text-vscode-textMuted font-semibold pb-1 pt-1">
                Acerca de
              </div>
              <div className="bg-vscode-surface0/20 rounded-lg p-3 text-[12px] space-y-1.5">
                <div className="text-vscode-accent font-semibold">Portfolio v1.0</div>
                <div className="text-vscode-textMuted">
                  Construido por <span className="text-vscode-accent">Cristian Aros</span>
                </div>
                <div className="text-vscode-textMuted">
                  con Astro + React + TailwindCSS
                </div>
              </div>

              <div className="border-t border-vscode-border/50 my-2" />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
