# Hero Implementation Handoff

## Scope

This document summarizes the current Hero implementation in the landing page so a frontend developer can reuse, maintain, or rebuild it directly from code without re-reading the whole project.

## Source of Truth

- `src/App.jsx`
- `src/components/blinds-aurora-background.jsx`
- `src/index.css`

## Current Hero Structure

The Hero is composed of 4 layers:

1. `BlindsAuroraBackground`
   Background shader layer rendered with `MeshGradient`.
2. `.hero`
   Main Hero section container with viewport clipping.
3. `.hero-copy`
   Headline, body copy, and CTA row.
4. `.hero-mockup-shell`
   Product mockup panel placed under the copy.

The background is mounted before the `header` and `section.hero`, but both content layers sit above it through z-index.

## Dependency

Hero background uses:

```bash
npm install @paper-design/shaders-react
```

Shader component:

```jsx
import { MeshGradient } from "@paper-design/shaders-react";
```

## Current MeshGradient Config

Current production config in `src/components/blinds-aurora-background.jsx`:

```jsx
<MeshGradient
  width={1280}
  height={720}
  colors={["#ffe5fd", "#ff8ade", "#ffadef", "#ff9ee7"]}
  distortion={0.7}
  swirl={0.6}
  grainMixer={0}
  grainOverlay={0}
  speed={isActive ? 1.2 : 0}
  scale={0.88}
  rotation={360}
  offsetX={-0.16}
/>
```

Notes:

- `speed` is dynamic.
- In Hero viewport: `1.2`
- Outside Hero viewport: `0`
- The pause behavior is controlled from `App.jsx`, not inside CSS.

## Background Layering Rules

### 1. Background container

`src/index.css`

```css
.creatorial-hero-bg {
  position: absolute;
  inset: 0 0 auto;
  z-index: 0;
  height: 100vh;
  max-height: 1000px;
  overflow: hidden;
  pointer-events: none;
}
```

This keeps the shader locked to the Hero viewport rather than the full page scroll height.

### 2. Mesh wrapper

```css
.creatorial-hero-bg__mesh {
  inset: -6% -8% -8%;
  z-index: 0;
  opacity: 1;
  filter: saturate(1.08);
}
```

This wrapper slightly overscales the shader area so the animated field does not expose hard bounds at the edges.

### 3. White overlay mask

The Hero uses a full-screen top-to-bottom white gradient mask:

```css
.creatorial-hero-bg__gradient {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}
```

This creates:

- Stronger whitening at the top
- Lighter whitening through the middle
- No white overlay at the bottom

### 4. Bottom fade into next section

The Hero section itself also has a bottom white fade:

```css
.hero::after {
  height: 180px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
}
```

This is separate from the shader overlay. It is used to blend the Hero into the next white section.

## Hero Performance Rules

### 1. Pause shader outside Hero

`App.jsx` uses `IntersectionObserver`:

```jsx
const [heroRef, isHeroInView] = useSectionInView(0.08);
<BlindsAuroraBackground isActive={isHeroInView} />
<section className="hero" ref={heroRef}>
```

When Hero is no longer in view, `isActive` becomes `false`, and the shader speed becomes `0`.

### 2. Same viewport pause system used elsewhere

The same pattern is already extended to:

- Trusted logos marquee
- Key Features continuous animations
- How It Works videos

So Hero now matches the project’s current motion optimization strategy.

## Hero Content Layout Rules

### Container

```css
.hero {
  height: 100vh;
  max-height: 1000px;
  padding: 8.2rem var(--safe-padding) 0;
  overflow: hidden;
  clip-path: inset(0);
}
```

Key points:

- Hero is viewport-bound
- content is clipped
- layout is fluid on desktop through CSS variables and clamps

### Copy block

`.hero-copy` is centered with max width `2268px`.

### Heading

Two-line heading with responsive clamp typography:

- line 1: `clamp(30px, 2.24vw, 57.5px)`
- line 2: `clamp(36px, 2.84vw, 72.7px)`

### CTAs

- Primary button: dark fill
- Secondary button: light fill
- `Book A Demo` border has been removed

Current secondary CTA rule:

```css
.hero-cta--light {
  background: rgba(255, 255, 255, 0.92);
  color: #171717;
  border: none;
}
```

## Developer Change Checklist

If adjusting the Hero later, change in this order:

1. `MeshGradient` params in `blinds-aurora-background.jsx`
2. white overlay in `.creatorial-hero-bg__gradient`
3. Hero bottom blend in `.hero::after`
4. layout sizing in `.hero`, `.hero-copy`, `.hero h1`, `.hero-cta`
5. viewport pause logic in `App.jsx`

## Recommended Guardrails

- Do not remove `pointer-events: none` from background layers.
- Do not remove `clip-path: inset(0)` from `.hero` unless you also re-test overflow behavior.
- Do not move pause logic into scroll listeners; keep `IntersectionObserver`.
- If changing shader scale or offsets, re-check desktop wide screens and tablet crop behavior.
- If changing mask opacity, verify text contrast on the heading and CTA row.

## Quick Reuse Summary

If another developer wants to rebuild the Hero quickly, the minimum required pieces are:

1. `MeshGradient` background component
2. white full-height top overlay
3. white bottom section fade
4. viewport pause logic with `IntersectionObserver`
5. centered copy + CTA + mockup stack

That is the current implementation baseline.
