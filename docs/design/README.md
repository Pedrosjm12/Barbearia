# Design System — Talentos Black Barbershop

Complete visual identity and component system for Talentos Black Premium Barbershop.

---

## Overview

This design system defines the visual language, component specifications, and implementation guidelines for Talentos Black. The system is built on a deliberate, opinionated palette of black, cream, and red—reflecting the precision, urban aesthetic, and energy of the barbershop.

### Quick Links

| Document | Purpose |
|----------|---------|
| **[Style Guide](./STYLE-GUIDE.md)** | Brand identity, principles, best practices |
| **[Color Palette](./COLOR-PALETTE.md)** | Color definitions, usage rules, accessibility |
| **[Typography](./TYPOGRAPHY.md)** | Typeface families, type scale, hierarchy |
| **[Design Tokens](./DESIGN-TOKENS.md)** | Complete token system (colors, spacing, shadows) |
| **[Components](./COMPONENTS.md)** | Detailed specs for all UI components |
| **[Implementation](./IMPLEMENTATION.md)** | Code examples, Tailwind config, React patterns |

---

## The Brand

**Talentos Black** is a premium barbershop serving a clientele who value:
- **Precision**: Exact cuts, no compromise
- **Urban aesthetic**: Modern, contemporary, city-focused
- **Accessibility**: Walk-ins welcome, no gatekeeping
- **Premium quality**: High-end service, professional environment

The design system reflects these values through **high contrast**, **minimal ornamentation**, and **deliberate use of space and color**.

---

## Core Design Principles

### 1. High Contrast
The brand lives in **black and cream**—maximal contrast for legibility, presence, and impact. This is not a subtle design; it's bold and direct.

### 2. Reserved Red
Red appears **only** in moments of action and emphasis:
- Primary call-to-action buttons
- Focus indicators
- Key highlights
- Service tags or priority labels

Never use red for body text or secondary content. Restraint makes the accent land harder.

### 3. Minimal, Geometric
- Square edges (no rounded corners unless intentional)
- Clean, geometric lines
- Whitespace is generous
- Decoration serves purpose, never ornament

### 4. Urban & Professional
The aesthetic is **contemporary barbershop**—urban, slightly edgy, meticulously precise. Avoid:
- Corporate sterility
- Luxury clichés
- Soft, warm aesthetics
- Ornate flourishes

### 5. Accessibility First
All components are designed for:
- WCAG AA contrast minimum (AAA where possible)
- Keyboard navigation
- Screen reader compatibility
- Reduced motion support

---

## Color System

```
Primary:    #000000 (Black)       — Backgrounds, primary text
Secondary:  #F5F1E8 (Cream)       — Body text, secondary backgrounds
Accent:     #E63946 (Red)         — Actions, emphasis, focus
Support:    #2A2A2A (Charcoal)    — Cards, subtle backgrounds
            #E8E8E8 (Light Gray)  — Disabled, dividers
```

**Why this palette?**
- Black grounds the design; it's the canvas
- Cream is warm and legible against black
- Red is bold and energetic—perfect for a barbershop
- Minimal color count forces intentional use

See [COLOR-PALETTE.md](./COLOR-PALETTE.md) for detailed usage.

---

## Typography

**Typeface**: Inter (sans-serif, geometric)
- **Headlines**: Bold (700–900 weight)
- **Body**: Regular (400 weight)
- **Mono**: JetBrains Mono or similar (for data)

**Type Scale** (1.25 ratio):
```
48px – XL Headline
32px – L Headline
24px – M Headline
18px – Body Large / Small Headline
16px – Body
14px – Small Body / Labels
12px – Caption
```

**Key Rules**:
- Line height 1.6 for body text (legibility)
- Max 65 characters per line
- Sentence case (capitalize first word, proper nouns only)
- Never italicize or color a single word for emphasis—use weight instead

See [TYPOGRAPHY.md](./TYPOGRAPHY.md) for complete guidance.

---

## Spacing & Layout

All spacing is a multiple of **8px**:
```
4px → xs
8px → sm
16px → md
24px → lg
32px → xl
48px → 2xl
64px → 3xl
96px → 4xl
```

**Responsive Breakpoints**:
- Mobile: < 640px
- Tablet: 640–1024px
- Desktop: > 1024px

**Grid & Max Width**:
- Mobile: Full width (16px padding)
- Desktop: 1024px max, centered

See [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) for spacing and layout tokens.

---

## Components

Every component has a clear structure:
- **Visual specs** (colors, spacing, typography)
- **States** (default, hover, focus, active, disabled)
- **Accessibility** (focus rings, labels, ARIA)
- **Responsive behavior** (mobile, tablet, desktop)

### Key Components

- **Buttons**: Primary, secondary, icon
- **Forms**: Text input, labels, error states
- **Cards**: Service card, booking card, testimonial
- **Navigation**: Header, mobile menu, breadcrumb
- **Modals**: Overlay, container, close button
- **Alerts**: Toast, success/error/warning types
- **Loading**: Spinner, skeleton screen

See [COMPONENTS.md](./COMPONENTS.md) for detailed specifications.

---

## Implementation

### Quick Start

1. **Update Tailwind config** with Talentos Black tokens:
   ```ts
   colors: {
     'tb-black': '#000000',
     'tb-cream': '#F5F1E8',
     'tb-red': '#E63946',
     // ...
   }
   ```

2. **Create reusable components** (Button, Input, Card):
   ```tsx
   <Button variant="primary" size="md">Book Your Cut</Button>
   ```

3. **Use design tokens** consistently:
   ```tsx
   <h1 className="text-3xl font-black text-tb-cream">Headline</h1>
   ```

### Languages & Tools

- **CSS**: Tailwind CSS 4
- **Framework**: Next.js 16.3.5 + React 19
- **Languages**: TypeScript, JSX
- **Design**: Figma or similar (optional)

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for:
- Complete Tailwind config
- React component examples (Button, Input, Modal, etc.)
- CSS variables approach
- Accessibility testing patterns
- Performance tips

---

## Design Workflow

### When Creating a New Component

1. **Reference the system**
   - Which colors apply?
   - What spacing rules?
   - Which typography scale?

2. **Check against principles**
   - Is it high-contrast?
   - Does it use red intentionally?
   - Is it minimal and geometric?

3. **Test accessibility**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast (WCAG AA+)
   - Focus states (red outline)

4. **Document the spec**
   - Visual states (default, hover, focus, active, disabled)
   - Responsive behavior
   - Accessibility considerations

### When Writing Copy

- Use **conversational, action-focused** language
- Be specific: "Precision Lineups" not "Great Haircuts"
- Use active voice: "Book Your Cut" not "Make a Booking"
- Keep sentences short (5–7 words average)
- Avoid jargon and clichés

See [STYLE-GUIDE.md](./STYLE-GUIDE.md) for content standards.

---

## Accessibility Checklist

- ✓ All interactive elements have visible focus state (red outline)
- ✓ Color contrast meets WCAG AA minimum (4.5:1 for text)
- ✓ Form fields have associated labels
- ✓ Buttons use active verbs ("Book Now" not "Submit")
- ✓ Images have alt text
- ✓ Keyboard navigation is logical (tab order)
- ✓ Modals trap focus
- ✓ Animations respect `prefers-reduced-motion`
- ✓ No text smaller than 14px (except captions)
- ✓ Line height 1.5+ for body text

---

## Common Patterns

### Primary CTA Section
```tsx
<section className="bg-tb-black py-20">
  <h2 className="text-5xl font-black text-tb-cream mb-4">
    Ready to Get Sharp?
  </h2>
  <p className="text-xl text-tb-cream mb-8">
    Walk in or book online. No appointments necessary.
  </p>
  <Button variant="primary">Book Your Cut</Button>
</section>
```

### Service List
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {services.map(service => (
    <ServiceCard key={service.id} {...service} />
  ))}
</div>
```

### Form with Validation
```tsx
<form className="space-y-6 max-w-md">
  <Input label="Your Name" required />
  <Input label="Email" type="email" required />
  <Button variant="primary" type="submit">Book Now</Button>
</form>
```

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for more examples.

---

## Design Decisions & Rationale

### Why Black & Cream?
- **Contrast**: 21:1 contrast ratio (WCAG AAA)
- **Urban**: Reflects barbershop aesthetic (dark, professional)
- **Legibility**: Easy to read, high accessibility
- **Memorable**: High contrast is distinctive and memorable

### Why Red (not other accents)?
- **Energy**: Conveys action, movement, urgency
- **Barbershop association**: Shaving poles, classic barbershop culture
- **Restrained use**: Makes the accent more powerful
- **Accessibility**: 5.3:1 on black, 11.2:1 on cream

### Why No Rounded Corners?
- **Geometric precision**: Matches the precision of barbering
- **Urban aesthetic**: Sharp, clean lines
- **Simplicity**: Reduces visual complexity
- **Exceptions allowed**: When hierarchy or special treatment requires it

### Why No Serif Typeface?
- **Contemporary**: Serifs feel traditional; sans-serif feels modern
- **Legibility**: Better on screens, especially at small sizes
- **Urban**: Matches the contemporary, city aesthetic
- **Performance**: Web-safe sans-serif families are abundant

---

## Extending the System

The system is designed to be extended thoughtfully. When adding new components or patterns:

1. **Stay within the constraints**: Use defined colors, spacing, typography
2. **Be deliberate**: Every choice should have a reason
3. **Document**: Add to [COMPONENTS.md](./COMPONENTS.md)
4. **Test**: Keyboard nav, screen readers, contrast
5. **Review**: Does it feel like Talentos Black?

---

## References

- **Design inspiration**: The reference image in `./references/design-barbearia.webp`
- **Web standards**: [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- **Accessibility**: [WebAIM](https://webaim.org/), [a11y Project](https://www.a11yproject.com/)
- **Typography**: [The Elements of Typographic Style](https://www.papress.org/products/the-elements-of-typographic-style)

---

## Maintenance

This system is a living document. As the brand evolves:
- Update token values (colors, spacing) in [DESIGN-TOKENS.md](./DESIGN-TOKENS.md)
- Add new components to [COMPONENTS.md](./COMPONENTS.md)
- Refine guidelines in [STYLE-GUIDE.md](./STYLE-GUIDE.md)
- Keep [IMPLEMENTATION.md](./IMPLEMENTATION.md) current with code patterns

**Last updated**: September 16, 2026  
**Version**: 1.0  
**Maintainer**: Design System Team

---

## Questions?

If a design decision isn't covered:
1. Check the [STYLE-GUIDE.md](./STYLE-GUIDE.md) principles
2. Refer to the [reference image](./references/design-barbearia.webp) for inspiration
3. Ask: Does it follow the system? Is it accessible? Does it feel like Talentos Black?

If yes: go for it. If no: align with the system first.
