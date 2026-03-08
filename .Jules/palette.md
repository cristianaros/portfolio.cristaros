## 2024-05-24 - Accessibility labels for Terminal actions
**Learning:** In desktop-like applications built for the web (like this VS Code clone), icon-only action buttons (like minimize, maximize, close) often lack descriptive labels because they rely on visual cues. Screen readers cannot interpret these cues, making the application inaccessible.
**Action:** Always verify icon-only buttons have descriptive `aria-label` attributes to ensure they are accessible to screen readers, and consider adding `title` attributes to provide native tooltips for sighted users.
