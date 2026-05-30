---
name: deploy
description: Runs lint, builds the production bundle, and pushes to the staging branch. Invoke with /deploy.
---

When the user runs `/deploy`, execute the following steps in order. Stop immediately and report the failure if any step exits with a non-zero code — do not proceed to the next step.

## Steps

### 1. Lint

```bash
npm run lint
```

Report any ESLint errors clearly. A clean lint is required before building.

### 2. Production build

```bash
npm run build
```

Confirm the build succeeded and note the output size from Vite's summary.

### 3. Push to staging

```bash
git push origin HEAD:staging
```

This pushes the current local branch (whatever it is) to the remote `staging` branch.

## Reporting

After all three steps succeed, summarise:
- Lint: passed
- Build: passed (include bundle size)
- Staging: pushed (include the commit SHA that was pushed)

If a step fails, report which step failed, paste the relevant error output, and do not run subsequent steps.
