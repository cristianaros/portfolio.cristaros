## Palette's Journal

## 2024-05-13 - VS Code Theme Keyboard Accessibility
**Learning:** The custom VS Code theme components, like the terminal window controls (`Terminal.tsx`), require specific focus indicators to maintain keyboard accessibility without breaking the visual design system. Native focus outlines are often suppressed by Tailwind resets or custom styling.
**Action:** When adding keyboard interactivity to IDE-styled components, always include `focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none` and a `rounded-sm` class to ensure clear, on-brand focus indicators. Additionally, icon-only buttons like terminal controls must always have `aria-label` and `title` attributes (in Spanish) for screen readers and tooltips.
