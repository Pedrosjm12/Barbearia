# Design Tokens — FADE Barbershop

A complete token system for Tailwind CSS and component implementation.

## Color Tokens

```css
--color-black: #000000;
--color-cream: #F5F1E8;
--color-red-accent: #E63946;
--color-charcoal: #2A2A2A;
--color-gray-light: #E8E8E8;
```

### As Tailwind Tokens (tailwind.config.ts)

```ts
module.exports = {
  theme: {
    extend: {
      colors: {
        'fade-black': '#000000',
        'fade-cream': '#F5F1E8',
        'fade-red': '#E63946',
        'fade-charcoal': '#2A2A2A',
        'fade-gray-light': '#E8E8E8',
      },
    },
  },
};
```

## Spacing Scale

Based on an 8px grid:

```css
--space-xs: 4px;      /* 0.5 × base */
--space-sm: 8px;      /* 1 × base */
--space-md: 16px;     /* 2 × base */
--space-lg: 24px;     /* 3 × base */
--space-xl: 32px;     /* 4 × base */
--space-2xl: 48px;    /* 6 × base */
--space-3xl: 64px;    /* 8 × base */
--space-4xl: 96px;    /* 12 × base */
```

Tailwind's default scale (4–96) aligns naturally with this.

## Typography Tokens

### Font Sizes (px)
```
12px – Caption
14px – Small Body / Labels
16px – Body
18px – Body Large / Small Headline
24px – Medium Headline
32px – Large Headline
48px – XL Headline
```

### Font Weights
```
400 – Regular (body)
500 – Medium (labels)
600 – Semibold (emphasis in body)
700 – Bold (headlines, buttons)
800 – Extra Bold (large headlines)
900 – Black (hero text)
```

### Line Heights
```
1.1  – Very tight (large headlines)
1.2  – Tight (medium headlines)
1.3  – Snug (small headlines)
1.4  – Comfortable (labels, captions)
1.5  – Reading (fine print)
1.6  – Open (body text, accessibility)
```

## Shadow Tokens

Minimal shadows; only where depth matters:

```css
--shadow-none: none;
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
```

Use shadows sparingly. The black background creates natural separation; shadows are not necessary for every layer.

## Border Tokens

All borders are geometric, clean lines—no rounded corners except where explicitly designed:

```css
--border-width-1: 1px;
--border-width-2: 2px;
--border-radius-none: 0;
--border-radius-sm: 4px;
--border-radius-md: 8px;
```

**Default**: No border-radius. Square edges match the aggressive, clean aesthetic. Only apply radius when it serves hierarchy (like in special buttons or cards).

## Animation Tokens

Motion is minimal and purposeful:

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage**:
- **Fast**: Hover states, focus rings
- **Base**: Color transitions, opacity fades
- **Slow**: Page transitions, entrance animations

Never auto-play animations. Only animate in response to user interaction (hover, click, focus) or a deliberate page-load sequence.

## Responsive Breakpoints

Use Tailwind's default breakpoints:

```
sm: 640px   – Tablets
md: 768px   – Small desktop
lg: 1024px  – Desktop
xl: 1280px  – Large desktop
2xl: 1536px – Extra large
```

**Mobile-first approach**: Design for mobile first, add breakpoints for larger screens.

## Accessibility Tokens

### Focus States
```css
--focus-ring: 2px solid #E63946;
--focus-offset: 2px;
```

All interactive elements must show a visible red focus ring on keyboard navigation.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Respect `prefers-reduced-motion` for users who prefer reduced animations.

### High Contrast
In high contrast mode (Windows), borders and focus indicators should remain visible. Test on real hardware.

## Usage in Tailwind Config

```ts
export default {
  theme: {
    extend: {
      colors: {
        black: '#000000',
        cream: '#F5F1E8',
        red: '#E63946',
        charcoal: '#2A2A2A',
        'gray-light': '#E8E8E8',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
};
```

## CSS Variable Approach (Alternative)

If using CSS variables instead of Tailwind config:

```css
:root {
  /* Colors */
  --color-black: #000000;
  --color-cream: #F5F1E8;
  --color-red: #E63946;
  --color-charcoal: #2A2A2A;
  --color-gray-light: #E8E8E8;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;

  /* Typography */
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

Then use in components:

```css
.button {
  background-color: var(--color-red);
  color: var(--color-black);
  padding: var(--space-md) var(--space-lg);
  transition: all var(--transition-base);
}
```
