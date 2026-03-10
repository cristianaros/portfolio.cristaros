## 2024-03-10 - Missing Content Security Policy (CSP)
**Vulnerability:** The application was missing a Content-Security-Policy header in the Vercel deployment configuration, increasing the risk of Cross-Site Scripting (XSS) and data injection attacks.
**Learning:** Even static/frontend-heavy sites need CSP to strictly control which resources can be loaded and executed, preventing malicious scripts from running.
**Prevention:** Always include a strong Content-Security-Policy header in deployment configurations (e.g., `vercel.json` or `_headers`) using the principle of least privilege for content sources.
