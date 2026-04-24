## 2024-04-09 - Accesibilidad en componentes decorativos de terminal
**Learning:** Los botones decorativos que simulan la interfaz del IDE (como los controles de la terminal) utilizan etiquetas `<button>` reales pero carecían de atributos de accesibilidad, lo que los convierte en botones interactivos inaccesibles para lectores de pantalla, además de presentar recortes visuales al recibir foco debido a la clase `leading-none` sin espaciado adicional.
**Action:** Al implementar componentes que simulan elementos nativos del sistema (UI decorativa), asegurar que cada `<button>` tenga `aria-label` y `title` descriptivos en español, junto con indicadores de foco (`focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none`) y un padding compensatorio (`px-1`) para evitar el recorte del anillo de foco.

## 2026-04-24 - Accessibility for embedded game controls
**Learning:** Native `<button>` elements used as mock game controls (like a D-pad) often use `onMouseDown` for instant response, but they must also include `onClick` to be usable via keyboard (Enter/Space). Additionally, they require standard focus rings and translated `aria-label`/`title` attributes to be accessible.
**Action:** Always include `onClick` handlers, focus indicators, and descriptive ARIA labels when using native interactive elements for decorative or embedded UI components.
