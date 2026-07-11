# Ink & Index — Animated Portfolio

A single-page animated portfolio built with **React 18**, **Vite**, and **GSAP**
(ScrollTrigger + `@gsap/react`). Dark, editorial, print-inspired theme with a
loading sequence, scroll-driven reveals, and a pinned "ticker" section as the
signature moment.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build       # production build -> dist/
npm run preview     # preview the production build
```

Requires Node 18+.

## Folder structure

```
portfolio/
├── index.html                 # HTML shell, Google Fonts, meta tags
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Page assembly + loader state + ScrollTrigger.refresh()
    ├── components/
    │   ├── Loader/              # Full-screen % counter, wipes away on complete
    │   ├── Navbar/               # Fixed nav, mobile slide-in menu
    │   ├── Hero/                 # Landing section, char-by-char name reveal
    │   ├── Marquee/               # Signature pinned horizontal "ticker" section
    │   ├── About/                 # Pinned image + copy reveal + counters
    │   ├── Skills/                 # Staggered skill grid
    │   ├── Projects/                # Editorial numbered project index
    │   ├── Contact/                   # Large CTA with char reveal
    │   └── Footer/
    │       └── Component.jsx + Component.css   (co-located per component)
    ├── data/
    │   ├── projects.js           # Edit this to add/remove project rows
    │   └── skills.js              # Edit this to change skill groups
    ├── hooks/
    │   └── useIsMobile.js          # Breakpoint hook used to branch heavy vs light animation
    └── styles/
        ├── variables.css            # Color/type/spacing design tokens — start here
        └── base.css                   # Reset, global typography, utility classes
```

Each component owns its own CSS file next to it (`Hero.jsx` + `Hero.css`) so
styles stay scoped to the section that uses them and nothing gets tangled as
the page grows.

## Color theme — "Ink & Index"

A press-room palette: near-black ink background, bone-paper text, and one
loud signal-orange accent used sparingly (the marquee band, links, numerals).
All tokens live in `src/styles/variables.css`:

| Token           | Value      | Use                                |
|-----------------|-----------|-------------------------------------|
| `--bg`          | `#0b0b0c` | Page background                     |
| `--bg-alt`      | `#141416` | Panel background                    |
| `--paper`       | `#f2efe9` | Primary text                        |
| `--ink-dim`     | `#8a8a85` | Secondary text                      |
| `--accent`      | `#ff4b1f` | Signal color — CTAs, numerals, marquee |
| `--moss`        | `#7c9473` | Secondary accent — tags, labels     |
| `--line`        | `#2a2a2a` | Hairline rules                      |

Type: **Anton** (condensed display), **Space Grotesk** (body/UI), **JetBrains
Mono** (labels, numerals, captions) — loaded via Google Fonts in `index.html`.

To re-theme the whole site, edit `variables.css` only; every component reads
from those custom properties.

## The animation system

- **Loader** (`components/Loader`): GSAP timeline drives a numeric counter
  0→100 in sync with a fill bar, then wipes the whole overlay upward.
  `App.jsx` locks `body` scroll until it finishes, then calls
  `ScrollTrigger.refresh()` so pinned sections measure real layout.
- **Hero**: name is split into `<span>` characters in JS and revealed with a
  staggered `yPercent` tween; a faint background word parallaxes on scroll.
- **Marquee** (signature element): on desktop the section **pins** and a long
  strip of words is translated horizontally as the user scrolls vertically
  (`scrub` tied to `ScrollTrigger`) — the page's own scroll becomes the
  ticker's motor. On mobile it swaps to a lightweight self-running marquee
  via `useIsMobile`, since pinned scroll-jacking is unreliable on touch.
- **About / Skills / Projects / Contact**: standard scroll-triggered
  reveals (`fromTo` + `ScrollTrigger`, `start: "top 85%"`) with staggers per
  row/word so content animates in as it enters the viewport, not all at once.
- All animations are wrapped in `useGSAP()` from `@gsap/react`, which scopes
  selectors to each component and auto-cleans tweens/ScrollTriggers on
  unmount — safe for React's render cycle and hot reload.

## Accessibility & responsiveness

- `prefers-reduced-motion: reduce` disables/shortens all CSS transitions and
  animations globally (see `base.css`). For a production site you'd also want
  to gate the GSAP timelines behind `window.matchMedia('(prefers-reduced-motion: reduce)')` — swap animated tweens for `gsap.set()` in that branch.
- Visible focus outlines on all interactive elements.
- Layout uses `clamp()` fluid type and CSS Grid with breakpoints at `~860px`
  and `~640px`; the pinned marquee is disabled below 768px in favor of a
  lighter auto-scrolling version (see `hooks/useIsMobile.js`).
- Mobile nav becomes a full-screen slide-in menu with a burger toggle.

## Customizing content

- **Name / copy**: edit text directly in `Hero.jsx`, `About.jsx`, `Contact.jsx`.
- **Projects**: edit `src/data/projects.js` — the list re-renders automatically.
- **Skills**: edit `src/data/skills.js`.
- **Real photography**: replace the placeholder pattern in
  `About/About.css` (`.about-panel-inner`) with an `<img>` inside
  `About.jsx`, or drop images into `src/assets/` and import them.

## Deploying

`npm run build` outputs a static `dist/` folder — deploy it to Vercel,
Netlify, Cloudflare Pages, or any static host.
