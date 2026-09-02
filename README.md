# Fieldbook — Forms Index Site

A static site that displays every program/section as a card and links out to
its own Google Form. There is no backend, no database, and no form data is
ever processed by this site — every submission goes straight to Google Forms.

---

## 1. Project structure

```text
fieldbook-site/
│
├── index.html              All markup, sections, and the Tailwind config
│
├── src/
│   ├── js/
│   │   ├── config.js        Section/card data — edit this to add or change cards
│   │   └── main.js           All interactive behavior (nav, theme, reveals, etc.)
│   │
│   └── assets/
│       ├── images/           Real screenshots go here (see section 4)
│       └── icons/            Reserved for any custom icons you add later
│
├── package.json             Optional local dev server script
└── README.md
```

### About the Tailwind setup

This project loads Tailwind via the **Tailwind CDN build**
(`<script src="https://cdn.tailwindcss.com">` in `index.html`) instead of a
compiled PostCSS pipeline. For a small static site like this, it keeps the
project runnable with zero build step while still using Tailwind utility
classes as the primary styling system everywhere in the markup — there is no
large custom CSS file. The only hand-written CSS lives in a single `<style>`
block in `index.html` and is limited to things Tailwind utilities genuinely
can't express (CSS custom properties for the theme toggle, keyframes, and the
dashed "index card" texture).

If you later want a compiled/production Tailwind build (smaller CSS, no
CDN dependency), that's a straightforward follow-up — this structure will
drop into a standard `tailwind.config.js` + PostCSS setup without changing
any markup.

---

## 2. Running it locally

You do **not** need Node.js just to view the site — but you do need to serve
it over `http://`, not open it directly as a `file://` path, because
`src/js/main.js` uses native ES modules (`import`/`export`), which browsers
block from `file://` for security reasons.

**Option A — no install, using Node's `npx`:**

```bash
npm run dev
```

This runs `npx serve . -l 5173` and prints a local URL (usually
`http://localhost:5173`).

**Option B — Python (already installed on most machines):**

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173` in your browser.

---

## 3. Adding, editing, or removing a section/card, or a category

> **Note on `config.js`:** if you ever end up with two copies of this file
> (e.g. a loose `config.js` sitting next to the `fieldbook-site` folder),
> only **one** matters: `fieldbook-site/src/js/config.js`. That's the copy
> actually loaded by `index.html`. A stray copy elsewhere in a downloads
> folder is just a leftover from an earlier download and is safe to delete.

Open `src/js/config.js`. It has two arrays: `categories` (the filter
buttons, e.g. one per doctor) and `pagesData` (the cards themselves).
Neither has a fixed size — add or remove as many of either as you want.

**Categories:**

```javascript
{ id: 'dr-newname', label: 'دکتر جدید' },
```

- To **add** a category, add a new line like the one above to the
  `categories` array.
- To **remove** one, delete its line — just make sure no card below still
  references that `id` afterward (reassign those cards to a different
  category first).
- The `{ id: 'all', ... }` entry should stay — it's the "show everything"
  tab.

**Cards:**

```javascript
{
  fileNo: '06',
  title: 'New Section Title',
  description: 'One or two sentences describing this section.',
  category: 'dr-newname',   // must match an id from `categories` above
  status: 'Open',
  image: 'src/assets/images/new-section.png',
  formUrl: 'https://docs.google.com/forms/d/e/EXAMPLE_FORM_ID/viewform',
}
```

- To **add** a card, add a new object to the `pagesData` array.
- To **remove** one, delete its object.
- To **reorder**, reorder the array — cards render in array order.

Nothing in `index.html` needs to change either way — the grid and the
filter bar are both rendered from this one file by `src/js/main.js`.

---

## 4. Replacing a placeholder image

Each card already tries to load its real screenshot from the `image` field
in `config.js`. If that file doesn't exist yet (or fails to load for any
reason), a generated placeholder graphic is shown automatically instead —
you'll never see a broken-image icon. To use a real screenshot:

1. Add your image file to `src/assets/images/` (e.g. `membership.png`).
2. In `src/js/config.js`, make sure that card's `image` field points to the
   exact path, relative to `index.html` — e.g.
   `'src/assets/images/membership.png'`.

That's it — no other file needs to change. If the image still doesn't show
up after this, open the browser console (`F12` → Console tab) and check for
a 404 for that exact path; it usually means the filename or folder doesn't
match what's in `config.js` exactly (this is case-sensitive).

---

## 5. Replacing a Google Form URL

In `src/js/config.js`, every card has a `formUrl` field marked with a `TODO`
comment:

```javascript
formUrl: 'https://docs.google.com/forms/d/e/EXAMPLE_FORM_ID/viewform', // TODO: replace with real Google Form URL
```

Replace the placeholder with your real form's "Send" / share link. Forms
always open in a new tab with `rel="noopener noreferrer"` for security — this
is handled automatically by `buildCard()` in `main.js` and doesn't need to be
repeated per card.

---

## 6. Customizing the theme

The site ships with two built-in themes — **Ink** (dark, default) and
**Parchment** (light) — toggled by the sun/moon-style icon in the navbar and
remembered via `localStorage`.

Both palettes are defined as CSS custom properties at the top of the
`<style>` block in `index.html`:

```css
:root[data-theme="ink"] {
  --bg: #14181c;
  --surface: #1b2229;
  --surface-2: #232b33;
  --paper: #efe8d8;
  --text: #ede7d9;
  --muted: #8b96a1;
  --accent: #c99a4b;
  --stamp: #b4533b;
  --border: #2e3944;
}
```

Change these hex values to restyle the whole site — every Tailwind color
utility (`bg-accent`, `text-muted`, `border-hairline`, etc.) reads from these
variables via the `tailwind.config` block earlier in `index.html`, so a
single edit updates every use of that color across the site.

Fonts are loaded from Google Fonts in the `<head>`:

- **Fraunces** — display/heading font (`font-display`)
- **Inter** — body font (`font-body`)
- **IBM Plex Mono** — labels, tags, and the file-number styling (`font-mono`)

To swap a typeface, update the Google Fonts `<link>` and the matching entry
in `tailwind.config.extend.fontFamily`.

---

## 7. How the JavaScript is organized

All interactivity lives in `src/js/main.js`, split into small, single-purpose
functions that are called once from `init()` at the bottom of the file:

| Function | Purpose |
|---|---|
| `hideLoader` | Fades out the initial loading screen once the page is ready. |
| `initThemeToggle` | Switches and persists the Ink/Parchment theme. |
| `initNavbarScrollState` | Adds a blurred background to the navbar after scrolling, throttled with `requestAnimationFrame`. |
| `initMobileMenu` | Opens/closes the mobile nav panel. |
| `renderFilterBar` / `renderCards` | Build the category filter and the card grid from `config.js` — both work with any number of entries. |
| `initHeroIntro` | Reveals the hero title word-by-word on page load (not scroll-triggered). |
| `observeReveal` | Scroll-reveal animation using `IntersectionObserver`; elements are unobserved once revealed so no work continues after. |
| `initActiveNavTracking` | Highlights the current nav link using `IntersectionObserver` on each section. |
| `initFaqAccordion` | Expands/collapses the About section's FAQ items. |
| `initLightbox` / `openLightbox` / `closeLightbox` | Modal preview for a section's screenshot, closable via click-outside, the close button, or `Escape`. |
| `initBackToTop` | Shows/hides the back-to-top button based on scroll position. |

**Performance notes:**

- No animation loops run continuously — everything is either a CSS
  transition or triggered by a real event (scroll, click, intersection).
- Scroll listeners are guarded with `requestAnimationFrame` so they run at
  most once per frame, and use `{ passive: true }`.
- `prefers-reduced-motion` is respected: reveal animations are skipped
  entirely for users who have that preference enabled (handled both in CSS
  and by short-circuiting `observeReveal` in JavaScript).

---

## 8. Before you launch

- [ ] Replace every `TODO` comment in `index.html` and `src/js/config.js`
      (title, hero copy, footer contact info, social links, and — most
      importantly — the six `formUrl` placeholders).
- [ ] Add real screenshots to `src/assets/images/` and point each card's
      `image` field at them (see section 4).
- [ ] Update the favicon/logo mark if you have one (currently a styled "F").
- [ ] Do a quick pass on mobile widths (~375px) and tablet (~768px) after
      your real copy is in, since real content lengths can shift layout.
