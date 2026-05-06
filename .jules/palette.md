## 2024-04-09 - Accesibilidad en componentes decorativos de terminal
**Learning:** Los botones decorativos que simulan la interfaz del IDE (como los controles de la terminal) utilizan etiquetas `<button>` reales pero carecían de atributos de accesibilidad, lo que los convierte en botones interactivos inaccesibles para lectores de pantalla, además de presentar recortes visuales al recibir foco debido a la clase `leading-none` sin espaciado adicional.
**Action:** Al implementar componentes que simulan elementos nativos del sistema (UI decorativa), asegurar que cada `<button>` tenga `aria-label` y `title` descriptivos en español, junto con indicadores de foco (`focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none`) y un padding compensatorio (`px-1`) para evitar el recorte del anillo de foco.

## 2024-05-15 - Accesibilidad de teclado para controles de UI personalizados
**Learning:** Los elementos `<button>` nativos que se utilizan para los controles del juego, cuando solo tienen manejadores `onMouseDown`, no pueden activarse mediante el teclado (teclas Enter/Espacio), lo que rompe la accesibilidad para los usuarios que dependen del teclado.
**Action:** Siempre incluir un manejador `onClick` junto a los manejadores `onMouseDown` al implementar controles interactivos nativos con `<button>` para garantizar que puedan ser activados mediante el teclado.
