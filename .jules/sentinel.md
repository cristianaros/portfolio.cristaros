## 2024-03-19 - Missing Security Headers

**Vulnerability:** The application was missing crucial security headers, specifically `Content-Security-Policy` and `Permissions-Policy` in `vercel.json`. This could lead to XSS attacks or unauthorized access to browser features.
**Learning:** Astro/React architectures require a carefully constructed CSP, allowing `'unsafe-inline'` and `'unsafe-eval'` for scripts to function properly in development and for hydration.
**Prevention:** Always configure comprehensive security headers in `vercel.json` for new projects, including a strict `Permissions-Policy` to reduce the attack surface.
