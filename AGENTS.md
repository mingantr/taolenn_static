# Repository Guidelines

## Project Structure & Module Organization
- `public/` — static site files served to the browser (HTML/CSS/JS).
- `src/` — source modules and components (if using a bundler).
- `assets/` — images, fonts, and downloadable files.
- `tests/` — unit/e2e tests and helpers.
- `scripts/` — maintenance and build scripts.
If a folder does not yet exist, add it when needed. Keep paths short and use kebab-case for filenames.

## Build, Test, and Development Commands
- Local preview (static): `python -m http.server 8000 -d public`
- Node workflow (if present): `npm run dev` (serve), `npm run build` (output in `dist/`), `npm test`
- Lint/format (if configured): `npm run lint`, `npm run format`
Prefer simple static serving for `public/` until tooling is added.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; max line length 100.
- HTML: semantic tags; lowercase attributes.
- CSS: BEM-style classes; one class per responsibility.
- JS/TS: `camelCase` vars/functions, `PascalCase` components, end lines with semicolons.
- Filenames: kebab-case (e.g., `site-header.css`, `main-nav.js`).
Use Prettier/ESLint if present; otherwise follow these rules.

## Testing Guidelines
- Place tests in `tests/` with `*.test.js|ts` naming.
- Unit tests: small, pure modules in `src/`.
- E2E (optional): Playwright/Cypress; start local server then run tests.
- Run with `npm test` when configured. Aim to cover critical routes and forms.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- Example: `feat: add responsive header navigation`
- PRs should include: clear description, linked issues, test steps, and screenshots for UI changes.
- Keep diffs focused; one logical change per PR.

## Security & Configuration Tips
- Do not commit secrets; use `.env.local` and add to `.gitignore`.
- Validate user input and sanitize any dynamic content.
- Keep third-party scripts to a minimum; pin versions.

## Agent-Specific Notes
- Follow this file’s scope; keep edits minimal and reversible.
- Prefer small patches and reference paths (e.g., `public/index.html:1`).
