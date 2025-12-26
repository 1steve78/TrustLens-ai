# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

TrustLens AI is a Next.js application that analyzes website URLs for scam/phishing risk, explains why a site may be risky, and stores both automated scans and user-submitted reports for later review.

## Tech stack

- **Framework**: Next.js 16 with the App Router (`src/app`), TypeScript, React 19.
- **Styling**: Tailwind CSS 4 (utility classes in components, `cn` helper in `src/lib/utils.ts`).
- **Database**: PostgreSQL via Prisma (`prisma/schema.prisma`), using Neon serverless adapter (`src/lib/prisma.ts`).
- **Runtime env**: Node.js / Next.js serverless routes under `src/app/api/*`.
- **AI service**: OpenRouter chat completions API, model `openai/gpt-4o-mini` (`src/lib/ai.ts`).
- **Path alias**: `@/*` → `./src/*` (configured in `tsconfig.json`).

## Core commands

All commands assume `npm` (a `package-lock.json` is present).

### Development server

```bash
npm install
npm run dev
```

- Serves the app at `http://localhost:3000` using the Next.js dev server.

### Build & production

```bash
# Build for production
npm run build

# Start production server (after build)
npm run start
```

### Linting

```bash
npm run lint
```

- Uses `eslint` with `eslint-config-next` (core-web-vitals + TypeScript) as defined in `eslint.config.mjs`.

### Tests

- There is **no test script** configured in `package.json` and no test framework set up yet, so there is currently no command to run a single test.

### Prisma & database

- Prisma is configured via `prisma.config.ts` and `prisma/schema.prisma`.
- Standard Prisma CLI commands (e.g. `npx prisma migrate dev`) can be used to manage the schema and migrations in the `prisma/migrations/` directory.

## Environment configuration

The app expects certain environment variables (defined in `.env`, not committed):

- `DATABASE_URL`: PostgreSQL connection string used by `src/lib/prisma.ts` and the Neon adapter.
- `OPENROUTER_API_KEY`: API key for OpenRouter, used by `src/lib/ai.ts` when calling `https://openrouter.ai/api/v1/chat/completions`.

Backend routes that depend on these variables (`/api/scan`, `/api/report`, DB-backed pages like `/history`) will fail if they are missing or invalid.

## High-level architecture

### Routing and layout

- **Root layout**: `src/app/layout.tsx`
  - Imports global styles (`./globals.css`).
  - Wraps all pages in a fixed, glassmorphism-style `Navbar` (`src/components/Navbar.tsx`).
  - Uses a centered `<main>` with padding and max width for all child pages.

- **Pages** (App Router):
  - `src/app/page.tsx` (`/`): Landing page with messaging and CTA; uses `FlickeringGrid` background for a subtle animated grid effect.
  - `src/app/scan/page.tsx` (`/scan`): Main scan form page; wraps `UrlInput` in a card-style container.
  - `src/app/history/page.tsx` (`/history`): Server component that queries Prisma for past scans and displays them as cards with risk badges.

- **Navigation**:
  - `src/components/Navbar.tsx` renders a fixed top navbar with:
    - Brand (icon + "TrustLens AI") linking to `/`.
    - A "Scan" link to `/scan`.

### Risk analysis pipeline

The core application logic for assessing risk is centered around the `/api/scan` route and supporting library modules.

1. **User input**
   - `src/components/UrlInput.tsx` (client component):
     - Manages URL input state and simple validation.
     - On submit, sends a `POST` to `/api/scan` with `{ url }` as JSON.
     - On success, navigates the user to `/history` using Next's `useRouter`.

2. **Scan API route** – `src/app/api/scan/route.ts`

   The `POST` handler orchestrates a multi-stage risk evaluation:

   - **Validation**: Returns `400` if `url` is missing.
   - **Text extraction placeholder**: Uses a temporary hardcoded `extractedText` string; real scraping/text extraction is intended to replace this later.
   - **Metadata enrichment** (`getDomainMetadata` from `src/lib/metadata.ts`):
     - Derives hostname from the URL.
     - Performs a lightweight HTTPS/TLS request to infer whether SSL appears valid.
     - Currently mocks domain age with a random value (placeholder before real WHOIS).
   - **Rule-based heuristics** (`calculateRiskRules` from `src/lib/rules.ts`):
     - Increases a rule score and adds human-readable reasons when:
       - Domain age is below a threshold.
       - SSL is not valid.
       - The extracted text contains urgency phrases (e.g. "urgent", "verify now").
   - **AI-based analysis** (`analyzeWithAI` from `src/lib/ai.ts`):
     - Constructs a detailed prompt describing the URL, domain age, SSL status, and extracted text.
     - Calls the OpenRouter chat completions API with `model: "openai/gpt-4o-mini"`.
     - Expects the model to respond with a JSON string containing:
       - `riskScore` (0–100),
       - `reasons` (string[]),
       - `educationTip` (string for user education).
   - **Community intelligence**:
     - Counts existing `Report` records for the URL (`prisma.report.count`).
     - Applies a small `communityBoost` to the overall score based on the number of reports.
   - **Ethical scoring & normalization** (`src/lib/ethics.ts`):
     - Combines `aiResult.riskScore`, `ruleResult.ruleScore`, and `communityBoost` into a `rawScore`.
     - Uses `normalizeRiskScore` to clamp the final risk score to `[0, 100]`.
     - Maps the final numeric score to a `riskLevel` (Low/Medium/High) and a qualitative confidence label via `riskConfidence`.
   - **Persistence**:
     - Saves the scan to the `Scan` table via `prisma.scan.create`, storing:
       - `url`,
       - normalized `riskScore`,
       - `riskLevel`,
       - a combined `reasons` array from both rules and AI.
   - **Response**:
     - Returns JSON including the scan ID, URL, final risk score/level, confidence label, reasons, education tip, and number of community reports.

3. **Reporting suspicious sites**

   - UI: `src/components/ReportButton.tsx` (client component):
     - Prompts the user for a free-text reason.
     - Sends a `POST` to `/api/report` with `{ url, reason }`.
   - API: `src/app/api/report/route.ts`:
     - Validates presence of `url` and `reason`.
     - Persists the report via `prisma.report.create`.
     - Returns the created record as JSON or a 4xx/5xx error.

4. **History view** – `src/app/history/page.tsx`

   - Server component that:
     - Fetches recent scans via `prisma.scan.findMany({ orderBy: { createdAt: "desc" } })`.
     - Renders an empty state if there are no scans.
     - For each scan, shows:
       - URL.
       - Numeric risk score.
       - A colored badge (green vs red) with icon based on whether `riskScore` exceeds a threshold.

### Data model (Prisma)

Defined in `prisma/schema.prisma`:

- **Scan**
  - `id`: `String` (cuid, primary key).
  - `url`: `String`.
  - `riskScore`: `Int`.
  - `riskLevel`: `String` (e.g. "Low"/"Medium"/"High").
  - `reasons`: `Json` (array of explanation strings from rules + AI).
  - `createdAt`: `DateTime` (defaults to `now()`).

- **Report**
  - `id`: `String` (cuid, primary key).
  - `url`: `String`.
  - `reason`: `String` (user-provided explanation).
  - `createdAt`: `DateTime` (defaults to `now()`).

### Database access layer

- `src/lib/prisma.ts` encapsulates Prisma client configuration:
  - Uses `@prisma/adapter-neon` with `DATABASE_URL` to connect to Neon/PostgreSQL.
  - Caches the Prisma client on `globalThis` in non-production environments to avoid connection churn during hot reloads.
  - Exports a singleton `prisma` that is imported by API routes and server components.

### Utility and UI support

- `src/lib/utils.ts`: defines `cn`, a Tailwind-aware `className` merger using `clsx` + `tailwind-merge`.
- `src/components/ui/shadcn-io/flickering-grid/index.tsx`:
  - Client-side canvas effect used on the landing page for an animated background grid.
  - Uses React hooks, `ResizeObserver`, and `IntersectionObserver` to drive animation for visible regions only.

## Conventions for future changes

- Prefer importing from the `@/*` alias rather than relative paths (e.g. `@/lib/prisma`, `@/components/UrlInput`).
- Keep risk calculation logic modular in `src/lib/*` so UI components remain thin and focused on presentation and orchestration.
- When extending the data model, update `prisma/schema.prisma`, run Prisma migrations, and adjust API routes and pages that depend on the affected models.
