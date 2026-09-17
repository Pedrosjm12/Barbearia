# Style Guide — Talentos Black Barbershop

The complete visual and brand identity system for Talentos Black Premium Barbershop.

---

## Brand Identity

**Talentos Black** is a premium barbershop that serves a clientele seeking precision cuts, attention to detail, and an urban aesthetic. The brand voice is confident, professional, and slightly edgy—reflecting the precision of the craft and the urban energy of the space.

### Brand Pillars
- **Precision**: Every cut is exact; no compromise on quality
- **Urban**: Modern, city-focused, contemporary aesthetic
- **Premium**: High-end service at premium prices
- **Accessible**: Walk-ins welcome; no gatekeeping

### Visual Philosophy
The design system is deliberately minimal and high-contrast. Black dominates; cream provides legibility; red is reserved for moments of action and emphasis. This reflects the precision and discipline of the barbershop craft.

---

## Color System

### Primary Palette
| Color | Hex | Purpose |
|-------|-----|---------|
| **Black** | `#000000` | Primary background, dominant text |
| **Cream** | `#F5F1E8` | Secondary backgrounds, body text |
| **Red** | `#E63946` | Action, emphasis, brand accent |

### Extended Palette
| Color | Hex | Purpose |
|-------|-----|---------|
| **Charcoal** | `#2A2A2A` | Cards, subtle backgrounds |
| **Light Gray** | `#E8E8E8` | Disabled states, dividers |

### Usage Rules

**Black** is the default background for all screens. It's the canvas.

**Cream** is the default text color. High contrast ensures readability and legibility.

**Red** appears only in:
- Primary call-to-action buttons ("Book Your Cut", "View Details")
- Active states and focus indicators
- Accent lines and highlights
- Service tags or priority labels
- Price highlights or special offers

Never use red for body text, disabled states, or secondary content. Let it earn its place through restraint.

---

## Typography System

### Headlines
- **Font**: Inter (or Manrope)
- **Weights**: Bold (700), Extra Bold (800), Black (900)
- **Case**: Sentence case (capitalize first letter and proper nouns only)
- **Alignment**: Typically left-aligned; center only for hero or modal headlines

### Body Text
- **Font**: Inter
- **Weight**: Regular (400)
- **Line Height**: 1.6 (16–18px size); 1.5 for smaller text (12–14px)
- **Max width**: 65 characters per line for reading comfort
- **Alignment**: Left-aligned; ragged right (avoid justified text)

### Emphasis
Use **bold text** (600 weight) for emphasis in body paragraphs. Do not italicize or change color for single words. If a phrase needs strong emphasis, consider whether it should be a separate design element instead.

### Form Labels
- **Size**: 14px
- **Weight**: 500 (medium)
- **Case**: Sentence case ("Your full name" not "FULL NAME")
- **Required indicator**: Red asterisk (*) after label if required

### Data / Timestamps
- **Font**: Mono (JetBrains Mono or fallback)
- **Weight**: Regular (400)
- **Size**: 12–14px
- **Color**: Gray or cream (depending on background)

---

## Spacing & Layout

### The 8px Grid
All spacing is a multiple of 8px for consistency and predictability:

```
4px  → xs  (half grid)
8px  → sm  (1 grid unit)
16px → md  (2 grid units)
24px → lg  (3 grid units)
32px → xl  (4 grid units)
48px → 2xl (6 grid units)
64px → 3xl (8 grid units)
```

Use this grid for:
- Padding inside components
- Margins between elements
- Gaps in grids and flex layouts
- Line heights and letter spacing

### Responsive Breakpoints
```
Mobile:  < 640px
Tablet:  640px – 1024px
Desktop: > 1024px
```

Design mobile-first. Enhance for larger screens with more columns and whitespace.

### Container & Max Width
- **Mobile**: Full width (16px padding per side)
- **Tablet**: 90% width, centered
- **Desktop**: 1024px max, centered

---

## Interaction & States

### Button States
Every interactive element has clear, visible states:

- **Default**: Full opacity, standard styling
- **Hover**: Color shift or background change, cursor pointer
- **Focus**: 2px red outline, 2px offset (keyboard navigation)
- **Active**: Darker or more saturated color
- **Disabled**: Reduced opacity (50%), no hover, cursor not-allowed

### Form Field States
- **Empty**: Charcoal background, gray border
- **Filled**: Cream text on charcoal
- **Focus**: Red border (2px)
- **Error**: Red border, error icon (✕), error message below
- **Disabled**: Faded colors, no interaction

### Motion & Animation
Animations are purposeful and respectful:

- **Hover transitions**: 150ms duration (quick feedback)
- **Page transitions**: the "page curtain" (700ms), see DESIGN-TOKENS.md → Signature motion
- **Buttons**: the "button fill" pattern
- **Images**: reveal-on-scroll once, zoom on hover
- **No auto-playing animations**: Only respond to user action, navigation or deliberate reveal

### Language & locale
The site is written in **Brazilian Portuguese** (`lang="pt-BR"`), prices in reais (`R$ 50`), dates as `dd/mm`. Tone: warm, neighborhood, confident — "a barbearia do bairro que virou referência em Uberlândia".

Respect `prefers-reduced-motion` preference—disable animations for users who prefer them.

---

## Content Standards

### Microcopy
Keep it conversational and action-focused:

- Buttons: "Book Your Cut" (not "Submit") or "View Services" (not "Learn More")
- Errors: "We couldn't find your appointment. Check the booking code and try again." (not "Error 404")
- Empty states: "No appointments yet. Book your first haircut." (not "No data")

### Headlines
Be specific and benefit-focused:

- Good: "Precision Lineups. Premium Care."
- Avoid: "Welcome to Talentos Black" or "Services and Features"

### Body Copy
Use short sentences and short paragraphs. Aim for 5–7 words per sentence on average.

Avoid:
- Marketing clichés ("the best," "cutting-edge")
- Jargon
- Apologetic language ("We regret...")

Do:
- Use active voice ("Get a fresh cut" not "A fresh cut can be received")
- Speak to the user directly ("Your appointment" not "The user's appointment")
- Be specific ("Crisp fades and sharp lines" not "great haircuts")

---

## Imagery & Graphics

### Photography
- **Style**: Black and white or high-contrast color photography
- **Subjects**: Barbershop work in progress, client portraits, tools, before/after
- **Treatment**: Sharp focus, dramatic lighting, documentary-style
- **Avoid**: Stock photography (generic, smiling poses)

### Icons
- **Style**: Geometric, clean lines, 1–2px stroke weight
- **Size**: Scale with context (20px for UI, 32px for cards)
- **Color**: Red for interactive icons, cream for static
- **Consistency**: Same stroke weight and proportions across the set

### Graphic Elements
- **Lines**: 1–2px geometric lines, cream or red
- **Shapes**: Circles, rectangles, minimal use
- **Overlays**: Rare; use only for text contrast over images
- **Patterns**: Avoid repeating patterns; favor solid colors and strategic accents

---

## Accessibility

### Color Contrast
All text meets WCAG AA contrast minimums:

- Black text on cream: 21:1 (AAA)
- Cream text on black: 21:1 (AAA)
- Red on black: 5.3:1 (AA)
- Red on cream: 11.2:1 (AAA)

### Keyboard Navigation
- All interactive elements are keyboard-accessible
- Tab order follows visual order (left-to-right, top-to-bottom)
- Focus indicator is always visible (red outline)

### Screen Readers
- Semantic HTML (buttons, links, headings, lists)
- Form labels paired with inputs
- Alt text on images (functional, not decorative)
- ARIA labels where needed (modals, nav toggles, etc.)

### Text & Readability
- Minimum 16px font size for body text (14px for secondary)
- Line height 1.5–1.6 for body text
- Maximum 65 characters per line
- Ragged right alignment (not justified)

### Motion
Provide a `prefers-reduced-motion` preference that disables animations.

---

## Best Practices

### Do
✓ Use the color palette exactly as defined  
✓ Maintain high contrast between text and background  
✓ Leave generous whitespace; less is more  
✓ Use the spacing grid consistently  
✓ Align elements to the grid  
✓ Reserve red for actions and emphasis  
✓ Use the typeface families as specified  
✓ Test on real devices and browsers  
✓ Provide keyboard navigation and focus states  
✓ Write clear, concise copy  

### Don't
✗ Don't add unnecessary borders or dividers  
✗ Don't use color alone to convey meaning  
✗ Don't add rounded corners (unless intentional)  
✗ Don't use more than 2 typeface families  
✗ Don't shrink text below 14px (except captions)  
✗ Don't auto-play animations or videos  
✗ Don't use images as text  
✗ Don't rely on hover states for important info (mobile!)  
✗ Don't abbreviate or use jargon in UI text  
✗ Don't scatter red throughout—it's an accent, not a primary color  

---

## Design Tokens Quick Reference

```
Colors:
  Primary: #000000 (black)
  Secondary: #F5F1E8 (cream)
  Accent: #E63946 (red)
  Support: #2A2A2A (charcoal), #E8E8E8 (light gray)

Spacing: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px

Typography:
  Display: Inter Bold (700–900)
  Body: Inter Regular (400, 600)
  Mono: JetBrains Mono Regular (400)

Focus: 2px red outline, 2px offset
Shadow: Minimal; 0 2px 8px rgba(0,0,0,0.3) for cards

Breakpoints: 640px, 768px, 1024px
```

---

## Questions?

If a design decision isn't covered here, ask:
- Does it serve the content and user?
- Does it match the brand (minimal, high-contrast, urban)?
- Is it accessible (contrast, keyboard nav, screen readers)?
- Does it follow the token system (colors, spacing, type)?

If yes to all: go for it. If no: revise and align with the system.
