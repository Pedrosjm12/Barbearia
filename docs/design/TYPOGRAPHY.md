# Typography — FADE Barbershop

Type is the primary visual language. Choose typefaces that are modern, geometric, and slightly aggressive—matching the urban barbershop aesthetic.

## Typeface Families

### Display / Headlines
**Font**: `Inter` or `Manrope` (sans-serif, geometric)
- **Weight**: Bold (700–900)
- **Use**: Main headlines, hero text, service names, primary navigation
- **Characteristics**: Modern, clean, with geometric letterforms. No serifs. Tight tracking for presence.

**Fallback**: `Arial Black`, system-ui sans-serif

### Body / Reading
**Font**: `Inter` (sans-serif)
- **Weight**: Regular (400), Semibold (600 for emphasis)
- **Use**: Body paragraphs, descriptions, service details, form text
- **Characteristics**: Legible at all sizes, slightly wider letter-spacing for airiness

**Fallback**: `Helvetica Neue`, system-ui sans-serif

### Mono / Data
**Font**: `JetBrains Mono` or `IBM Plex Mono`
- **Weight**: Regular (400)
- **Use**: Timestamps, pricing, phone numbers, booking codes
- **Characteristics**: Monospaced for numeric legibility

**Fallback**: `Courier New`, monospace

## Type Scale

Built on a 1.25 ratio (major third), starting from 16px base:

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| **XL Headline** | 48px | 900 | 1.1 | Hero, main page titles |
| **L Headline** | 32px | 800 | 1.2 | Section headers |
| **M Headline** | 24px | 700 | 1.3 | Subsection headers, card titles |
| **S Headline** | 18px | 700 | 1.4 | Small headings, labels |
| **Body Large** | 18px | 400 | 1.6 | Prominent body text, descriptions |
| **Body** | 16px | 400 | 1.6 | Default body text |
| **Body Small** | 14px | 400 | 1.5 | Secondary text, metadata |
| **Caption** | 12px | 500 | 1.4 | Fine print, timestamps |

## Letter Spacing

| Context | Tracking | Notes |
|---------|----------|-------|
| **XL/L Headlines** | -0.02em | Tight, present |
| **M Headlines** | -0.01em | Slightly tight |
| **Body** | 0em | Natural |
| **Labels** | 0.05em | Slight opening |
| **All Caps** | 0.08em | Standard letter spacing for caps |

## Line Length

- **Headlines**: No constraint (fill the width)
- **Body text**: Max 65 characters (roughly 38–42em on mobile, 50–60em on desktop)
- **Long-form content**: Max 75 characters

Break lines intentionally; don't let paragraphs run the full container width.

## Typographic Hierarchy

### Headlines
Never underline or italicize headlines. Let weight, size, and spacing do the work.

Bad: "The **Best** Haircuts in Brooklyn"  
Good: "The Best Haircuts in Brooklyn" (in bold 32px)

### Emphasis
In body text, use **bold** (600 weight) for emphasis, never italics. Avoid coloring a single word unless it's part of a design element (like a service highlight in red).

### Labels & Fields
Form labels are in 14px / 500 weight / sentence case:  
"Your full name" not "FULL NAME" or "Full Name"

Service labels are in 14px / 700 weight / sentence case:  
"Lineup with fade" not "LINEUP WITH FADE"

## Spacing

### Paragraph spacing
- After a headline: 0.5em (roughly 12px at headline size)
- Between body paragraphs: 1.5em

### Letter spacing between headlines and body
- Minimum 1.5em of whitespace (24px) between an XL headline and body text below it
- Minimum 1em (16px) between M headline and body

### Readability
Do not set body text in anything smaller than 16px on mobile; 14px is acceptable for secondary text only.

Never set line-height below 1.5 for body text.

## Examples in Practice

### Hero Section
```
XL Headline (48px, 900)
"FADE Barbershop"

[1em space]

Body Large (18px, 400, cream color)
"Real cuts for real people."
```

### Service Card
```
M Headline (24px, 700, cream)
"Lineup with Fade"

[0.5em space]

Body Small (14px, 400, #E8E8E8)
"Clean lines, precise blending, and definition."

[1em space]

CTA Button
"Book Now" (S Headline, 18px, 700, red on black)
```

### Metadata / Timestamp
```
Caption (12px, 500, #E8E8E8)
"Open Mon–Sat, 10 AM – 9 PM"
```

## Dark Mode (Primary)

All text colors in dark mode:
- **Headings**: `#F5F1E8` (cream)
- **Body**: `#F5F1E8` (cream)
- **Secondary**: `#E8E8E8` (light gray, slightly dimmed)
- **Accent highlight**: `#E63946` (red, unchanged)

Maintain this contrast. Do not use color alone for hierarchy; rely on size, weight, and spacing.
