# IHSTGroup — Premium Education Collective

A Next.js 14 landing page for IHSTGroup, showcasing Cambridge tutoring, innovation clubs, career mentorship, IB support, language mastery, and systems learning.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion 11
- **Build:** Turbopack (dev) / Webpack (prod)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles and theme variables
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page entry
├── components/
│   ├── home/               # Page sections
│   │   ├── HomePage.tsx    # Section orchestrator
│   │   ├── HeroSection.tsx # Hero with 3D scene
│   │   ├── AnimatedText.tsx# Character-fade animation
│   │   ├── PathwaysSection.tsx # Feature section grid
│   │   ├── ClubsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── pathways/       # Sidebar navigation sub-module
│   ├── layout/             # Shared layout components
│   │   ├── Header.tsx      # Sticky top bar
│   │   ├── Navigation.tsx  # Desktop + mobile nav
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx # Dark/light toggle
│   └── ui/                 # Reusable primitives
│       ├── Badge.tsx
│       ├── Button.tsx      # Link + button union type
│       └── Card.tsx
├── constants/
│   └── content.ts          # All copy and data
├── hooks/
│   ├── useSectionObserver.ts # IntersectionObserver for scroll tracking
│   └── useTheme.ts         # localStorage-persisted theme
└── types/
    └── index.ts            # Shared TypeScript types
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint check
```

## Architecture Decisions

- **Single-responsibility components** — each file exports exactly one component
- **Discriminated union for Button** — renders `<a>` or `<button>` based on presence of `href` prop, with full type safety on the remaining attributes
- **CSS custom properties for theming** — `:root` variables redefine under `[data-theme="light"]`, consumed by utility classes like `.bg-page` and `.text-primary`
- **Content separated from components** — all copy lives in `constants/content.ts` for easy editing and future i18n
- **`@/` path alias** — all imports use the `@/` shorthand mapped to `./src/`

## Theming

The app supports dark (default) and light modes. Toggle is persisted in `localStorage` under key `ihs-theme`. The `data-theme` attribute on `<body>` drives CSS variable overrides. Utility classes in `globals.css` remap Tailwind color tokens to the active theme.
