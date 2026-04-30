---
name: Elite Attempt Selection System
colors:
  surface: "#131313"
  surface-dim: "#131313"
  surface-bright: "#3a3939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1b"
  surface-container: "#201f1f"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353534"
  on-surface: "#e5e2e1"
  on-surface-variant: "#d0c5af"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#99907c"
  outline-variant: "#4d4635"
  surface-tint: "#e9c349"
  primary: "#f2ca50"
  on-primary: "#3c2f00"
  primary-container: "#d4af37"
  on-primary-container: "#554300"
  inverse-primary: "#735c00"
  secondary: "#c6c6c7"
  on-secondary: "#2f3131"
  secondary-container: "#454747"
  on-secondary-container: "#b4b5b5"
  tertiary: "#d0cdcd"
  on-tertiary: "#313030"
  tertiary-container: "#b4b2b2"
  on-tertiary-container: "#454544"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffe088"
  primary-fixed-dim: "#e9c349"
  on-primary-fixed: "#241a00"
  on-primary-fixed-variant: "#574500"
  secondary-fixed: "#e2e2e2"
  secondary-fixed-dim: "#c6c6c7"
  on-secondary-fixed: "#1a1c1c"
  on-secondary-fixed-variant: "#454747"
  tertiary-fixed: "#e5e2e1"
  tertiary-fixed-dim: "#c8c6c5"
  on-tertiary-fixed: "#1c1b1b"
  on-tertiary-fixed-variant: "#474746"
  background: "#131313"
  on-background: "#e5e2e1"
  surface-variant: "#353534"
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.05em
  attempt-number:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: "700"
    lineHeight: "1.0"
    letterSpacing: -0.01em
  body-base:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1.0"
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 32px
  card-gap: 24px
  element-margin: 16px
  input-padding: 12px
---

## Brand & Style

This design system is engineered for the high-stakes environment of competitive powerlifting. The personality is disciplined, authoritative, and focused—striking a balance between premium "Gold Medal" aesthetics and utilitarian performance tracking.

The style utilizes a **Modern Corporate** foundation with **High-Contrast** accents. It prioritizes rapid information processing under pressure (e.g., backstage at a meet) by using deep blacks to reduce eye strain and metallic gold to highlight critical success metrics. The aesthetic is clean and surgical, removing any unnecessary decorative elements to focus entirely on numerical precision.

## Colors

The palette is anchored in a "True Black" (`#0F0F0F`) background to create maximum separation for the content cards.

- **Primary Gold:** Reserved for headings, the "Total" display, and active selection states. It signifies achievement and premium quality.
- **Pure White:** Used for primary data points and high-emphasis labels to ensure maximum legibility against dark backgrounds.
- **Tonal Greys:** Used for secondary labels and input borders to maintain hierarchy without cluttering the visual field.
- **Accents:** High-chroma green and red are used sparingly for successful vs. failed attempt indicators.

## Typography

The design system utilizes **Lexend** exclusively. Chosen for its origins in improving reading proficiency, its hyper-legible character shapes and generous apertures are ideal for athletes and coaches who need to read weights quickly from a distance or on the move.

Headlines use a semi-expanded tracking to feel more "athletic" and professional. Numerical data (weights) are rendered with heavy weights (`700`) to ensure they are the first thing a user sees when glancing at an attempt card.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop (centering three lift columns) and collapses to a single-column stack on mobile.

A strict 4px baseline grid ensures mathematical harmony. Columns for Squat, Bench, and Deadlift are given equal visual weight. Sufficient vertical breathing room (32px+) is maintained between the lift cards and the "Total" summary to prevent data fatigue. Internal card spacing uses a 16px "safe zone" to keep inputs and suggestions from feeling cramped.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** rather than traditional shadows to maintain a sleek, modern look.

- **Level 0 (Base):** Deepest black (`#0F0F0F`).
- **Level 1 (Cards):** Slightly lifted dark grey (`#1A1A1A`) with a subtle 1px border (`#2A2A2A`).
- **Level 2 (Inputs/Buttons):** Recessed or elevated surfaces within the cards using thinner, high-contrast borders.

Small, subtle glows may be applied to the "Total" card or active attempt selection to simulate a "lit from within" effect, reinforcing the gold accent.

## Shapes

The shape language is **Soft** but disciplined. A 4px - 8px radius is applied to cards and inputs to take the "edge" off the industrial look without appearing overly friendly or casual.

Selection chips (lbs/kg) use a pill-shape to distinguish them from data-entry fields. Border weights remain thin (1px) to keep the UI feeling precise and engineered.

## Components

### Lift Cards

The primary container. It features a gold header with a horizontal separator. All internal logic (Inputs and Attempt Suggestion Boxes) is contained within this boundary.

### Attempt Suggestions

Semi-transparent boxes nested within cards. They display three values: a center-aligned "Main Attempt" in large white text, flanked by "Conservative" and "Aggressive" options in smaller, muted grey text.

### Weight Inputs

Dark-themed text fields with white text. Use "Stepper" icons (up/down arrows) that are large enough for gloved or chalky hands to interact with on touch devices.

### Action Buttons

The "Clear All" or "Save" buttons use a "Ghost" style (transparent background with white/gold border) to remain secondary to the data entry task.

### Units Toggle

A segmented control or pill-switch at the top of the UI for toggling between Lbs and Kgs, using the primary gold for the active state.
