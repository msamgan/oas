# Orange Art Studio — Style Guide

Last updated: 2025-12-05 15:22

This guide documents the visual language, interaction patterns, and code conventions used in Orange Art Studio. The UI is implemented with Tailwind CSS v4 and a small set of shared component utilities. See `TAILWIND_MIGRATION.md` for migration details.

## 1. Brand & Voice

- Brand name: Orange Art Studio
- Voice: Curated, confident, encouraging; avoid jargon. Keep copy concise and supportive of new artists.
- Tone: Modern, warm, optimistic, art-forward.

## 2. Design Tokens (CSS variables via Tailwind @theme)

All tokens live in `src/app.css` inside the `@theme` block. Reference tokens using `var(--token)` inside Tailwind arbitrary values.

Primary palette:

- `--color-bg: #0f0f10` — Background (charcoal)
- `--color-surface: #151517` — Elevated surfaces/cards
- `--color-text: #f6f6f6` — Primary text
- `--color-muted: #b6b6b6` — Secondary text
- `--color-accent: #ff7a18` — Orange accent (primary brand)
- `--color-accent-2: #ffb703` — Amber accent (secondary)

Shadows & radii:

- `--shadow-1: 0 8px 30px rgba(0,0,0,0.25)` — Cards, small surfaces
- `--shadow-2: 0 12px 50px rgba(0,0,0,0.35)` — Hero/media emphasis
- `--radius: 14px` — Large components
- `--radius-sm: 10px` — Small UI

Container:

- `--container: 1200px` — Shared max-width for page content

Animations (names are used via Tailwind arbitrary values):

- `fade-in`, `fade-in-up`, `fade-in-down`, `slide-in-right`, `float`, `glow`, `shimmer`, `scale-in`, `pulse`

## 3. Tailwind Usage Guidelines

- Utility-first by default. Prefer Tailwind classes inline in JSX.
- Use shared component utilities defined in `@layer components` in `src/app.css` to avoid repetition:
    - `.oas-container` — shared page container (applies `max-w-[var(--container)] mx-auto px-6`)
    - `.oas-link` — base interactive link style (muted → bright on hover)
    - `.oas-link-underline` — underline-on-hover effect
    - `.oas-link-underline--thin` — 1px variant for subtle links
- For tokens inside utilities, use arbitrary values, e.g. `text-[var(--color-text)]`, `shadow-[var(--shadow-2)]`, `rounded-[var(--radius)]`.
- Prefer semantic composition via small UI components where repetition exists (e.g., `Container`, `Button`, `Heading`, `Section`).
- Respect reduced motion: avoid adding long-running animations to essential flows.

## 4. Typography

- Font stack is set globally in `body` (`ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial`).
- Headings: bold with tight leading; large displays can use gradient text as needed.
- Body: regular weight; default line-height is ~1.6 on dark backgrounds.
- Suggested type scale (as used in components):
    - Hero/display: `clamp(40px, 6vw, 72px)` with `leading-[1.05]`
    - Section heading: `clamp(28px, 4.6vw, 40px)`
    - Body: `clamp(16px, 2.1vw, 18px)`
    - Eyebrow: `text-xs uppercase font-bold`

## 5. Layout & Spacing

- Use `Container` component (wraps `.oas-container`) to keep consistent page margins.
- Section vertical rhythm: between 40px and 72px depending on viewport; use Tailwind spacing utilities or `clamp(...)` via arbitrary values when needed.
- Grids:
    - Featured and About sections commonly use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` or explicit column ratios via arbitrary values (e.g., `md:grid-cols-[1.1fr_0.9fr]`).
- Gaps:
    - Header nav links: ~18px (`gap-[18px]`)
    - Card grids: ~22px (`gap-[22px]`)

## 6. Components (as implemented)

- Header:
    - Sticky with blurred backdrop and soft divider.
    - Brand mark uses a conic gradient square.
    - Links use `oas-link oas-link-underline`.
    - Mobile menu via state toggling and transition classes.
- Buttons:
    - Implemented via `Button` component with primary and secondary variants.
    - Hover: subtle lift/scale; keep motion minimal.
- Hero:
    - Two-column responsive grid, gradient/animated eyebrow, animated media card with shimmer.
- Cards (Featured):
    - Border, subtle glass effect, scale and shadow on hover, staggered fade-ins.
- Newsletter:
    - Input with clear focus state; primary button; success message scales in.
- Footer:
    - Top border divider, muted text; links use `.oas-link-underline--thin`.

## 7. Motion

- Keep motion subtle. Use tokens: `animate-[fade-in_*]`, `float`, `shimmer`, etc.
- Follow prefers-reduced-motion: heavy motion should degrade to static.

## 8. Accessibility

- Provide descriptive `aria-label`s and `aria-expanded` where applicable (e.g., mobile nav).
- Maintain focus styles (browser defaults acceptable on dark theme).
- Contrast: use `--color-text` on dark backgrounds; avoid large bodies of text in accent colors.
- Images: provide alt text describing subject and medium. Prefer 4:3 crops for cards.

## 9. Code Conventions

- Language/stack: React + TypeScript + Vite.
- Components: function components with named defaults (`function Header() { ... } export default Header`).
- File naming: `PascalCase.tsx` for components, co-locate UI primitives under `src/components/ui/`.
- Styling: Tailwind utilities inline + shared `.oas-*` utilities. Avoid adding new global CSS except inside `src/app.css` under `@layer` blocks.
- Class composition: prefer readable groupings; long arbitrary values are acceptable when mapping to tokens.
- Imports: external libs first, then local components.
- Links:
    - Internal routes use `Link` from `react-router-dom`.
    - Hash anchors for in-page sections (`href="#featured"`).

## 10. Example Snippets (Tailwind-first)

Header (excerpt):

```tsx
<header className="sticky top-0 z-10 animate-[fade-in-down_0.6s_ease-out] border-b border-white/[0.06] bg-gradient-to-b from-[rgba(15,15,16,0.8)] to-[rgba(15,15,16,0.4)] backdrop-blur-md">
    <Container className="flex items-center justify-between py-4">
        <a
            className="flex items-center gap-3 text-[var(--color-text)] no-underline transition-transform duration-300 ease-out hover:scale-105"
            href="#home"
        >
            <span
                className="h-9 w-9 rounded-[10px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08),var(--shadow-1)] [background:conic-gradient(from_210deg_at_50%_50%,var(--color-accent),var(--color-accent-2))]"
                aria-hidden="true"
            />
            <span className="font-extrabold tracking-[0.2px]">Orange Art Studio</span>
        </a>
        <nav className="flex gap-[18px]">
            <a href="#featured" className="oas-link oas-link-underline font-semibold">
                Featured
            </a>
        </nav>
    </Container>
</header>
```

Hero eyebrow and button group:

```tsx
<span className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[rgba(255,122,24,0.12)] text-[#ffd7b0] text-xs font-bold tracking-wider uppercase animate-[scale-in_0.5s_ease-out]">
  <span className="inline-block w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
  Rising artists • Contemporary works
</span>
<div className="flex items-center gap-3.5 mt-7">
  <Button>Explore Collections</Button>
  <Button variant="secondary">Submit Your Portfolio</Button>
</div>
```

## 11. Roadmap

- Consider extracting additional shared utilities if patterns repeat (e.g., badge, card shell).
- Establish a documented spacing scale reference mapped to Tailwind spacing tokens.
- Evaluate adding Tailwind plugins (`@tailwindcss/forms`, `@tailwindcss/typography`) if needed.

— End of style guide —
