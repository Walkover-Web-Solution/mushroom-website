---
covers: ["*"]
verified_at: d9e875b
verified_on: 2026-11-18
---

# Product Vision & Strategic Direction

This repository (`mushroom-website`) is the **public marketing and discovery website** for **Mushrooms by viaSocket**—the MCP layer that connects AI clients to thousands of SaaS apps so agents can take real-world actions. The site’s job is to explain that value, surface integrations and AI-client setup paths, and send visitors to the product dashboard at `app.mushrooms.viasocket.com`—not to implement MCP execution itself.

## Authoritative Sources & Status

**Sources used for this draft** (recovered, not invented):

| Source | Role |
|--------|------|
| `public/llms.txt` | Product positioning, MCP/custom-cluster narrative, canonical URLs |
| `src/app/layout.tsx` | SEO metadata, JSON-LD product/org/FAQ claims |
| `AGENTS.md` | Repo purpose, tech stack, agent workflow constraints |
| `src/app/HomeClient.tsx`, homepage sections | Current homepage structure and CTAs |
| `src/lib/*.ts` | Live data contracts (plug-service, sokt.io flows, table API) |
| `package.json` | Stack: Next.js App Router, TypeScript, Tailwind CSS |
| Recent git history | Hero DB-driven content, A/B UTM, Clarity, SEO fixes |

### Approved Direction

- **Mushrooms (product)** is an MCP-native integration layer: personal MCP server URLs, granular OAuth permissions, optimized tool execution, and a large catalog of app connections—positioned as free for lifetime under a fair usage policy with an enterprise tier (`public/llms.txt`, `layout.tsx` schema, pricing copy).
- **This repo** publishes `https://mushrooms.viasocket.com`: homepage, pricing, programmatic SEO for per-app MCP pages (`/mcp/[slug]`) and AI-client guides (`/aiclients/...`), sitemaps, and `llms.txt` for discoverability.
- Primary conversion action on the marketing site: **sign up / get MCP server URL** via `https://app.mushrooms.viasocket.com/login` (used across heroes, pricing, and integration pages).
- Implementation standards for changes here: **Next.js App Router, TypeScript, Tailwind CSS**; branch + PR workflow per `AGENTS.md`; no edits to `.env` in agent workflows.

### Current Implementation

- **Homepage**: Navbar, hero (variant **A** = `Hero`, variant **B** = DB-driven `Hero2`), integrations grid, AI clients, features, pricing band, hardcoded blog teasers, FAQ, footer (`HomeClient.tsx`).
- **Experimentation**: Anonymous `userId` cookie and 50/50 **A/B** hero split; outbound login links carry `utm_source` (`src/lib/variant.ts`).
- **Dynamic counts**: App totals from `plug-service.viasocket.com/get-apps-count` for headlines and metadata (`src/lib/apps-count.ts`).
- **Catalog data**: Integration lists/search via `plug-service.viasocket.com` (`src/lib/apps.ts`).
- **CMS-style content**: Hero2 fields from viasocket table API (`src/lib/hero-content.ts`); MCP app SEO payloads and AI-client pages from `flow.sokt.io` POST endpoints (`src/lib/mcp-app-data.ts`, `src/lib/ai-client-data.ts`, etc.).
- **Lead / request forms**: Plugin and AI-client requests POST to public sokt.io flow URLs (`src/lib/requests.ts`).
- **Analytics**: Microsoft Clarity script in root layout.
- **Edge**: Homepage uses `runtime = 'edge'` (`src/app/page.tsx`).
- **README**: Placeholder only—not operational documentation.

### Proposals & Roadmaps

- Nothing in-repo defines a formal roadmap. Inferred **in-progress or recent** work from git: hero content externalized to table API, mobile responsiveness, Google Search Console verification, normalized AI-client API identifiers, Clarity analytics, UTM preservation for A/B. Treat these as implementation history unless a PM issue/PRD states otherwise.

### Unknowns & Ambiguities

See **`docs/OPEN_QUESTIONS.md`** for decisions an owner has not stated in this repository (experiment success criteria, enterprise sales flow, blog CMS strategy, config/secrets policy, legal alignment of pricing claims, etc.).

## Target Audience & Ideal Customer Profile (ICP)

### Primary persona

- **Role**: Developer or power user running an **MCP-compatible AI client** (Claude, Cursor, ChatGPT, Windsurf, Gemini, Copilot, etc.).
- **Workflow**: Wants the AI to **act in real apps** (Slack, Gmail, GitHub, Notion, CRM, etc.) without writing and maintaining custom API glue.
- **Technical level**: Comfortable pasting an MCP server URL, OAuth-connecting apps, and scoping permissions; not necessarily building MCP servers from scratch.

### Secondary personas

- **Admins / security-conscious buyers**: Care about per-action OAuth, audit logs, and data boundaries (claimed in product copy/schema—not enforced in this repo).
- **Collaborators / integrators**: Teams wiring **custom MCP clusters** to their own APIs (described in `llms.txt`; dashboard at `app.mushrooms.viasocket.com`).
- **Auditors / evaluators**: Compare integration breadth, pricing, and MCP fit via SEO pages and FAQ/schema content.
- **Marketing / growth**: Need programmatic landing pages per app and per AI client for search and LLM discovery.

## Problems Solved & Value Proposition

| Customer problem | How Mushrooms solves it (product) | How **this website** helps |
|------------------|-----------------------------------|----------------------------|
| AI can chat but cannot **do work** in SaaS tools | MCP tools backed by real app APIs with OAuth | Explains outcome; links to signup and per-integration pages |
| Building和维护 custom API integrations per app | Large pre-built catalog + MCP standard | Browse/search integrations; SEO pages per app slug |
| Unclear which AI clients support MCP | Compatibility list and setup guides | `/aiclients/*` routes and homepage AI-clients section |
| Trust, permissions, and visibility | Granular permissions and action logs (product) | FAQ, JSON-LD, feature copy—must stay aligned with product reality |
| Discoverability in search and LLMs | — | Sitemaps, structured data, `llms.txt`, meta descriptions |

**Differentiation** (from stated copy, not independently verified): MCP-native catalog at scale, optimized execution vs. bloated context, lifetime free tier under fair usage, optional enterprise—see `layout.tsx` and `public/llms.txt`.

## Core Principles & Design Philosophy

1. **Marketing site, product elsewhere** — CTAs and auth live on `app.mushrooms.viasocket.com`; this repo does not host dashboards or MCP runtimes. *Trade-off:* faster iteration on copy/SEO without coupling to backend releases—but agents must not fake product APIs here.

2. **Authoritative remote data, safe fallbacks** — Counts, hero copy, and SEO page payloads come from live services with defaults when fetch fails. *Trade-off:* resilient pages vs. risk of stale or default copy when APIs fail.

3. **SEO and programmatic scale** — Many routes are data-driven templates (`/mcp/`, `/aiclients/`) for long-tail discovery. *Trade-off:* breadth of landing pages vs. content quality and sync latency (revalidate/webhook dependent).

4. **Measure conversion experiments** — A/B hero and UTM tagging on signup links. *Trade-off:* simplicity (cookie mod-2 split) vs. rigorous experiment design (see open questions).

5. **Stack consistency** — TypeScript, App Router, Tailwind per `AGENTS.md`. *Trade-off:* uniform agent contributions vs. no alternate frameworks in this repo.

6. **Security-minded rendering** — Validated CSS lengths and URLs for CMS-driven hero styles; timeouts on blocking fetches. *Trade-off:* defense in depth on marketing content vs. more validation code.

## Strategic Priorities & Success Measures

Stated only where the repository explicitly implies them (no numeric KPIs are defined in-repo):

| Priority | Evidence in repo |
|----------|------------------|
| Drive **signup** to Mushrooms dashboard | Pervasive CTAs to `app.mushrooms.viasocket.com/login` |
| Communicate **integration breadth** | Dynamic app count, integrations section, plug-service APIs |
| **SEO / LLM discoverability** | JSON-LD, sitemaps, `llms.txt`, per-slug MCP pages |
| **Educate on MCP** | FAQ, blog links to viasocket.com/blog, help doc links in copy |
| **Free-tier positioning** | Pricing sections, schema `offers` price 0 |

Success metrics (conversion rate, ranking targets, experiment winners) are **not stated** — see `docs/OPEN_QUESTIONS.md`.

## Boundaries & Non-Goals

**This repository deliberately does not:**

- Run MCP servers, execute tools, or store user credentials.
- Replace or duplicate the **Mushrooms dashboard** (`app.mushrooms.viasocket.com`).
- Implement authentication sessions for product users (marketing site is effectively public).
- Maintain the viaSocket automation builder (`viasocket.com/embed` is only linked from nav).

**Anti-patterns** (break the vision):

- Adding **mock MCP or plugin backends** in this repo that pretend to be production product APIs.
- Copy changes that **contradict** canonical product claims without owner approval (pricing, security, SLAs).
- Building **custom admin CMS** here when table/flow APIs already own content—prefer extending those contracts.
- Committing **secrets** or editing `.env` per agent rules; use approved env patterns for keys like table API auth.

## How Future Agents Must Evaluate Requests

Before writing code for any request:

1. **Compare to this file** — direction, ICP, principles, and non-goals above. If the request builds product/runtime behavior, it likely belongs in another repository (dashboard, MCP gateway, plug-service)—decline or redirect.

2. **Clarify ambiguous requests** — If alignment is unclear because this vision or `docs/OPEN_QUESTIONS.md` is silent, ask one blocking question rather than guessing.

3. **On conflict** — Explain which section conflicts (e.g., non-goals, boundaries) and recommend **declining** or **rescoping** the request to marketing/SEO/content/UI in this stack.

4. **Deliberate direction changes** — Require explicit human approval; update **`docs/VISION.md`** in the same change (brief delta), and add any new unknowns to **`docs/OPEN_QUESTIONS.md`**.

5. **Backend contracts** — If a feature needs new data or actions from plug-service, flows, or another API not yet used in code, **do not fabricate endpoints**. Document the required contract in **`docs/CONTRACTS.md`** (create or extend) with method, payload, auth, and failure behavior; implement only against agreed real services.

6. **Vision gate** — No `VISION.md` at repo root; **`docs/VISION.md`** is canonical for this repository. Every request is checked against it before implementation.