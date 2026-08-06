## 2024-04-09 - Accesibilidad en componentes decorativos de terminal
**Learning:** Los botones decorativos que simulan la interfaz del IDE (como los controles de la terminal) utilizan etiquetas `<button>` reales pero carecían de atributos de accesibilidad, lo que los convierte en botones interactivos inaccesibles para lectores de pantalla, además de presentar recortes visuales al recibir foco debido a la clase `leading-none` sin espaciado adicional.
**Action:** Al implementar componentes que simulan elementos nativos del sistema (UI decorativa), asegurar que cada `<button>` tenga `aria-label` y `title` descriptivos en español, junto con indicadores de foco (`focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none`) y un padding compensatorio (`px-1`) para evitar el recorte del anillo de foco.

## 2024-08-06 - Accesibilidad de teclado en barra de actividad y explorador
**Learning:** Los botones nativos del sistema en `IDELayout.astro` (iconos de actividad, menús y acciones de diseño) carecían de estilos `focus-visible`, lo que impedía a los usuarios de teclado saber qué elemento estaba activo.
**Action:** Al crear botones de icono sin un fondo explícito, siempre se deben incluir los estilos `focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none` y `rounded-sm` o un padding menor para no cortar los anillos de foco.
