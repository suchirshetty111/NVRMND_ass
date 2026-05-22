# VRSA Studio — Premium Digital Agency Website

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (utility styling)
- **Framer Motion** (animations)

## Design System

### Aesthetic Direction
**Brutalist minimalism meets cinematic premium** — raw scale, hot ember accents (#e84c1c), maximum contrast.

### Fonts
- **Bebas Neue** — display/headings (dramatic scale)
- **DM Sans** — body text (refined legibility)
- **DM Mono** — labels, counters, metadata

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `void` | `#050505` | Background |
| `off-white` | `#f0ede8` | Primary text |
| `ghost` | `#8a8680` | Secondary text |
| `ember` | `#e84c1c` | Accent / CTA |
| `ember-dim` | `#7a2810` | Subtle ember |

## File Structure
```
src/
├── assets/
├── components/
│   ├── Navbar.tsx      — Sticky glassmorphism nav + mobile menu
│   ├── Hero.tsx        — Fullscreen canvas particle hero
│   ├── About.tsx       — Split layout with stats
│   ├── Services.tsx    — 6-card grid with hover effects
│   ├── Work.tsx        — Animated project list with preview cards
│   ├── CTA.tsx         — Centered CTA with grid overlay
│   └── Footer.tsx      — Minimal dark footer
├── pages/
│   └── Home.tsx        — Page composition
├── styles/
│   └── globals.css     — Custom cursor, noise texture, scrollbar
├── utils/
│   └── animations.ts   — Framer Motion variant library
├── App.tsx             — Root with cursor + noise overlay
├── main.tsx            — React DOM entry
└── types.ts            — TypeScript interfaces
```

## Key Features
- **Custom CSS cursor** — dot + lagging ring with hover scaling
- **Particle canvas** — animated ember dots in hero
- **Noise texture overlay** — fixed film grain
- **Scroll-triggered animations** — Framer Motion whileInView
- **Stagger animations** — cascade reveals
- **Hover preview cards** — work items reveal gradient thumbnails
- **Mobile hamburger** — clip-path animated full-screen nav
- **Glassmorphism navbar** — backdrop-blur on scroll

## Animation System (utils/animations.ts)
| Variant | Effect |
|---------|--------|
| `fadeUp` | Slide + fade from below |
| `heroText` | Large skewed entrance |
| `staggerContainer` | Parent orchestrator |
| `staggerItem` | Child cascade |
| `clipReveal` | Clip-path curtain |
| `lineReveal` | ScaleX grow |
| `scaleIn` | Subtle scale entrance |

## Deployment
```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, or any static host
```

---
© 2026 VRSA Studio Inspired Experience
