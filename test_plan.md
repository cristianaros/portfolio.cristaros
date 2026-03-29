1. **Analyze UX issue**:
   - In `src/components/Terminal.tsx`, there are 3 icon-only buttons (`+`, `⌃`, `×`) in the Terminal Header.
   - These buttons lack `aria-label` or `title` attributes, making them inaccessible to screen readers and difficult to understand without hover context.
   - Adding Spanish ARIA labels and titles ("Nueva terminal", "Maximizar panel", "Cerrar panel") improves accessibility and general UX.
2. **Modify `Terminal.tsx`**:
   - Update lines 108-110 to include `aria-label` and `title` attributes on each button.
   - Add standard VS Code focus indicators: `focus-visible:ring-1 focus-visible:ring-vscode-accent focus-visible:outline-none rounded-sm`.
3. **Verify the changes**:
   - Run `pnpm exec tsc --noEmit` to verify there are no TypeScript errors.
   - Run `pnpm build` to verify the code compiles and builds successfully.
4. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
5. **Submit a PR**:
   - Title: `🎨 Palette: Mejorar accesibilidad de botones en Terminal`
   - Description format: 💡 What, 🎯 Why, 📸 Before/After, and ♿ Accessibility.
