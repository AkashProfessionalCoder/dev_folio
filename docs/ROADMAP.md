# DevFolio Forge — Next Version Plan (v2)

## Where the product stands

**What works today.** You get 5 templates and a form that builds itself from each template's schema. There is a live preview and auto-save. Export gives you a ZIP of a real React + Vite + Tailwind project.

**What sets it apart.** You own the code. Most competitors keep you on their platform: Webflow, Framer, Wix and Squarespace host your site and charge monthly. The newer AI "resume → portfolio" tools work the same way: Relio, CVFolioX and Portfolioly turn a resume into a site in about 30 seconds but keep it on their platform. None of them gives you clean source code you can keep. Every part of this plan should build on that strength.

**What stops people using it today:**
1. **No publishing.** After exporting, a user still has to install Node, build the project and deploy it. Most people, including many developers, stop at that step. What people actually want is a link they can share.
2. **Filling in data by hand is slow.** Everyone already has this information in a resume, on LinkedIn or on GitHub. Competitors import it, and DevFolio makes users type it again.
3. **Switching templates loses your data.** Each template has its own field keys, so data entered for one template doesn't carry over to another.
4. **No image uploads.** The `image` field type is only a text box for a URL.
5. **Only developers are served.** All 5 templates are for software engineers.

## Phase 0 — Fix before adding anything (1 week)

### Security (urgent)
- **Remove `GET /api/auth/debug-env`.** It is public, with no auth, and returns the first and last 6 characters of `MONGODB_URI` and `JWT_SECRET`. If it has been deployed, **rotate both the MongoDB password and `JWT_SECRET`** afterwards.
- Remove the `console.log` of `MONGODB_URI` in `server/src/server.js`.
- Restrict `cors()` to `CLIENT_URL`. The variable already exists but nothing uses it.
- Add `helmet` and add rate limiting on `/api/auth/*` (e.g. `express-rate-limit`).
- Check `templateId` on create, and check the size and shape of `portfolioData` on update with zod. The zod dependency is already installed.
- Stop returning `err.message` from 500 responses.

### Template code in one place
Today each template's components exist twice: as React files in `client/src/templates/` and as hand-copied strings in `server/src/services/export.service.js`. The two copies will drift apart.

**Fix:** make the export read the real files from `client/src/templates/<slug>/` and zip them, generating only `App.jsx`. Add `client/src/templates/**` to `includeFiles` in `vercel.json`. This removes about 750 lines of string-copied code, and adding a template becomes a client-only change plus a seed entry.

### One data shape
Store `portfolioData` nested by section everywhere: in the editor, the database, the preview and the export. Today the editor stores it flat, while templates and export expect nested, so there is glue code to convert between them. Do this as part of the Phase 1 data model change.

### Tests
There are no tests today. Add Vitest and start with:
- data-shape conversion;
- an export smoke test: unzip the export, run `npm install && npm run build`, and check that it passes for every template.

The smoke test protects the core promise: the exported code always works.

## Phase 1 — Core value: "Import, Publish, Share" (3–5 weeks)

### 1. One profile, many templates
Add a template-independent **Profile** model based on the open [JSON Resume](https://jsonresume.org/schema) standard. It covers basics, work, education, skills, projects, awards, publications, volunteer work, languages and more.
- Templates **read from the profile** and stop defining their own field keys. A template's schema then only chooses which sections to show and in what order, plus template-only extras such as a tagline or accent color.
- **Switching templates is instant and keeps all data.** This is the biggest usability improvement in the plan.
- **It works with other tools.** Users can import or export the JSON Resume they may already have, and dozens of existing tools read that format.
- **Migration:** one script maps each existing `portfolioData` into the profile.

### 2. Import instead of typing
- **Resume PDF or DOCX → profile.** The server extracts the text and sends it to an LLM (e.g. the Claude API) to fill the JSON Resume structure. The user reviews the result in the form before saving. This is the feature competitors lead with.
- **GitHub import.** Enter a username and the app uses GitHub's public API to fetch top or pinned repos, with description, stars, language and homepage, and turns them into Projects. It also fills the avatar, bio and links. No OAuth is needed for public data.
- **LinkedIn.** Accept LinkedIn's official "Download your data" ZIP. Don't scrape LinkedIn: it breaks their terms of service and the scrapers break often.
- **JSON Resume file upload.** This replaces the current "Import JSON", which needs the user to know each template's internal keys.

### 3. One-click publish (hosted link)
- Publish to `/<username>`, or `/<username>/<slug>` for users with more than one portfolio. Render it with the same template components and add a **published / draft** toggle. The `status` field already exists.
- Generate SEO meta tags, an Open Graph image and a sitemap, so the shared link shows a proper preview on LinkedIn and X.
- Keep **Export Code** next to Publish, so users have both choices.

### 4. Image uploads
Add uploads for avatar, project screenshots and logos, using Vercel Blob or Cloudinary. Resize images on upload. In the export, bundle images into `public/` so the exported site doesn't depend on hosted URLs.

### 5. Editor quality
- Show validation for required fields and give each section a completeness hint, e.g. "Projects: add a screenshot".
- Let users show, hide and drag to reorder sections.
- Add a desktop / tablet / mobile toggle to the preview.
- Debounce saves instead of saving every 5 seconds, and handle save conflicts when the same portfolio is open in two tabs.

## Phase 2 — Useful for everyone (4–6 weeks)

### Beyond developers
Add templates for designers (image-heavy case studies), students and new graduates, data and ML (notebooks, papers), DevOps and cloud (certifications), and freelancers (services, testimonials, contact form). The profile model makes each new template cheap to add.

### Customization without code
Let users change accent color, font pair, light or dark mode and section layout variants. Store these as theme tokens that templates read through CSS variables, so exported code stays clean.

### Same data, more outputs
- **Resume PDF** from the same profile, in ATS-friendly single-column layouts. Keeping the website and resume in sync is a real pain for users today.
- **Exported README badge or `profile.json`** for a GitHub profile README.

### Deploy without a terminal
- "Deploy to GitHub Pages": with GitHub OAuth, create a repo, push the exported project and enable Pages with an Actions workflow. Users own the repo, so this fits the product's main promise.
- "Deploy to Vercel / Netlify" buttons in the exported README.

### Accounts and trust
- Email verification, password reset, and Google and GitHub sign-in. Today there is no password reset.
- Move the JWT out of `localStorage` into an httpOnly cookie.
- Account deletion and data export, which GDPR requires.

### Quality bar
Every template should score at least 95 on Lighthouse for accessibility and SEO. Check this in CI with the export smoke test.

## Phase 3 — Growth (later)

- **Custom domains** for hosted portfolios. This is the natural paid "Pro" feature.
- **Simple analytics:** views, referrers and link clicks, in a privacy-friendly way with no cookies.
- **AI writing help:** "improve this bullet" and "write a project description from my repo README". Keep it optional and editable.
- **Template marketplace:** the existing `/template-creator` placeholder. With the profile model, a template is just React components that read the profile. Community templates must be reviewed before they go live, because they are code that runs on your domain.
- **Content in other languages** (i18n).

## Suggested order and success measures

| Order | Item | Why first | Measure |
|---|---|---|---|
| 1 | Phase 0 security | Live exposure of secret fragments | Endpoint gone, secrets rotated |
| 2 | Template code in one place + tests | Every later feature touches templates | Export build passes for all templates in CI |
| 3 | Profile model (JSON Resume) | Unlocks import, template switching, PDF | Switch templates with zero data loss |
| 4 | Resume + GitHub import | Biggest cut in time to first preview | Median time from signup to first full preview < 3 min |
| 5 | Publish + OG images | Gives users the link they want | % of portfolios published; shares |
| 6 | Image upload, editor quality | Completeness | % of portfolios with a photo and 3+ projects |
| 7 | Phase 2 items | Wider audience | Signups from users who aren't developers |

## Market notes (sources)

- Hosted builders lead the market for designers. Developer guides recommend GitHub Pages when "the code is the portfolio". DevFolio can offer both: hosted publishing and code you own. [Pixpa](https://www.pixpa.com/blog/best-portfolio-website-builders), [Elementor](https://elementor.com/blog/10-best-website-builders-portfolios-2026/), [Cybernews](https://website-builders.cybernews.com/best-portfolio-website-builders/), [Seera](https://myseera.com/blog/best-portfolio-builders-developers-2026)
- Resume-to-site AI tools (Relio, CVFolioX, Portfolioly) win on speed of setup. Import is now expected. [Relio](https://www.producthunt.com/p/relio-2/relio-2), [CVFolioX](https://www.stork.ai/en/cvfoliox), [Portfolioly](https://scour.ing/@minezone/p/https://github.com/yashrathi-git/portfolioly)
- Recruiters skim quickly, and they want real output and *context* for each project: the problem, your role and the impact. The editor should prompt for these. [Educative](https://www.educative.io/blog/how-to-get-hired-as-a-software-engineer), [Design Gurus](https://www.designgurus.io/answers/detail/how-should-a-software-engineer-portfolio-look-like), [Proxify](https://proxify.io/knowledge-base/job-descriptions/what-makes-a-developer-portfolio-stand-out-to-recruiters)
