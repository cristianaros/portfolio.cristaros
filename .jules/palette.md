## 2026-04-08 - Accessibility for mock UI controls
**Learning:** Mock UI components (like the terminal header buttons) in this app were built as decorative elements, resulting in empty `<button>` tags that screen readers misinterpret and keyboard users cannot visually navigate.
**Action:** Always ensure that even non-functional or decorative interactive elements in UI mockups include proper `aria-label`, `title`, and keyboard focus indicators (`focus-visible:ring-1`) to avoid confusing users.
