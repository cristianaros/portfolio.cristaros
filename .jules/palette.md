## 2025-01-09 - Accessible Interactive Components
**Learning:** Icon-only buttons or interactive simulated UI components (like a custom terminal or an inline game interface) often lack inherent semantic meaning or focus states. This pattern creates a significant accessibility gap for keyboard and screen reader users.
**Action:** When building or maintaining custom UI components simulating native or real-world interfaces, explicitly add `aria-label`s for screen reader support and `focus-visible` styles with a consistent ring color to ensure robust keyboard navigation support.
