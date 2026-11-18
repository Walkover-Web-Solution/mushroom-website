# Open Questions

Questions surfaced while drafting `docs/VISION.md` that the repository does not answer. An owner should decide; until then, agents treat these as unknowns—not as approved direction.

## Product & repo scope

1. **Repo boundary vs. Mushrooms platform** — Is `mushroom-website` strictly the public marketing/SEO surface, or is it expected to grow into authenticated product UI? (Code today is almost entirely public marketing; signup flows to `app.mushrooms.viasocket.com`.)

2. **README ownership** — `README.md` is a stub (`# mushroom-website`). Should this repo document deployment, environment variables, and on-call contacts here, or is that maintained elsewhere?

## Growth & experimentation

3. **Hero A/B test (variants A/B)** — What metric defines success (signup CTR, scroll depth, etc.), and who decides when to retire a variant? (Implementation: cookie `userId`, `getVariant`, UTM `utm_source` on outbound links—see `src/lib/variant.ts`.)

4. **Microsoft Clarity** — Is analytics via Clarity (`layout.tsx`) approved long-term, and are there privacy/consent requirements for EU visitors?

## Content & data

5. **Programmatic SEO pages** — What is the target scale and refresh policy for `/mcp/[slug]` and `/aiclients/*` routes? (Data from `flow.sokt.io` webhooks with ISR/revalidate.)

6. **Blog section** — Should homepage blog cards stay hardcoded (`src/components/sections/Blog.tsx`), or should they sync from `blog.viasocket.com` or a CMS?

7. **“Request plugin / AI client” SLAs** — FAQ/schema copy mentions building missing apps within 48 hours. Is that an official commitment mirrored on this site, and who owns fulfillment?

## Enterprise & partnerships

8. **Enterprise pricing path** — “Contact Sales” on pricing surfaces has no in-repo destination or CRM hook. What URL, form, or flow should the marketing site use?

9. **`viasocket.com/embed` navbar link** — What audience is this for, and should it remain prominent on the Mushrooms marketing nav?

## Security & configuration

10. **Table API auth for hero content** — `src/lib/hero-content.ts` uses a table API with an auth key (PR notes mention `VIASOCKET_TABLE_AUTH_KEY`). What is the approved secret management pattern for this repo in production?

11. **Fair usage & pricing claims** — Copy states “free for lifetime,” “no rate limits,” and enterprise availability. Where is the canonical legal/pricing policy document agents must not contradict?