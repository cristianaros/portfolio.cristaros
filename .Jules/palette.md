## 2024-05-15 - ARIA Roles for Custom UI Components
**Learning:** Custom interactive components like toggles and selects require explicit `role` attributes (`switch`, `radiogroup`, `radio`), `aria-checked` states, and `aria-label` properties to be properly understood by screen readers, along with explicit `focus-visible` styles for keyboard navigation.
**Action:** Always add appropriate `role`, state ARIA attributes, and `focus-visible` ring styles when building custom form controls instead of using native elements.
