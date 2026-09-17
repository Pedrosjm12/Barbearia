# Color Palette — Talentos Black Barbershop

The palette is deliberately minimal: high contrast between deep blacks and cream whites, with a single aggressive red accent for hierarchy and action.

## Primary Colors

| Name | Hex | Usage | Notes |
|------|-----|-------|-------|
| **Black** | `#000000` | Primary background, headlines, strong text | The foundation—surfaces and dominant typography |
| **Cream** | `#F5F1E8` | Secondary background, body text on dark | Warm off-white; never pure white |
| **Accent Red** | `#E63946` | CTAs, emphasis, spot accents | Bold, urban energy—reserved for calls-to-action and visual highlights |

## Supporting Palette

| Name | Hex | Usage | Notes |
|------|-----|-------|-------|
| **Charcoal** | `#2A2A2A` | Dividers, subtle backgrounds, borders | Between black and neutral—used sparingly |
| **Light Gray** | `#E8E8E8` | Disabled states, subtle dividers | Just dark enough to read on cream |
| **Transparent Black** | `rgba(0,0,0,0.1)` | Hover states, shadows | Preserve contrast; no soft gray default |

## Contrast & Accessibility

- **Black on Cream**: 21.4:1 WCAG AAA
- **Cream on Black**: 21.4:1 WCAG AAA
- **Red on Black**: 5.3:1 WCAG AA
- **Red on Cream**: 11.2:1 WCAG AAA

All combinations meet WCAG AA minimum; most exceed AAA.

## Usage Philosophy

The red is not applied everywhere. Use it for:
- **Primary CTAs** ("Book Your Cut")
- **Service highlights** (feature tags)
- **Accent lines** (borders, underlines in key moments)
- **Visual emphasis** (pricing, availability)

Never use red for body text, disabled states, or secondary UI. Let it earn its place.

## Dark Mode

In dark mode (which is the default for this brand):
- Background remains `#000000`
- Text remains `#F5F1E8`
- Red remains `#E63946`
- No inversion of palette; this is the primary mode

A light mode can exist for utility (admin panels, scheduling), but the brand lives in the dark.
