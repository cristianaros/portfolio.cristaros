
## 2025-02-12 - Missing Accessible Names on Themed Emulated UI
**Learning:** In projects that simulate UIs (like an IDE or retro phone), single-character buttons or symbols (like `+`, `^`, `A`, `▲`) are often used to replicate the look without carrying semantic meaning. This leaves screen readers without accessible names and keyboard users without visible focus.
**Action:** Always verify keyboard focus (`focus-visible:ring`) and explicit `aria-label` text for stylized interactive elements that rely solely on symbols or layout context.
