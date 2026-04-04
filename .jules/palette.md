## 2024-05-18 - Focus rings on tight constraint elements
**Learning:** When adding keyboard focus indicators to icon-only buttons with tight constraints (like `leading-none`), the focus ring gets visually clipped.
**Action:** Always add a small padding (e.g., `px-1`) and a border radius (`rounded-sm`) to elements with `leading-none` to ensure the focus ring renders correctly.
