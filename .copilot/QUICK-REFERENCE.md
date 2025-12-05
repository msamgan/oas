# Orange Art Studio - Quick Reference Guide

> **Last Updated**: December 5, 2025

This is your quick lookup guide for the Orange Art Studio project. For comprehensive details, see [INDEX.md](./INDEX.md).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

**Dev Server**: http://localhost:5173 or http://localhost:5174

---

## 📂 File Structure Quick Map

```
src/
├── main.tsx              → App entry point
├── App.tsx               → Root component with routes
├── app.css               → Global styles + Tailwind theme
├── components/
│   ├── Header.tsx        → Sticky nav with mobile menu
│   ├── Hero.tsx          → Landing hero section
│   ├── FeaturedGrid.tsx  → Artwork gallery grid
│   ├── About.tsx         → Mission, stats, values
│   ├── Newsletter.tsx    → Email subscription form
│   ├── Footer.tsx        → Site footer
│   └── ui/
│       ├── Button.tsx      → Button component
│       ├── Container.tsx   → Layout wrapper
│       ├── Section.tsx     → Section with padding
│       └── Heading.tsx     → Typography component
└── pages/
    ├── Home.tsx          → Homepage
    └── AboutPage.tsx     → About page
```

---

## 🎨 Design Tokens

### Colors

```css
--color-bg: #0f0f10 /* Dark background */ --color-text: #f6f6f6 /* Primary text */ --color-muted: #b6b6b6 /* Secondary text */ --color-accent: #ff7a18
    /* Orange (primary) */ --color-accent-2: #ffb703 /* Yellow (secondary) */ --color-surface: #151517 /* Card background */;
```

### Spacing

```css
--container: 1200px /* Max-width */ --radius: 14px /* Border radius */ --radius-sm: 10px /* Small radius */;
```

### Shadows

```css
--shadow-1: 0 8px 30px rgba(0, 0, 0, 0.25) --shadow-2: 0 12px 50px rgba(0, 0, 0, 0.35);
```

---

## 🎬 Animations Cheat Sheet

### Keyframes (11 total)

| Name             | Duration      | Use Case                     |
| ---------------- | ------------- | ---------------------------- |
| `fade-in`        | 1s            | Simple opacity fade          |
| `fade-in-up`     | 0.8s          | Entry from bottom            |
| `fade-in-down`   | 0.6s          | Entry from top               |
| `slide-in-right` | 0.8s          | Entry from right             |
| `float`          | 6s (infinite) | Continuous vertical movement |
| `glow`           | 2s (infinite) | Pulsing shadow               |
| `shimmer`        | 3s (infinite) | Gradient highlight           |
| `scale-in`       | 0.5s          | Scale up entrance            |
| `pulse`          | 2s (infinite) | Opacity pulse                |
| `gradient-shift` | 3s (infinite) | Animated gradient            |
| `slide-across`   | 3s (infinite) | Horizontal slide             |
| `rotate`         | -             | 360° rotation                |

### Usage Example

```tsx
className = 'animate-[fade-in-up_0.8s_ease-out_0.2s_both]'
```

---

## 🧩 Component Props Quick Reference

### Button

```tsx
<Button
  variant="primary" | "secondary"  // default: "primary"
  type="button" | "submit"          // default: "button"
  onClick={handler}
  className="additional-classes"
>
  Button Text
</Button>
```

### Heading

```tsx
<Heading
  as="h1" | "h2" | "h3" | "h4"     // default: "h2"
  variant="hero" | "h2" | "h3"      // default: "h2"
  className="additional-classes"
>
  Heading Text
</Heading>
```

### Section

```tsx
<Section
  padding="sm" | "md" | "lg" | "xl"  // default: "md"
  id="section-id"
  className="additional-classes"
>
  Content
</Section>
```

### Container

```tsx
<Container className="additional-classes">Content</Container>
```

---

## 📱 Responsive Breakpoints

| Breakpoint  | Size           | Tailwind |
| ----------- | -------------- | -------- |
| Mobile      | < 640px        | (base)   |
| Tablet      | 640px - 768px  | `sm:`    |
| Desktop     | 768px - 1024px | `md:`    |
| Large       | > 1024px       | `lg:`    |
| Extra Large | > 1280px       | `xl:`    |

---

## 🎯 Common Patterns

### Gradient Text

```tsx
className = 'bg-gradient-to-br from-[var(--color-text)] to-[var(--color-accent)] bg-clip-text text-transparent'
```

### Card Hover Effect

```tsx
className = 'transition-all duration-300 hover:-translate-y-2 hover:scale-105'
```

### Underline Link

```tsx
className = 'oas-link oas-link-underline'
```

### Intersection Observer Animation

```tsx
useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        },
        { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
}, [])
```

---

## 🔧 Tech Stack Quick List

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4
- **Tailwind CSS** 4.1.17
- **React Router** 6.28.0
- **ESLint** 9.39.1
- **Prettier** 3.6.2

---

## ⚡ Performance Tips

1. Use `transform` and `opacity` for animations (GPU-accelerated)
2. Implement Intersection Observer for scroll animations
3. Use `clamp()` for responsive typography
4. Leverage Vite's code splitting
5. Ensure `prefers-reduced-motion` support

---

## ♿ Accessibility Checklist

- [ ] Semantic HTML elements
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Color contrast WCAG AA
- [ ] `prefers-reduced-motion` respected
- [ ] Alt text for images
- [ ] Proper heading hierarchy

---

## 🐛 Common Issues & Solutions

### Issue: TypeScript errors

**Solution**: Run `npm run lint` and check types with `tsc --noEmit`

### Issue: Tailwind classes not applying

**Solution**: Check `app.css` has `@import "tailwindcss"` at top

### Issue: Animations not working

**Solution**: Verify keyframes defined in `app.css` and check browser support

### Issue: Mobile menu not closing

**Solution**: Ensure `setIsMenuOpen(false)` is called on link clicks

---

## 📚 Documentation Navigation

- **[INDEX.md](./INDEX.md)** - Complete project overview (START HERE)
- **[README.md](./README.md)** - Documentation index
- **[summary.md](./summary.md)** - Feature summary
- **[technical-details.md](./technical-details.md)** - Implementation details
- **[ui-updates.md](./ui-updates.md)** - UI/UX changes
- **[changelog.md](./changelog.md)** - Version history
- **[visual-guide.md](./visual-guide.md)** - Visual examples

---

## 🔗 Useful Commands

```bash
# Type check without building
npx tsc --noEmit

# Check bundle size
npm run build && ls -lh dist/assets

# Preview production build
npm run preview

# Format specific file
npx prettier --write src/components/Header.tsx

# Lint specific file
npx eslint src/components/Header.tsx
```

---

## 💡 Quick Tips

1. **Always** use the UI components (Button, Heading, Container, Section)
2. **Follow** the design system colors and spacing
3. **Test** on mobile, tablet, and desktop
4. **Run** Prettier before committing (`npm run format`)
5. **Check** accessibility with keyboard navigation
6. **Use** TypeScript types - no `any`
7. **Keep** components small and focused
8. **Document** complex logic with comments
9. **Optimize** images before adding
10. **Review** the INDEX.md for patterns

---

**Need more details?** See the complete documentation in [INDEX.md](./INDEX.md)
