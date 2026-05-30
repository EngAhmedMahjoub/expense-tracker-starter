---
name: known-issues
description: Bugs and anti-patterns identified in the 2026-05-30 review; update as issues are fixed
metadata:
  type: project
---

Identified in review of commit c457aa4 → 22c2dfc era (post-redesign + SpendingChart addition):

## Correctness
- App.jsx seed data line 14: "Freelance Work" marked type:"expense" but category:"salary" — data inconsistency, likely a copy-paste bug.
- App.jsx handleAdd: spread `[...transactions, transaction]` instead of functional updater `prev => [...prev, transaction]` — stale closure risk under concurrent/batched updates.
- TransactionList.jsx line 51: amount displayed as raw `t.amount` without `.toFixed(2)` — floats from parseFloat can render as ugly decimals (e.g., "45.099999").
- Summary.jsx: defensive `parseFloat` on amounts that are already numbers in state — not a bug but indicates mistrust of data shape; worth normalizing at source.
- SpendingChart.jsx: `parseFloat(t.amount)` on data that is already a number — same trust issue.

## Accessibility
- TransactionForm.jsx: all inputs have placeholder but no <label> elements — screen readers cannot identify fields.
- TransactionList.jsx: empty <th></th> for the delete column — should have aria-label or sr-only text.
- TransactionList.jsx: `window.confirm` blocks the main thread and is inaccessible to screen readers / assistive tech.
- SpendingChart.jsx: chart has no aria-label or role="img" + description — invisible to screen readers.
- App.jsx header h1 has CSS `::after` content "_" (blinking cursor) injected via CSS — this phantom character is announced by some screen readers.

## Maintainability
- `categories` array duplicated in TransactionForm.jsx and TransactionList.jsx — single source of truth should live in src/constants.js.
- SpendingChart.jsx: inline style objects defined inside JSX on every render — extract to named constants above the component.
- TransactionList.jsx: inline arrow function inside onClick (`() => { if (window.confirm...) }`) creates a new function on every render per row.

## CSS / Design
- App.css: `outline: none` on form inputs with no visible focus replacement beyond box-shadow — low contrast focus indicator may fail WCAG 2.4.7 in some themes.
- index.css scanline overlay uses `z-index: 9999` — will cover any future modals/dialogs/tooltips unless they exceed this z-index.
