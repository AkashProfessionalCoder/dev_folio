# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DevFolio Forge: users pick a portfolio template, fill a schema-generated form, preview live, and export a standalone React + Vite + Tailwind project as a ZIP. Live at https://dev-folio-sepia.vercel.app/. README.md has the product overview and API endpoint list.

## Commands

Three separate npm packages (root, `client/`, `server/`); there is no test runner or linter configured.

```bash
npm run install:all      # install root + client + server deps
cp server/.env.example server/.env   # needs MONGODB_URI and JWT_SECRET
npm run seed:templates   # (re)seed Template documents into MongoDB
npm run dev              # server (nodemon) + client (vite) via concurrently
npm run dev:client       # vite only, http://localhost:5173
npm run dev:server       # server only
npm run build            # vite build of client -> client/dist
```

The API port is **5001** (`server/.env.example`, `server.js` default, and the Vite `/api` proxy in `client/vite.config.js`). The README says 5000, which is stale.

## Architecture

**Data model.** `Template` (name, `templatePath`, `schema`) and `Portfolio` (`userId`, `templateId`, `portfolioData`) in `server/src/models`. Both `schema` and `portfolioData` are `Mixed`. `templatePath` is a slug (e.g. `minimal-engineer`) that links a DB template to its React components and its export generator.

**Schema-driven editor.** Each template's `schema.sections[].fields[]` (types: `text`, `textarea`, `url`, `image`, `array`, `objectList`) drives `client/src/components/editor/SchemaForm.jsx`. Templates are seeded into MongoDB from `server/scripts/seedTemplates.js`, so a schema change only reaches the app after re-running `npm run seed:templates`.

**`portfolioData` shape is inconsistent.** The editor store (`client/src/store/portfolioStore.js`) writes data **flat**, keyed by field key (`updateField` ignores its `sectionId`). Template components expect **nested** per-section data and use fallbacks such as `portfolioData.hero || portfolioData`. `nestPortfolioData` in `server/src/services/export.service.js` converts flat to nested at export time, and passes through data that is already nested. Keep this in mind when adding fields or sections.

**One template lives in three places that must be kept in sync:**
1. Live preview components: `client/src/templates/<templatePath>/index.jsx` plus `components/`, registered in the lazy-import `templateMap` in `client/src/components/editor/TemplatePreview.jsx`.
2. Schema: the entry in `server/scripts/seedTemplates.js`.
3. Export code: `server/src/services/export.service.js` holds each template's components **as JS template-literal strings** (`generate<Name>Components`), mapped by `getTemplateComponents(templatePath)`. They are copies, not imports, so a change to a client template component must be mirrored here. Unknown `templatePath` values fall back to minimal-engineer.

Adding a template means touching all three, plus the `category` enum in `server/src/models/Template.js` if it needs a new category.

**Export flow.** `GET /api/portfolios/:id/export` (`export.controller.js`) populates the template, then `generateExport` builds the ZIP in memory with `archiver`: static scaffold files (package.json, vite/tailwind/postcss config, index.html, main.jsx, README), `src/data/portfolio.json` from the nested data, and the template components.

**Deployment (Vercel).** `vercel.json` builds `client/` to `client/dist` and routes `/api/*` to `api/index.js`, a serverless wrapper that imports the Express app from `server/src/server.js` and calls `connectDB()` per invocation (the connection is cached in a module variable). Locally `server.js` connects and calls `listen` itself. The root `package.json` has `"type": "module"`, which Vercel needs, and every package uses ES modules.

**Client.** `App.jsx` wraps routes in `ProtectedRoute`. The JWT is stored in `localStorage` as `token`; `client/src/services/api.js` attaches it and redirects to `/login` on any 401. Zustand stores: `authStore`, `portfolioStore`. The editor auto-saves every 5 seconds when dirty (`pages/Editor.jsx`). `/template-creator` is a "coming soon" placeholder.

**Server.** Express routes in `server/src/routes` call controllers in `server/src/controllers`. `middleware/auth.middleware.js` verifies the Bearer JWT with `JWT_SECRET` and loads the user. Portfolio queries are scoped by `userId`.

## Repo notes

- `.playwright-mcp/` holds committed Playwright MCP snapshots and screenshots; it is not application code.
- `server/.env.prod` and `generated/` are gitignored.
- `server/src/server.js` logs `process.env.MONGODB_URI` on connect, which leaks the connection string into logs.
