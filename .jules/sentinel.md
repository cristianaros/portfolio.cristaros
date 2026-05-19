
## 2025-05-24 - Missing Security Headers in vercel.json
**Vulnerability:** The application was missing critical security headers such as `Content-Security-Policy` and `Permissions-Policy`. This could potentially expose the application to various attacks like XSS, clickjacking, and unauthorized access to browser features.
**Learning:** When deploying a frontend application using Vercel, it is important to configure security headers in `vercel.json` to ensure the application is protected against common vulnerabilities. The CSP must be carefully crafted to allow necessary resources like Google Fonts and Vercel Analytics while blocking malicious content.
**Prevention:** Always include a comprehensive set of security headers in the deployment configuration. Regularly review and update the CSP and Permissions-Policy to ensure they meet the latest security standards and application requirements.
