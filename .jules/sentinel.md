## 2024-03-17 - Content Security Policy for Astro and React
**Vulnerability:** Missing Content-Security-Policy (CSP) header in `vercel.json` deployment configuration.
**Learning:** Due to Astro and React's architecture in this project, the Content-Security-Policy configured in `vercel.json` requires `'unsafe-inline'` and `'unsafe-eval'` for `script-src`, `'unsafe-inline'` for `style-src`, and must allow necessary external sources like Google Fonts (`https://fonts.googleapis.com` and `https://fonts.gstatic.com`) to function correctly without breaking the UI.
**Prevention:** Always ensure a base CSP is included in `vercel.json` when deploying Astro/React projects, but carefully balance security with framework requirements to avoid breaking functionality.
