# Artists Page - Visual Component Guide

## 🎨 Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      HERO SECTION                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [Discover Talent Badge] ● Pulsing                   │  │
│  │                                                       │  │
│  │           MEET OUR ARTISTS                           │  │
│  │         (Gradient Heading)                           │  │
│  │                                                       │  │
│  │  Explore the creators behind the works...            │  │
│  │                                                       │  │
│  │  [Submit Portfolio]  [Commission Work]               │  │
│  └──────────────────────────────────────────────────────┘  │
│                  Animated Gradient Background                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               FEATURED ARTISTS SPOTLIGHT                     │
│  Featured Artists · Spotlight                                │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ ★       │  │ ★       │  │ ★       │                     │
│  │ [Image] │  │ [Image] │  │ [Image] │                     │
│  │  Area   │  │  Area   │  │  Area   │                     │
│  │         │  │         │  │         │                     │
│  │ Aya Kim │  │ Yusuf R.│  │ Amara J.│                     │
│  │ Genre   │  │ Genre   │  │ Genre   │                     │
│  │ Bio...  │  │ Bio...  │  │ Bio...  │                     │
│  │ 24 works│  │ 15 works│  │ 19 works│                     │
│  │ 📍 Seoul│  │ 📍 Dubai│  │ 📍 NYC  │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│     Shimmer on hover + 3D lift effect                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  BROWSE ALL ARTISTS                          │
│                                                              │
│  Category Filters:                                           │
│  [All] [Abstract] [Contemporary] [Digital] [Geometric]...    │
│   ▲                                                          │
│   Active (Orange gradient)                                   │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ [Image] │  │ [Image] │  │ [Image] │                     │
│  │  Area   │  │  Area   │  │  Area   │                     │
│  │         │  │         │  │         │                     │
│  │ Artist  │  │ Artist  │  │ Artist  │                     │
│  │ Genre   │  │ Genre   │  │ Genre   │                     │
│  │ Bio...  │  │ Bio...  │  │ Bio...  │                     │
│  │ Works → │  │ Works → │  │ Works → │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ [Image] │  │ [Image] │  │ [Image] │                     │
│  │  Area   │  │  Area   │  │  Area   │                     │
│  │         │  │         │  │         │                     │
│  │ Artist  │  │ Artist  │  │ Artist  │                     │
│  │ Genre   │  │ Genre   │  │ Genre   │                     │
│  │ Bio...  │  │ Bio...  │  │ Bio...  │                     │
│  │ Works → │  │ Works → │  │ Works → │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                              │
│  ... (Grid continues based on filter)                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   CALL TO ACTION                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Are You an Artist?                         │  │
│  │                                                       │  │
│  │  Join our community of talented artists...           │  │
│  │                                                       │  │
│  │    [Apply Now]    [Learn More]                       │  │
│  └──────────────────────────────────────────────────────┘  │
│              Gradient Background                             │
└─────────────────────────────────────────────────────────────┘
```

## 🎬 Animation Flow

### On Page Load

```
1. Hero Section (0s - 0.8s)
   └─ Badge: scale-in → Start pulsing
   └─ Heading: fade-in-up (0s)
   └─ Description: fade-in-up (0.1s delay)
   └─ Buttons: fade-in-up (0.2s delay)
   └─ Background: gradient-shift (continuous)

2. Featured Section (when scrolled into view)
   └─ Card 1: fade-in-up (0s)
   └─ Card 2: fade-in-up (0.15s delay)
   └─ Card 3: fade-in-up (0.3s delay)
   └─ Badges: float animation (continuous)

3. Category Filters
   └─ Button 1: scale-in (0s)
   └─ Button 2: scale-in (0.05s delay)
   └─ Button 3: scale-in (0.1s delay)
   └─ ... (0.05s stagger each)

4. Artist Cards (when scrolled into view)
   └─ Card 1: fade-in-up (0s)
   └─ Card 2: fade-in-up (0.08s delay)
   └─ Card 3: fade-in-up (0.16s delay)
   └─ ... (0.08s stagger each)

5. CTA Section (when scrolled into view)
   └─ Content: fade-in-up (0.8s)
```

### On Hover

```
Featured Artist Card:
┌─────────────────────────┐
│ Before:                 │
│ - No shimmer           │
│ - Subtle border        │
│ - Base shadow          │
│                         │
│ After (300-500ms):     │
│ - Shimmer sweep →      │
│ - Orange border glow   │
│ - Lift 3px up          │
│ - Scale 1.03           │
│ - Enhanced shadow      │
└─────────────────────────┘

Artist Card:
┌─────────────────────────┐
│ Before:                 │
│ - Placeholder          │
│ - White text           │
│ - Hidden profile link  │
│                         │
│ After (400ms):         │
│ - Gradient overlay     │
│ - Shimmer effect       │
│ - Orange text          │
│ - Lift 2px up          │
│ - Scale 1.02           │
│ - "View Profile →"     │
│ - Orange glow shadow   │
└─────────────────────────┘

Category Button:
┌─────────────────────────┐
│ Inactive → Hover:       │
│ - Brighter background  │
│ - Enhanced border      │
│ - Scale 1.05           │
│                         │
│ Active (Selected):     │
│ - Orange gradient      │
│ - Dark text            │
│ - Elevated shadow      │
│ - Scale 1.05           │
└─────────────────────────┘
```

## 🎨 Color Palette in Use

### Text

```
Primary:   #f6f6f6  ███████  (Headings, important text)
Muted:     #b6b6b6  ███████  (Descriptions, metadata)
Orange:    #ff7a18  ███████  (Accents, links, active states)
Amber:     #ffb703  ███████  (Secondary accent, gradients)
Dark:      #1a1208  ███████  (Button text on orange)
```

### Backgrounds

```
Page:      #0f0f10  ███████  (Main background)
Surface:   #151517  ███████  (Cards, elevated surfaces)
Overlay:   rgba(255,122,24,0.08)  (Gradient accents)
Border:    rgba(255,255,255,0.08) (Card borders)
```

### Shadows

```
Base:      0 8px 30px rgba(0,0,0,0.25)
Enhanced:  0 12px 50px rgba(0,0,0,0.35)
Glow:      0 16px 40px rgba(255,122,24,0.2)
Button:    0 6px 20px rgba(255,122,24,0.45)
```

## 📐 Spacing System

```
Section Padding:
- Small (sm):    py-12 md:py-16
- Medium (md):   py-16 md:py-24
- Large (lg):    py-24 md:py-32

Grid Gaps:
- Card Grid:     gap-6  (24px)
- Filter Buttons: gap-2.5 (10px)

Container:
- Max Width:     1200px
- Padding:       px-6 (24px)

Card Padding:
- Featured:      p-5 (20px)
- Regular:       p-4 (16px)
```

## 🔤 Typography Scale

```
Hero Heading:    clamp(40px, 6vw, 72px)
                 Leading: 1.05
                 Weight: Bold

Section Heading: clamp(28px, 4.6vw, 40px)
                 Weight: Extrabold

Card Title:      text-xl (20px)
                 Weight: Extrabold

Genre:           text-sm (14px)
                 Weight: Semibold
                 Color: Orange

Bio:             text-sm/xs (14px/12px)
                 Color: Muted

Metadata:        text-xs (12px)
                 Color: Muted

Badge:           text-xs (12px)
                 Weight: Bold
                 Uppercase
```

## 🎯 Interactive States

### Button States

```
Primary Button:
Default:  Orange gradient → Shadow
Hover:    Lift up → Expand shadow → Ripple effect
Active:   Press down (no translate-y)

Secondary Button:
Default:  Transparent bg → White border
Hover:    Brighter bg → Enhanced border → Ripple
```

### Card States

```
Featured Card:
Default:  Gradient border → Base shadow
Hover:    Orange border → Enhanced shadow → 3D lift → Shimmer

Artist Card:
Default:  Simple border → Base shadow
Hover:    Orange border → Glow shadow → Lift → Overlay → Shimmer
```

### Filter States

```
Inactive:
Default:  Transparent → Gray text → Subtle border
Hover:    Brighter → White text → Scale up

Active:
Default:  Orange gradient → Dark text → Elevated → Scale up
```

## 📱 Responsive Breakpoints

```
Mobile (<640px):
┌──────────┐
│  Card 1  │
├──────────┤
│  Card 2  │
├──────────┤
│  Card 3  │
└──────────┘

Tablet (640px - 1024px):
┌──────────┬──────────┐
│  Card 1  │  Card 2  │
├──────────┼──────────┤
│  Card 3  │  Card 4  │
└──────────┴──────────┘

Desktop (>1024px):
┌──────────┬──────────┬──────────┐
│  Card 1  │  Card 2  │  Card 3  │
├──────────┼──────────┼──────────┤
│  Card 4  │  Card 5  │  Card 6  │
└──────────┴──────────┴──────────┘
```

## 🎭 Component Breakdown

### 1. Hero Section

```typescript
Props: None (static content)
State: None
Animations:
  - scale-in (badge)
  - fade-in-up (staggered)
  - pulse (dot)
  - gradient-shift (background)
```

### 2. Featured Spotlight

```typescript
Conditional: Only shows if featured artists exist
Data: Filtered from artists array
Cards: 1-3 responsive columns
Animations:
  - fade-in-up (staggered 0.15s)
  - float (badge)
  - shimmer (on hover)
```

### 3. Category Filter

```typescript
State: selectedCategory (string)
Categories: 8 buttons
Functionality: Filters artist grid in real-time
Animations:
  - scale-in (staggered 0.05s)
  - scale (on hover/active)
```

### 4. Artist Grid

```typescript
Data: filteredArtists (computed from selectedCategory)
Layout: Responsive 1-3 columns
Observer: Intersection Observer on scroll
Animations:
  - fade-in-up (staggered 0.08s)
  - shimmer (on hover)
  - overlay (on hover)
```

### 5. Empty State

```typescript
Conditional: Shows when filteredArtists.length === 0
Animations: fade-in-up
```

### 6. CTA Section

```typescript
Props: None (static content)
Animations: fade-in-up
```

---

**Design Philosophy**: Every element serves a purpose, every animation enhances understanding, and every interaction feels premium and intentional.
