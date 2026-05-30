---
name: project-architecture
description: Core tech stack and intentional architectural constraints for this expense tracker
metadata:
  type: project
---

Vite 7 + React 19 SPA. No routing, no external state management, no backend — all intentional.

Dependencies: react, react-dom, recharts (bar chart). Dev: eslint with react-hooks + react-refresh plugins.

State lives in App.jsx (transactions array). Components: Summary.jsx, TransactionForm.jsx, TransactionList.jsx, SpendingChart.jsx.

Node 22 required via nvm (system Node 18 is too old for Vite 7).

**Why:** Intentional simplicity — portfolio/demo project. Do not suggest Redux, React Router, or a backend.

**How to apply:** Respect simplicity. Suggestions should stay within vanilla React hooks + local state patterns.
