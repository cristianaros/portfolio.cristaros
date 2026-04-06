## 2024-04-06 - Focus Ring Clipping on Tight Constraints
**Learning:** Icon-only buttons with tight text constraints (`leading-none`) clip focus indicators unless extra padding is applied.
**Action:** When adding focus rings to small icon buttons, always apply `px-1` and `rounded-sm` to prevent visual clipping.
