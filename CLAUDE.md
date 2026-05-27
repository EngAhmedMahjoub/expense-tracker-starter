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

Single-page React app with no routing, no external state management, and no backend.

- **`src/App.jsx`** — root component. Holds the `transactions` array in state and passes it down. Renders `Summary`, `TransactionForm`, and `TransactionList`.
- **`src/Summary.jsx`** — receives `transactions` and derives `totalIncome`, `totalExpenses`, and `balance` internally. Displays the three summary cards.
- **`src/TransactionForm.jsx`** — owns its own form state (`description`, `amount`, `type`, `category`). Calls the `onAdd` prop with a fully constructed transaction object on submit.
- **`src/TransactionList.jsx`** — receives `transactions` and owns its own filter state (`filterType`, `filterCategory`). Renders the filter controls and the transaction table.
- **`src/App.css`** — all styles.
