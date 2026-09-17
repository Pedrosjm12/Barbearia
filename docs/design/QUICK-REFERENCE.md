# Quick Reference — Talentos Black Design System

One-page cheat sheet for designers and developers.

---

## Color Tokens

```
Primary:    #000000  Black       → Backgrounds, primary text
Secondary:  #F5F1E8  Cream       → Body text, secondary backgrounds
Accent:     #E63946  Red         → Actions, emphasis, CTAs
Support:    #2A2A2A  Charcoal    → Cards, subtle backgrounds
            #E8E8E8  Light Gray  → Disabled, dividers
```

**Usage**: Red only in CTAs and focus states. Everything else is black, cream, or charcoal.

---

## Typography Scale

| Name | Size | Weight | Line Height | Use |
|------|------|--------|-------------|-----|
| XL Headline | 48px | 900 | 1.1 | Hero text, main titles |
| L Headline | 32px | 800 | 1.2 | Section headers |
| M Headline | 24px | 700 | 1.3 | Card titles, subsections |
| S Headline | 18px | 700 | 1.4 | Small headings |
| Body Large | 18px | 400 | 1.6 | Prominent text |
| Body | 16px | 400 | 1.6 | Default body text |
| Body Small | 14px | 400 | 1.5 | Secondary text |
| Caption | 12px | 500 | 1.4 | Fine print, timestamps |

**Font**: Inter (sans-serif)  
**Mono**: JetBrains Mono (for data/timestamps)

---

## Spacing Scale

| Name | Value | Use |
|------|-------|-----|
| xs | 4px | Half-unit gaps |
| sm | 8px | Small element spacing |
| md | 16px | Default padding, gaps |
| lg | 24px | Section spacing, large gaps |
| xl | 32px | Large padding, separation |
| 2xl | 48px | Section separation |
| 3xl | 64px | Large section gaps |
| 4xl | 96px | Hero/full-width spacing |

All spacing is a multiple of 8px. Use these consistently across all components.

---

## Breakpoints

| Size | Range | Context |
|------|-------|---------|
| Mobile | < 640px | Phones, small tablets |
| Tablet | 640–1024px | Tablets, small laptops |
| Desktop | > 1024px | Large screens |

**Approach**: Mobile-first design. Add features for larger screens.

---

## Component Quick Build

### Button (Primary)
```
Background: #E63946 (Red)
Text: #000000 (Black)
Padding: 12–16px vertical, 24–32px horizontal
Font: 16px Bold (700)
Border: None (square edges)
States: Hover cream fill from bottom, Focus red outline, Disabled gray
```

### Input Field
```
Background: #2A2A2A (Charcoal)
Border: 1px #E8E8E8 (Light Gray)
Text: #F5F1E8 (Cream)
Padding: 12px 16px
Focus: Red border (2px), red outline off
Error: Red border, red error text below
```

### Card
```
Background: #2A2A2A (Charcoal)
Border: 1px #E8E8E8 (Light Gray) or none
Padding: 24px
Shadow: 0 2px 8px rgba(0,0,0,0.3)
Hover: Increase shadow, no color change
```

### Focus State
```
Outline: 2px solid #E63946 (Red)
Offset: 2px
All interactive elements must show this
```

---

## Responsive Patterns

### Single Column (Mobile)
```
┌────────────────────┐
│  Headline 32px     │
├────────────────────┤
│  Body text 16px    │
│  Lorem ipsum...    │
├────────────────────┤
│ [Full Width Button]│
└────────────────────┘
```

### Two Column (Tablet+)
```
┌──────────────────────────────────┐
│       Headline 48px              │
│                                  │
├──────────────────┬───────────────┤
│ Content Column 1 │ Content Col 2 │
│                  │               │
├──────────────────┴───────────────┤
│  [Btn 1]        [Btn 2]         │
└──────────────────────────────────┘
```

### Cards Grid (Desktop)
```
┌────────────┬────────────┬────────────┐
│   Card 1   │   Card 2   │   Card 3   │
├────────────┼────────────┼────────────┤
│   Card 4   │   Card 5   │   Card 6   │
└────────────┴────────────┴────────────┘
```

Max 3 cards per row; reduce to 2 on tablet, 1 on mobile.

---

## State Matrix

### Buttons
| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | Red | Black | None |
| Hover | Cream fill (from bottom) | Black | None |
| Focus | Red | Black | Red outline +2px |
| Active | #BF2D2D | Black | None |
| Disabled | #E8E8E8 | Charcoal | None |

### Form Fields
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | Charcoal | Light Gray | Cream |
| Focus | Charcoal | Red (2px) | Cream |
| Error | Charcoal | Red (2px) | Cream |
| Disabled | Charcoal | Light Gray | Gray (50%) |

---

## Content Guidelines

### Copywriting
- **Tone**: Conversational, action-focused, urban
- **Avoid**: Jargon, marketing clichés, apologies
- **Do**: Active voice, specific benefits, short sentences
- **Button text**: "Book Your Cut" not "Submit"
- **Error text**: "Check your email and try again" not "Error 400"

### Headings
- **Case**: Sentence case ("The Best Haircuts in Uberlândia")
- **Avoid**: Single word emphasis, all caps labels
- **Do**: Let size and weight carry emphasis

### Forms
- **Labels**: Sentence case ("Your email address")
- **Required**: Red asterisk after label
- **Help text**: Gray, smaller text below field
- **Error**: Red text with ✕ icon

---

## Animation Rules

| Type | Duration | Easing | Use |
|------|----------|--------|-----|
| Hover | 150ms | smooth | Button/link hover |
| Transition | 300ms | smooth | Color, opacity changes |
| Load | 500ms | smooth | Page entrance sequence |

**Principle**: Only the three signature patterns — page curtain, button fill, image reveal/hover (DESIGN-TOKENS.md → Signature motion). No scatter effects.

**Respect**: Always check `prefers-reduced-motion` and disable for users who prefer reduced motion.

---

## Accessibility Checklist

- ✓ Contrast: 4.5:1 minimum (WCAG AA)
- ✓ Focus: Red outline, always visible
- ✓ Keyboard: Tab, Enter, Escape, Arrow keys
- ✓ Labels: Every input has a label
- ✓ Alt text: Every image
- ✓ Semantic: Use `<button>`, `<link>`, `<h1>`, not `<div>`
- ✓ Motion: Respect `prefers-reduced-motion`
- ✓ Text: Min 14px (body min 16px)
- ✓ Line height: 1.5+ for body text

---

## Tailwind Class Examples

```tsx
// Colors
className="bg-tb-black text-tb-cream border-tb-red"

// Spacing
className="p-lg gap-md mb-2xl px-4"

// Typography
className="text-3xl font-black font-display leading-tight"

// Responsive
className="text-lg sm:text-2xl md:text-4xl"

// States
className="hover:bg-tb-charcoal focus:outline-2 focus:outline-tb-red disabled:opacity-50"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"

// Flexbox
className="flex items-center justify-between gap-md"
```

---

## File Structure

```
docs/design/
├── README.md                 # Overview & getting started
├── QUICK-REFERENCE.md       # This file
├── STYLE-GUIDE.md           # Brand identity & principles
├── COLOR-PALETTE.md         # Color definitions & usage
├── TYPOGRAPHY.md            # Type scale & families
├── DESIGN-TOKENS.md         # All tokens (colors, spacing, etc.)
├── COMPONENTS.md            # Component specifications
├── PAGE-PATTERNS.md         # Page layouts & sections
├── IMPLEMENTATION.md        # Code examples & Tailwind config
└── references/
    └── design-barbearia.webp # Reference image (inspiration)
```

---

## Common Tasks

### Adding a New Button Variant
1. Define in COMPONENTS.md
2. Add styles to Button component (React)
3. Test keyboard & focus states
4. Document in README

### Creating a Form
1. Use Input component (label + error handling)
2. Use `space-y-6` for field spacing
3. Test with validation errors
4. Ensure labels are associated (id)

### Building a New Page
1. Start with Hero section
2. Add content sections (Services, Testimonials, etc.)
3. End with CTA section + Footer
4. Test on mobile first
5. Check accessibility (focus, contrast, keyboard nav)

### Implementing Focus States
All interactive elements need:
```tsx
focus:outline-2 focus:outline-offset-2 focus:outline-tb-red
```

### Responsive Image
```tsx
<Image
  src="/image.jpg"
  alt="Descriptive text"
  width={800}
  height={600}
  className="w-full h-auto"
/>
```

---

## Links to Detailed Docs

- Full style guide: [STYLE-GUIDE.md](./STYLE-GUIDE.md)
- Color specifications: [COLOR-PALETTE.md](./COLOR-PALETTE.md)
- Typography details: [TYPOGRAPHY.md](./TYPOGRAPHY.md)
- Component specs: [COMPONENTS.md](./COMPONENTS.md)
- Page layouts: [PAGE-PATTERNS.md](./PAGE-PATTERNS.md)
- Code examples: [IMPLEMENTATION.md](./IMPLEMENTATION.md)
- All tokens: [DESIGN-TOKENS.md](./DESIGN-TOKENS.md)

---

## Questions?

1. **Does it fit the brand?** → Check STYLE-GUIDE.md
2. **What color should this be?** → Check COLOR-PALETTE.md
3. **How big should the text be?** → Check TYPOGRAPHY.md
4. **What spacing to use?** → Check DESIGN-TOKENS.md
5. **How do I build this component?** → Check COMPONENTS.md & IMPLEMENTATION.md
6. **Is it accessible?** → Check Accessibility Checklist above
7. **How do I lay out a page?** → Check PAGE-PATTERNS.md

When in doubt: **High contrast, minimal ornamentation, bold typography, red accent only for actions.**

---

**Last Updated**: September 16, 2026  
**System Version**: 1.0  
**Status**: Complete & ready for implementation
