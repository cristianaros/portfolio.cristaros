## 2024-04-09 - Accesibilidad en componentes decorativos de terminal
**Learning:** Los botones decorativos que simulan la interfaz del IDE (como los controles de la terminal) utilizan etiquetas `<button>` reales pero carecían de atributos de accesibilidad, lo que los convierte en botones interactivos inaccesibles para lectores de pantalla, además de presentar recortes visuales al recibir foco debido a la clase `leading-none` sin espaciado adicional.
**Action:** Al implementar componentes que simulan elementos nativos del sistema (UI decorativa), asegurar que cada `<button>` tenga `aria-label` y `title` descriptivos en español, junto con indicadores de foco (`focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none`) y un padding compensatorio (`px-1`) para evitar el recorte del anillo de foco.

## 2024-05-24 - Accesibilidad de teclado en eventos de ratón
**Learning:** Al usar `onMouseDown` en botones nativos (`<button>`) para dar una respuesta más rápida (ej. controles de juegos o D-pads), se pierde la accesibilidad por teclado porque las teclas Enter/Espacio disparan `onClick`, no eventos de ratón.
**Action:** Siempre incluir un manejador `onClick` junto a los manejadores de ratón (replicando la acción) en elementos interactivos para asegurar que puedan ser accionados mediante navegación por teclado.
