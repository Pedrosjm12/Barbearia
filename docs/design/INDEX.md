# Design System Index — Talentos Black Barbershop

Complete navigation and overview of all design documentation.

---

## 📖 Documentation Map

### Core System
| Document | Focus | Audience |
|----------|-------|----------|
| **[README.md](./README.md)** | System overview, principles, design workflow | Everyone |
| **[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** | One-page cheat sheet, token values | Designers & Developers |
| **[STYLE-GUIDE.md](./STYLE-GUIDE.md)** | Brand identity, tone, best practices | Designers |

### Technical Specifications
| Document | Focus | Audience |
|----------|-------|----------|
| **[COLOR-PALETTE.md](./COLOR-PALETTE.md)** | Color definitions, contrast, usage rules | Designers & Developers |
| **[TYPOGRAPHY.md](./TYPOGRAPHY.md)** | Type scale, families, hierarchy, spacing | Designers & Developers |
| **[DESIGN-TOKENS.md](./DESIGN-TOKENS.md)** | Complete token system, all values | Developers |
| **[COMPONENTS.md](./COMPONENTS.md)** | Component specifications, states | Designers & Developers |

### Implementation & Usage
| Document | Focus | Audience |
|----------|-------|----------|
| **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** | Code examples, Tailwind config, React patterns | Developers |
| **[PAGE-PATTERNS.md](./PAGE-PATTERNS.md)** | Page layouts, section patterns, responsive | Developers |

### Reference
| Item | Location | Notes |
|------|----------|-------|
| **Design Reference Image** | `./references/design-barbearia.webp` | Visual inspiration (hero, colors, typography) |
| **Tailwind Config** | `../../tailwind.config.ts` | Project configuration with Talentos Black tokens |
| **Global CSS** | `../../app/globals.css` | CSS variables and base styles |

---

## 🎨 Quick Navigation by Task

### "I need to..."

#### Design Something New
1. Read [STYLE-GUIDE.md](./STYLE-GUIDE.md) — understand brand principles
2. Check [COLOR-PALETTE.md](./COLOR-PALETTE.md) — which colors apply?
3. Reference [COMPONENTS.md](./COMPONENTS.md) — similar component exists?
4. Review [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) — final checklist

#### Build a Component
1. Read [COMPONENTS.md](./COMPONENTS.md) — find the spec
2. Check [IMPLEMENTATION.md](./IMPLEMENTATION.md) — code examples
3. Reference [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — token values
4. Test accessibility checklist (keyboard, focus, contrast)

#### Create a Page
1. Check [PAGE-PATTERNS.md](./PAGE-PATTERNS.md) — find your page type
2. Reference [IMPLEMENTATION.md](./IMPLEMENTATION.md) — copy component examples
3. Validate with [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) — accessibility & spacing
4. Test responsive on mobile, tablet, desktop

#### Write Copy
1. Read [STYLE-GUIDE.md](./STYLE-GUIDE.md#content-standards) — content guidelines
2. Check [COMPONENTS.md](./COMPONENTS.md) — component-specific microcopy patterns
3. Keep tone conversational, avoid jargon

#### Extend the System
1. Read [README.md](./README.md#extending-the-system) — system philosophy
2. Add to [COMPONENTS.md](./COMPONENTS.md) — document the spec
3. Add Tailwind classes to `tailwind.config.ts` if needed
4. Get review from design lead before merging

#### Debug a Design Issue
1. **"Why does this color look wrong?"** → [COLOR-PALETTE.md](./COLOR-PALETTE.md)
2. **"Is this text size right?"** → [TYPOGRAPHY.md](./TYPOGRAPHY.md) or [QUICK-REFERENCE.md](./QUICK-REFERENCE.md)
3. **"What spacing should I use?"** → [DESIGN-TOKENS.md](./DESIGN-TOKENS.md)
4. **"Is this component accessible?"** → [COMPONENTS.md](./COMPONENTS.md#accessibility-checklist) or [QUICK-REFERENCE.md](./QUICK-REFERENCE.md#accessibility-checklist)

---

## 🎯 Document Sections by Depth

### Surface Level (5 minutes)
- [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) — All essentials on one page
- [README.md](./README.md#core-design-principles) — The 5 principles

### Medium Depth (30 minutes)
- [STYLE-GUIDE.md](./STYLE-GUIDE.md) — Brand voice, best practices
- [COLOR-PALETTE.md](./COLOR-PALETTE.md) — Color system explained
- [PAGE-PATTERNS.md](./PAGE-PATTERNS.md) — Common page layouts

### Deep Dive (1+ hour)
- [TYPOGRAPHY.md](./TYPOGRAPHY.md) — Complete type system
- [COMPONENTS.md](./COMPONENTS.md) — Every component spec
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) — Code walkthroughs

### Reference
- [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) — Look up specific values
- [README.md](./README.md) — Understand the system philosophy

---

## 🎨 Color Palette at a Glance

```
Hex      | Name          | Primary Use
---------|---------------|----------------------------------------
#000000  | Black         | Backgrounds, primary text
#F5F1E8  | Cream         | Body text, secondary backgrounds
#E63946  | Red           | CTAs, focus states, emphasis
#2A2A2A  | Charcoal      | Cards, subtle backgrounds
#E8E8E8  | Light Gray    | Disabled states, dividers
```

**Principle**: High contrast (21:1), minimal palette, red only for actions.

---

## 📏 Spacing & Type at a Glance

### Spacing
```
4px (xs)  | 8px (sm)  | 16px (md) | 24px (lg) | 32px (xl)
48px (2xl) | 64px (3xl) | 96px (4xl)
```

### Type Scale
```
12px Caption | 14px Small | 16px Body | 18px Large | 24px Heading | 32px Large Heading | 48px XL Heading
```

**Font**: Inter (sans-serif)  
**Mono**: JetBrains Mono

---

## ✅ Implementation Checklist

- [ ] **Project setup**
  - [ ] Tailwind config updated (`tailwind.config.ts` ✓ created)
  - [ ] Global CSS updated (`app/globals.css` ✓ updated)
  - [ ] Font files loaded (Google Fonts or self-hosted)

- [ ] **Components created**
  - [ ] Button (primary, secondary, icon)
  - [ ] Input / Form fields
  - [ ] Card (service, booking, testimonial)
  - [ ] Modal / Dialog
  - [ ] Navigation (header, mobile menu)

- [ ] **Pages implemented**
  - [ ] Homepage (hero + services + CTA)
  - [ ] Services page
  - [ ] Booking page
  - [ ] Contact / About page

- [ ] **Accessibility verified**
  - [ ] Contrast checked (WCAG AA+)
  - [ ] Keyboard navigation tested
  - [ ] Screen reader tested
  - [ ] Focus states visible
  - [ ] Mobile touch targets (44px min)

- [ ] **Responsive tested**
  - [ ] Mobile (< 640px)
  - [ ] Tablet (640–1024px)
  - [ ] Desktop (> 1024px)
  - [ ] No horizontal scroll

- [ ] **Performance**
  - [ ] Images optimized (Next.js Image)
  - [ ] Fonts preloaded
  - [ ] CSS purged (Tailwind)
  - [ ] Animations respect prefers-reduced-motion

- [ ] **Review & QA**
  - [ ] Design approved by lead
  - [ ] Code reviewed
  - [ ] Browser tested (Chrome, Firefox, Safari)
  - [ ] Device tested (iPhone, iPad, Android)

---

## 📚 Additional Resources

### External References
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

### Tools
- **Design**: Figma (optional—system designed for web first)
- **Browser DevTools**: Chrome / Firefox Developer Tools
- **Accessibility**: axe DevTools, WAVE, Lighthouse
- **Performance**: Google PageSpeed Insights, WebPageTest

### Brand Assets
- **Logo / Icon**: To be added to `./references/`
- **Photography**: Document style in [STYLE-GUIDE.md](./STYLE-GUIDE.md#imagery--graphics)
- **Mockups**: Reference design in `./references/design-barbearia.webp`

---

## 🔄 System Maintenance

### When to Update Documentation
- New component added
- Design token value changed
- Accessibility issue fixed
- Pattern or best practice evolved
- Feedback from team or users

### How to Update
1. Identify which document(s) need updates
2. Make changes following existing format
3. Cross-reference related documents
4. Update [INDEX.md](./INDEX.md) if structure changes
5. Get review from design lead
6. Commit changes with clear message

### Versioning
- **Version**: 1.0 (September 16, 2026)
- **Last Updated**: September 16, 2026
- **Status**: Complete & ready for implementation

---

## 🤝 Team Roles & Responsibilities

### Designer
- Maintains visual consistency
- Approves new components & patterns
- Owns brand identity & messaging
- Reviews mockups before development

### Developer
- Implements components to spec
- Maintains Tailwind config & CSS
- Ensures accessibility compliance
- Tests responsive behavior

### Product Lead
- Approves page features & copy
- Prioritizes component development
- Gathers user feedback
- Decides on system extensions

---

## 💬 Common Questions

**Q: Can I use a different color?**  
A: No. The palette is intentional. If you think a new color is needed, propose it to the design lead with a use case.

**Q: Can I use rounded corners?**  
A: Only when it serves hierarchy or special treatment (like a badge or highlighted CTA). Check COMPONENTS.md or ask the design lead.

**Q: Should I add animations?**  
A: Only the three signature patterns (page curtain, button fill, image reveal/hover) — see DESIGN-TOKENS.md. Respect prefers-reduced-motion.

**Q: What if a component doesn't fit the spec?**  
A: Propose an update to the spec. Document the new component in COMPONENTS.md. Get review from design lead.

**Q: How do I know if something is accessible?**  
A: Use the checklist in QUICK-REFERENCE.md. Test with keyboard, screen reader, and contrast checker. Ask the design lead.

**Q: Can I deviate from the design system?**  
A: No. The system exists to keep the brand consistent. Deviations should be rare and require design lead approval.

---

## 📞 Support

For questions or feedback:
1. Check the relevant documentation
2. Ask in design review or team sync
3. Update the system with your learnings
4. Share improvements with the team

---

**Document Status**: ✅ Complete  
**System Status**: ✅ Ready for Implementation  
**Last Checked**: September 16, 2026
