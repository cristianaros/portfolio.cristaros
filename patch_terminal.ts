import fs from 'fs';

const filePath = 'src/components/Terminal.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldStr = `        <div className="flex items-center gap-2 text-vscode-textMuted">
          <button className="hover:text-vscode-text transition-colors text-lg leading-none">+</button>
          <button className="hover:text-vscode-text transition-colors text-sm leading-none">⌃</button>
          <button className="hover:text-vscode-text transition-colors text-sm leading-none">×</button>
        </div>`;

const newStr = `        <div className="flex items-center gap-2 text-vscode-textMuted">
          <button
            className="w-6 h-6 flex items-center justify-center hover:bg-vscode-surface0/50 hover:text-vscode-text transition-colors text-lg leading-none rounded-md focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none"
            aria-label="Nueva terminal"
            title="Nueva terminal"
          >
            +
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center hover:bg-vscode-surface0/50 hover:text-vscode-text transition-colors text-sm leading-none rounded-md focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none"
            aria-label="Dividir terminal"
            title="Dividir terminal"
          >
            ⌃
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center hover:bg-vscode-surface0/50 hover:text-vscode-text transition-colors text-sm leading-none rounded-md focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none"
            aria-label="Cerrar terminal"
            title="Cerrar terminal"
            onClick={() => {
              try {
                const stored = localStorage.getItem('portfolio-settings');
                const settings = stored ? JSON.parse(stored) : { terminalVisible: true };
                settings.terminalVisible = false;
                localStorage.setItem('portfolio-settings', JSON.stringify(settings));
                window.dispatchEvent(new CustomEvent('portfolio-settings', { detail: settings }));
              } catch {}
            }}
          >
            ×
          </button>
        </div>`;

content = content.replace(oldStr, newStr);
fs.writeFileSync(filePath, content);
console.log('Done!');
