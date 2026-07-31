## 2024-05-24 - Remove unsafe-eval from Astro CSP
**Vulnerability:** The Content-Security-Policy in `vercel.json` allowed `'unsafe-eval'` in the `script-src` directive, which could facilitate Cross-Site Scripting (XSS) attacks.
**Learning:** The static Astro build in this repository works correctly without `'unsafe-eval'` in the CSP `script-src` directive, meaning it was overly permissive and unnecessary.
**Prevention:** Always verify if a framework actually requires `'unsafe-eval'` for production builds before including it in the CSP, and default to omitting it for stricter security.
