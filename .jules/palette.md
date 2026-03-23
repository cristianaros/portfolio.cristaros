
## 2024-05-24 - Interactive IDE Decorators
**Learning:** Users instinctively try to interact with standard IDE UI elements (like terminal close buttons) even if they are just decorative. Making them functional and accessible (ARIA + focus states) significantly enhances the "IDE feel" of the portfolio.
**Action:** Always add interactive functionality, `aria-label`s, and focus indicators (`focus-visible:ring-1 focus-visible:ring-vscode-accent`) to decorative UI elements that look like standard controls.
