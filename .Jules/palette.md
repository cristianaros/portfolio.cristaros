
## 2024-05-24 - Accessible Custom Settings Panel
**Learning:** Custom toggle buttons and radio group alternatives (like segments) built with `div` and `button` elements need proper `role="switch"` and `role="radiogroup"`/`role="radio"` attributes. They also require `aria-checked` and `aria-labelledby`/`aria-describedby` to link the visual text labels and descriptions to the control itself. Using Tailwind's `focus-visible` ensures keyboard focus states are obvious without breaking the custom design.
**Action:** Whenever building custom interactive controls, map them to their semantic HTML equivalents via ARIA roles and ensure labels are programmatically associated with the controls.
