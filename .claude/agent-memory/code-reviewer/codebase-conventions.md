---
name: codebase-conventions
description: Recurring style patterns and intentional decisions observed across src/ files
metadata:
  type: project
---

- No memoization (no useMemo/useCallback/React.memo) anywhere — appears intentional given small dataset size. Do not flag as a bug, only flag if a computation is provably expensive.
- `categories` array is duplicated verbatim in TransactionForm.jsx and TransactionList.jsx — a known duplication that should be extracted to a shared constants file.
- IDs generated with `Date.now()` — acceptable for a no-backend app; not a UUID, but collision risk is negligible in single-user local state.
- Amounts stored as numbers in state (parseFloat at entry point in TransactionForm) but the seed data in App.jsx holds integer literals — consistent at runtime.
- All styles in App.css + index.css (no CSS modules, no Tailwind) — intentional flat structure.
- Terminal/Bloomberg green-on-black aesthetic; hardcoded color hex values appear inside SpendingChart.jsx inline styles (intentional for chart theming).
- ESLint config: no-unused-vars with varsIgnorePattern '^[A-Z_]' — uppercase constants are exempt. ESLint passes cleanly.
- `window.confirm` used for delete confirmation in TransactionList — native dialog, no custom modal.
