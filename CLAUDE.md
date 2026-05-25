# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

The system Node.js (v18) is too old for Vite 7, which requires Node 20.19+ or 22.12+. Use the nvm-managed Node 22 binary directly:

```bash
npm install
~/.nvm/versions/node/v22.18.0/bin/node ./node_modules/vite/bin/vite.js --port 5173
```

Then open `http://localhost:5173`.

Other commands work fine with the default `npm`:

```bash
npm run build   # production build
npm run lint    # ESLint
npm run preview # preview production build
```

## Architecture

Single-page React app with no routing, no external state management, and no backend. All application logic lives in one file:

- **`src/App.jsx`** — the entire app: transaction state, derived totals (income, expenses, balance), add-transaction form, type/category filters, and the transaction table. Everything is in a single `App` component using `useState`.
- **`src/App.css`** — all styles.

## Known Intentional Issues

This is a course starter project (codewithmosh.com Claude Code course) that ships with deliberate bugs to be fixed during the course:

- **Amount bug**: transaction `amount` values are stored as strings (from `<input type="number">`, which still yields a string). The `reduce` calls that compute totals do string concatenation instead of numeric addition, producing garbled values in the summary cards.
