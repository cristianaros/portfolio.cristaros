## 2024-05-18 - Astro and React Architecture CSP Requirements
**Vulnerability:** Missing `Content-Security-Policy` header leaving application vulnerable to XSS and data injection attacks.
**Learning:** Due to the Astro and React architecture in this specific project, a strict CSP breaks functionality. The application explicitly requires `'unsafe-inline'` and `'unsafe-eval'` for `script-src`, and `'unsafe-inline'` for `style-src`. It also requires allowing external sources like `https://fonts.googleapis.com` and `https://fonts.gstatic.com` for fonts to function correctly without breaking the UI.
**Prevention:** When setting or updating CSP in this repository, always ensure these specific directives are maintained to prevent breaking the application's React hydration and inline styling.
