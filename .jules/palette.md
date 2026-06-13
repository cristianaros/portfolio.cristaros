## 2024-04-09 - Accesibilidad en componentes decorativos de terminal
**Learning:** Los botones decorativos que simulan la interfaz del IDE (como los controles de la terminal) utilizan etiquetas `<button>` reales pero carecían de atributos de accesibilidad, lo que los convierte en botones interactivos inaccesibles para lectores de pantalla, además de presentar recortes visuales al recibir foco debido a la clase `leading-none` sin espaciado adicional.
**Action:** Al implementar componentes que simulan elementos nativos del sistema (UI decorativa), asegurar que cada `<button>` tenga `aria-label` y `title` descriptivos en español, junto con indicadores de foco (`focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none`) y un padding compensatorio (`px-1`) para evitar el recorte del anillo de foco.

## 2024-04-10 - Accesibilidad en controles interactivos con eventos de ratón
**Learning:** Los controles interactivos en pantalla (como el D-pad de juegos) que utilizan exclusivamente `onMouseDown` para respuestas rápidas o continuas ignoran la activación por teclado (Enter/Space) cuando el elemento recibe el foco.
**Action:** Siempre incluir un manejador `onClick` equivalente junto a los manejadores `onMouseDown` en elementos `<button>` nativos para garantizar la accesibilidad completa por teclado.
