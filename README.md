# AVCA Clone (React + Vite + Tailwind + Sanity)

A responsive recreation of avca.africa's structure and UX, built with realistic
placeholder content/media. Real copy, photography, video and the AVCA logo are
not included/reproduced — swap in real assets before using this for anything
public-facing.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

- `src/data/navigation.js` — single source of truth for the nav + all page copy.
  Add/edit routes and text here without touching components.
- `src/data/updates.js` — homepage "latest updates" cards + the four pillars content.
- `src/components/layout/` — Header (desktop dropdowns), MobileNav (drawer + accordion), Footer, Layout shell.
- `src/components/home/` — Hero, UpdatesGrid/UpdateCard, MembershipBand, NewsletterStrip.
- `src/components/blog/` — BlogCard, used by the Sanity-backed blog listing.
- `src/pages/Home.jsx` — the homepage.
- `src/pages/GenericPage.jsx` — shared template that renders all secondary
  routes from `pageContent` in `navigation.js`. Replace with dedicated page
  components as each section gets real content (e.g. a filterable grid for
  News & Insights, a profile grid for the Team page).
- `src/pages/BlogListing.jsx` / `src/pages/BlogPost.jsx` — the Sanity-backed
  Afri-Spective Blog listing and detail pages (see below).

## Design tokens (tailwind.config.js)

- Colors: `ink` (navy), `paper` (bg), `gold` (accent), `teal`/`rust` (category tags)
- Fonts: Fraunces (display/headings), Plus Jakarta Sans (body/UI) — loaded via
  Google Fonts in `index.html`.

## Media placeholders

`public/media/hero-bg.mp4` and `public/media/placeholder.png` stand in for
every image/video slot across the site (hero background, update card
thumbnails, generic page content images). Swap those two files for your real
assets and every page picks them up automatically — no component code needs
to change. The hero drops the video entirely on screens below `lg` and shows
just the static image, to keep mobile pages light.

## Sanity.io blog integration

The Afri-Spective Blog (`/news/afri-spective-blog`) is wired to Sanity — swap in your
real project credentials and it works with no code changes.

1. **Add your credentials.** Copy `.env.example` to `.env` and fill in your
   project ID, dataset, and (if you need to read drafts/private data) a token:
   ```bash
   cp .env.example .env
   ```
2. **Match the schema.** The reference schema files in `sanity-schema/` define
   the `post`, `category`, `author`, and `blockContent` (Portable Text) document
   types the app's GROQ queries expect. If your Studio project doesn't already
   have these fields, copy these files into your Studio's schema folder and
   register them in its schema index (see the comment at the top of
   `sanity-schema/index.js`).
3. **Allow CORS from your dev/prod URLs.** In sanity.io/manage → your project →
   API → CORS Origins, add `http://localhost:5173` (and your deployed domain
   later). Without this, requests from the browser will be blocked.
4. **Restart the dev server** after editing `.env` (Vite only reads env files
   on startup).

That's it — `BlogListing.jsx` fetches the post list and `BlogPost.jsx` fetches
a single post by slug and renders its Portable Text body. Until `.env` is
filled in, both pages show a friendly "Sanity isn't connected yet" state
instead of erroring.

Relevant files:
- `src/lib/sanity/client.js` — the Sanity client, built entirely from env vars
- `src/lib/sanity/queries.js` — the two GROQ queries (list + single post)
- `src/lib/sanity/image.js` — image URL builder for Sanity image fields
- `src/hooks/useSanityQuery.js` — fetch hook with loading/error/configured states
- `src/pages/BlogListing.jsx`, `src/pages/BlogPost.jsx` — the pages themselves

## Mobile responsiveness notes

- Header collapses to a hamburger below `lg` (1024px); the drawer uses an
  accordion for each dropdown's sub-links with 44px+ tap targets.
- Card grids reflow 4/3 → 2 → 1 columns; all interactive elements keep visible
  keyboard focus states and respect `prefers-reduced-motion`.

## Next steps

- Replace placeholder copy/media with real content.
- Build dedicated components for data-heavy sections (Events Calendar, Research
  library, Team/Board grids, other News listings with filtering).
- Add the real AVCA logo asset once you have a licensed copy.
