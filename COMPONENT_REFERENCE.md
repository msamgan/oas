# DRY Implementation - Component Reference

## New UI Components Created

This document provides a quick reference for all the new reusable components created during the DRY implementation.

---

## Component List

### 1. Badge (`src/components/ui/Badge.tsx`)

```tsx
import Badge from './ui/Badge'

<Badge withDot>Label</Badge>
<Badge variant="featured">Featured</Badge>
<Badge variant="glow">New</Badge>
```

**Variants:** `default`, `featured`, `glow`  
**Props:** `variant`, `withDot`, `className`, `children`

---

### 2. Card (`src/components/ui/Card.tsx`)

```tsx
import Card from './ui/Card'

<Card variant="default">Content</Card>
<Card variant="featured" badge={<Badge>★</Badge>}>Content</Card>
<Card variant="stat" animationDelay={0.1}>Stats</Card>
```

**Variants:** `default`, `featured`, `stat`, `mission`, `value`  
**Props:** `variant`, `animationDelay`, `badge`, `className`, `children`

---

### 3. ArtCanvas (`src/components/ui/ArtCanvas.tsx`)

```tsx
import ArtCanvas from './ui/ArtCanvas'

<ArtCanvas />
<ArtCanvas variant="shimmer" />
<ArtCanvas withHoverEffect />
```

**Variants:** `default`, `shimmer`, `hero`  
**Props:** `variant`, `withHoverEffect`, `className`

---

### 4. FilterButton (`src/components/ui/FilterButton.tsx`)

```tsx
import FilterButton from './ui/FilterButton'

;<FilterButton isActive={true} onClick={handleClick} animationDelay={0.05}>
    Category Name
</FilterButton>
```

**Props:** `isActive`, `animationDelay`, `onClick`, `className`, `children`

---

### 5. ArtistCard (`src/components/ui/ArtistCard.tsx`)

```tsx
import ArtistCard from './ui/ArtistCard'

;<ArtistCard name="Artist Name" genre="Genre" bio="Bio text" works={24} location="City, Country" featured={true} animationDelay={0.15} />
```

**Props:** `name`, `genre`, `bio`, `works`, `location`, `featured`, `animationDelay`

---

### 6. FeaturedWorkCard (`src/components/ui/FeaturedWorkCard.tsx`)

```tsx
import FeaturedWorkCard from './ui/FeaturedWorkCard'

;<FeaturedWorkCard title="Artwork Title" author="Artist Name" animationDelay={0.1} />
```

**Props:** `title`, `author`, `animationDelay`, `className`

---

### 7. Link (`src/components/ui/Link.tsx`)

```tsx
import Link from './ui/Link'

<Link href="/path">Link Text</Link>
<Link variant="underline" href="/path">Link</Link>
<Link variant="underline-thin" href="/path">Link</Link>
```

**Variants:** `default`, `underline`, `underline-thin`  
**Props:** `variant`, `href`, `className`, `children`

---

### 8. Input (`src/components/ui/Input.tsx`)

```tsx
import Input from './ui/Input'

;<Input type="email" placeholder="Your email" value={email} onChange={handleChange} />
```

**Props:** All standard HTML input props + `className`

---

### 9. Icon (`src/components/ui/Icon.tsx`)

```tsx
import Icon from './ui/Icon'

<Icon name="location" size={12} />
<Icon name="menu" />
<Icon name="close" />
```

**Icons:** `location`, `menu`, `close`  
**Props:** `name`, `size`, `className`

---

### 10. Logo (`src/components/ui/Logo.tsx`)

```tsx
import Logo from './ui/Logo'

;<Logo size="md" />
```

**Sizes:** `sm`, `md`, `lg`  
**Props:** `size`, `className`

---

### 11. StatNumber & StatLabel (`src/components/ui/Stat.tsx`)

```tsx
import { StatNumber, StatLabel } from './ui/Stat'

<StatNumber value="500+" />
<StatLabel>Description</StatLabel>
```

**Props:**

- `StatNumber`: `value`, `className`
- `StatLabel`: `className`, `children`

---

### 12. MissionIcon (`src/components/ui/MissionIcon.tsx`)

```tsx
import MissionIcon from './ui/MissionIcon'

;<MissionIcon emoji="🎨" />
```

**Props:** `emoji`, `className`

---

### 13. ValueNumber (`src/components/ui/ValueNumber.tsx`)

```tsx
import ValueNumber from './ui/ValueNumber'

;<ValueNumber number="01" />
```

**Props:** `number`, `className`

---

## Existing UI Components (Already Present)

### Button (`src/components/ui/Button.tsx`)

```tsx
import Button from './ui/Button'

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
```

**Variants:** `primary`, `secondary`  
**Props:** `variant`, `type`, `onClick`, `className`, `children`

### Container (`src/components/ui/Container.tsx`)

```tsx
import Container from './ui/Container'

;<Container>Content</Container>
```

**Props:** `className`, `children`

### Heading (`src/components/ui/Heading.tsx`)

```tsx
import Heading from './ui/Heading'

<Heading as="h1" variant="hero">Title</Heading>
<Heading as="h2" variant="h2">Subtitle</Heading>
```

**Variants:** `hero`, `h2`, `h3`  
**Props:** `as`, `variant`, `className`, `children`

### Section (`src/components/ui/Section.tsx`)

```tsx
import Section from './ui/Section'

;<Section padding="lg">Content</Section>
```

**Padding:** `sm`, `md`, `lg`, `xl`  
**Props:** `padding`, `className`, `children`, `id`

---

## Design Patterns

### Animation Delays

Most components support `animationDelay` prop for staggered animations:

```tsx
{
    items.map((item, index) => <Component animationDelay={index * 0.1} />)
}
```

### Variant Pattern

Components use the variant pattern for different styles:

```tsx
<Component variant="default" />
<Component variant="featured" />
```

### Composition

Components are designed to be composed together:

```tsx
<Card variant="featured" badge={<Badge variant="featured">★ Featured</Badge>}>
    <ArtCanvas variant="shimmer" />
    <div>Content...</div>
</Card>
```

---

## File Structure

```
src/
  components/
    ui/
      ArtCanvas.tsx
      ArtistCard.tsx
      Badge.tsx
      Button.tsx (existing)
      Card.tsx
      Container.tsx (existing)
      FeaturedWorkCard.tsx
      FilterButton.tsx
      Heading.tsx (existing)
      Icon.tsx
      Input.tsx
      Link.tsx
      Logo.tsx
      MissionIcon.tsx
      Section.tsx (existing)
      Stat.tsx
      ValueNumber.tsx
```

---

## Migration Guide

### Before (Heavy Classes)

```tsx
<span className="inline-flex animate-[scale-in_0.5s_ease-out] items-center gap-2 rounded-full bg-[rgba(255,122,24,0.12)] px-2.5 py-1.5 text-xs font-bold tracking-wider text-[#ffd7b0] uppercase">
    <span className="inline-block h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[var(--color-accent)]" />
    Label
</span>
```

### After (DRY Component)

```tsx
<Badge withDot>Label</Badge>
```

---

## Best Practices

1. **Always use TypeScript types** - All components are fully typed
2. **Compose components** - Build complex UIs from simple components
3. **Use className for custom styling** - All components accept className prop
4. **Leverage variants** - Use built-in variants before custom styling
5. **Animation delays** - Use for staggered entrance animations

---

## Quick Reference Table

| Component        | File                 | Main Use Case                   |
| ---------------- | -------------------- | ------------------------------- |
| Badge            | Badge.tsx            | Labels, tags, status indicators |
| Card             | Card.tsx             | All card layouts                |
| ArtCanvas        | ArtCanvas.tsx        | Artwork placeholders            |
| FilterButton     | FilterButton.tsx     | Category filters                |
| ArtistCard       | ArtistCard.tsx       | Artist profiles                 |
| FeaturedWorkCard | FeaturedWorkCard.tsx | Featured artworks               |
| Link             | Link.tsx             | Navigation links                |
| Input            | Input.tsx            | Form inputs                     |
| Icon             | Icon.tsx             | SVG icons                       |
| Logo             | Logo.tsx             | Brand logo                      |
| StatNumber/Label | Stat.tsx             | Statistics                      |
| MissionIcon      | MissionIcon.tsx      | Mission cards                   |
| ValueNumber      | ValueNumber.tsx      | Value propositions              |

---

## Support

For questions or issues with these components, refer to the main DRY_IMPLEMENTATION_SUMMARY.md document.
