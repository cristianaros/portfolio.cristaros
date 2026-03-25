
## 2024-03-25 - Terminal Panel Actions Accessibility
**Learning:** Icon-only utility buttons in IDE-like interfaces (like the terminal panel) are completely opaque to screen readers and lack keyboard navigability without proper ARIA labels and focus indicators.
**Action:** Always combine `aria-label` (for screen readers), `title` (for mouse tooltips), and `focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none` (for keyboard focus) to establish a baseline of accessible utility buttons across the design system.
