# Component Specifications — FADE Barbershop

All components follow the black, cream, red palette and clean geometric design language.

## Button

### Primary Button (CTA)
- **Background**: Red (`#E63946`)
- **Text**: Black (`#000000`)
- **Padding**: 12px 24px (or scale with content)
- **Typography**: 16px Bold (700)
- **Border**: None
- **Border Radius**: 0 (square)
- **Min Width**: 120px
- **States**:
  - **Hover**: Darken red to `#D62828` (or shift hue slightly)
  - **Focus**: Add 2px red outline, 2px offset
  - **Active**: Deeper red `#BF2D2D`
  - **Disabled**: Gray `#E8E8E8`, text `#2A2A2A`, no hover

### Secondary Button (Navigation/Utility)
- **Background**: Transparent
- **Border**: 1px solid cream (`#F5F1E8`)
- **Text**: Cream
- **Padding**: 10px 20px
- **Typography**: 16px Regular (400)
- **States**:
  - **Hover**: Background becomes transparent charcoal, border stays cream
  - **Focus**: Red outline
  - **Active**: Red text

### Icon Button
- **Size**: 40px × 40px
- **Background**: Transparent (or hover state: charcoal)
- **Icon**: Cream, 20px × 20px
- **States**:
  - **Hover**: Background `#2A2A2A`
  - **Focus**: Red outline

---

## Input Fields

### Text Input / Textarea
- **Background**: Charcoal (`#2A2A2A`)
- **Border**: 1px solid gray (`#E8E8E8`)
- **Text**: Cream (`#F5F1E8`)
- **Padding**: 12px 16px
- **Font Size**: 16px
- **Placeholder**: Light gray `#E8E8E8`, 60% opacity
- **Border Radius**: 0
- **States**:
  - **Focus**: Red border (2px)
  - **Error**: Red border, error text below in red
  - **Disabled**: Background gray, text dimmed, no interaction

### Label
- **Font Size**: 14px
- **Font Weight**: 500
- **Color**: Cream
- **Margin Below**: 8px
- **Sentence case**: "Your email address" not "EMAIL ADDRESS"

### Error Message
- **Font Size**: 12px
- **Color**: Red (`#E63946`)
- **Margin Top**: 4px
- **Icon**: ✕ (small red) before text

### Help Text
- **Font Size**: 12px
- **Color**: Light gray `#E8E8E8`
- **Margin Top**: 4px

---

## Cards

### Service Card
- **Background**: Charcoal (`#2A2A2A`)
- **Border**: None
- **Padding**: 24px
- **Border Radius**: 0
- **Shadow**: Subtle (0 2px 8px rgba(0,0,0,0.3))
- **Layout**:
  ```
  [Service Icon / Image]
  [Service Name — M Headline, 24px Bold]
  [Description — Body Small, 14px, light gray]
  [Price or CTA — Right aligned]
  ```
- **States**:
  - **Hover**: Subtle lift (shadow increases), no color change
  - **Active**: Red accent line on left edge (4px)

### Booking Card / Hero Card
- **Background**: Black (`#000000`)
- **Border**: 2px solid red (`#E63946`)
- **Padding**: 32px
- **Border Radius**: 0
- **Layout**:
  ```
  [Headline — XL, 48px]
  [Subheadline — Body Large, 18px, cream]
  [CTA Button — Primary]
  ```

### Testimonial Card
- **Background**: Charcoal (`#2A2A2A`)
- **Border**: 1px solid gray (`#E8E8E8`)
- **Padding**: 20px
- **Border Radius**: 0
- **Layout**:
  ```
  [Quote mark — Large, red]
  [Text — Body, 16px]
  [Name — Caption, 12px bold]
  [Rating — Stars in red]
  ```

---

## Navigation

### Header / Top Nav
- **Background**: Black
- **Height**: 60px (desktop), 56px (mobile)
- **Layout**: Logo left, menu center/right
- **Logo**: Cream, 20px height
- **Menu Items**: 16px regular, cream, spaced 24px apart
- **States**:
  - **Hover**: Text remains cream, underline appears (2px red, bottom)
  - **Active**: Text red, underline red
  - **Focus**: Outline red

### Mobile Menu
- **Style**: Slide-out drawer from right
- **Background**: Black
- **Width**: 80% or full-width
- **Items**: Stack vertically, 16px padding per item
- **Close Button**: Icon (✕), top right, red on hover

### Breadcrumb
- **Font Size**: 12px
- **Separator**: ` / ` in gray
- **Colors**: Current page in cream, previous pages in gray
- **Hover**: Previous pages turn red (clickable)

---

## Forms

### Form Container
- **Max Width**: 500px (single column), or 2-column grid for longer forms
- **Gap**: 24px between fields
- **Border Radius**: 0
- **Background**: Optional subtle charcoal container

### Form Group (Label + Input + Help)
- **Spacing**:
  - Label to input: 8px
  - Input to help/error: 4px
  - Form group to form group: 24px

### Checkbox / Radio
- **Size**: 16px × 16px
- **Background**: Charcoal
- **Border**: 1px gray
- **Checked**: Red background, white checkmark
- **Focus**: Red outline
- **Label**: 14px, cream, left of input (8px gap)

---

## Modals / Dialogs

### Modal Overlay
- **Background**: Black with 70% opacity
- **Backdrop Filter**: Optional blur (5px)

### Modal Box
- **Background**: Black
- **Border**: 2px solid red
- **Padding**: 32px
- **Border Radius**: 0
- **Width**: 90% on mobile, 500px max on desktop
- **Center**: Vertical and horizontal

### Modal Header
- **Typography**: L Headline (32px bold) in cream
- **Close Button**: Icon (✕), red on hover, top right

### Modal Footer
- **Padding**: 24px, border-top 1px gray
- **Buttons**: Primary and secondary, right-aligned

---

## Loading States

### Spinner
- **Style**: Rotating red circle border (no fill)
- **Size**: 24px × 24px (default)
- **Speed**: 1 second per rotation
- **Accessibility**: Include `aria-label="Loading"` and `role="status"`

### Skeleton Screen
- **Background**: Charcoal (`#2A2A2A`)
- **Pulse**: Subtle fade in/out (0.1 opacity change)
- **Shape**: Mimic content layout (rectangular blocks)

---

## Alerts / Toasts

### Alert Container
- **Background**: Charcoal
- **Border Left**: 4px solid (color depends on type)
- **Padding**: 16px
- **Border Radius**: 0
- **Typography**: 14px body

### Alert Types
- **Success**: Border green `#10B981`
- **Error**: Border red `#E63946`
- **Warning**: Border yellow `#F59E0B`
- **Info**: Border blue `#3B82F6`

### Toast Position
- **Default**: Bottom right, 16px from edges
- **Mobile**: Full width, bottom-aligned
- **Auto-dismiss**: 5 seconds (or no auto-dismiss for errors)

---

## Services List

### Service Item
- **Layout**: Horizontal flex
- **Icon**: 32px square, red
- **Content**: Title (M Headline), description (Body Small)
- **CTA**: Red link arrow (→) on the right
- **Hover**: Background becomes charcoal, CTA arrow moves right (animation)

---

## Pricing Section

### Price Card
- **Background**: Charcoal
- **Border**: 1px gray (no emphasis)
- **Padding**: 24px
- **Layout**:
  ```
  [Service Name — M Headline]
  [Price — XL number, red, mono font]
  [Description — Body Small]
  [CTA Button]
  ```
- **Most Popular Variant**:
  - **Border**: 2px red
  - **Background**: Slightly lighter charcoal or unchanged
  - **Badge**: "Most Popular" label top-right in red

---

## Footer

### Footer Background
- **Background**: Black
- **Border Top**: 1px gray

### Footer Grid
- **Columns**: 4 (desktop), 2 (tablet), 1 (mobile)
- **Padding**: 48px top, 24px bottom
- **Gap**: 24px

### Footer Links
- **Color**: Gray `#E8E8E8`
- **Hover**: Red
- **Font Size**: 14px

### Footer Logo / Branding
- **Size**: 24px height
- **Color**: Cream

---

## Responsive Considerations

### Mobile (sm: < 640px)
- **Buttons**: Full width or 2-column grid
- **Cards**: Single column, full width with 16px padding
- **Spacing**: Reduce to 16px gaps
- **Typography**: Reduce headline sizes by 1–2 steps

### Tablet (md: 768px)
- **Grid**: 2-column layouts
- **Padding**: 24px per side
- **Font sizes**: Original scale

### Desktop (lg: 1024px+)
- **Grid**: 3+ columns
- **Max widths**: Apply to content containers
- **Spacing**: Full token scale

---

## Dark Mode (Primary)

All components are designed for dark mode. This is the brand's default appearance.

If light mode is needed (e.g., admin panels):
- Invert background (cream) and text (black)
- Keep red accent unchanged
- Maintain contrast ratios above WCAG AA

---

## Accessibility Checklist

- [ ] All buttons have visible focus state (red outline)
- [ ] Color is not the only indicator (use icons, text, etc.)
- [ ] Form fields have associated labels
- [ ] Error messages link to the field causing the error
- [ ] Modals trap focus and have close button
- [ ] Images have alt text
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Text has min 14px font size; body text is 16px+
- [ ] Line height is 1.5+ for body text
- [ ] Contrast ratios: WCAG AA minimum (4.5:1 for text)
