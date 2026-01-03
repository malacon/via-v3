# HeroParallax Component

## Overview

The `HeroParallax` component implements a fixed-background parallax hero effect where the background image stays "stuck" to the viewport while content scrolls past. This creates a subtle depth effect as the background moves slightly slower than the scroll position.

## Implementation Details

### Fixed-Layer Technique

The component uses a **fixed-layer approach** rather than CSS `background-attachment: fixed` for better cross-platform compatibility, especially on iOS Safari.

**How it works:**
- A `position: fixed` layer containing the background image is pinned to the viewport
- Framer Motion's `useScroll` and `useTransform` apply a subtle parallax transform (0px to -120px) based on scroll progress
- The hero section acts as a "window" through which the fixed background is visible
- Content scrolls normally while the background stays viewport-pinned with a subtle lag

**Why this approach:**
- More reliable on iOS Safari (which has known issues with `background-attachment: fixed`)
- Better performance control via transform animations
- Smoother scrolling experience on mobile devices

### Accessibility

The component respects `prefers-reduced-motion`:
- When users have reduced motion preferences enabled (OS/browser setting), the parallax transform is disabled via CSS
- The background remains fixed but without scroll-linked animation
- See `app/styles/tailwind.css` for the implementation

## Usage

```tsx
import HeroParallax from '#app/components/HeroParallax.tsx'

export default function MyPage() {
  return (
    <>
      <HeroParallax
        imageSrc="/img/hero.jpg"
        heading="Welcome to Via"
        subheading="Experience something extraordinary"
        heightClass="h-screen"
        overlayClass="bg-black/40"
      />
      {/* Rest of page content */}
    </>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageSrc` | `string` | **required** | Path to the background image |
| `heading` | `string` | `"Your Headline"` | Main heading text |
| `subheading` | `string` | `undefined` | Optional subheading text |
| `heightClass` | `string` | `"h-[80vh]"` | Tailwind height class (e.g., `"h-screen"`, `"h-[80vh]"`) |
| `overlayClass` | `string` | `"bg-black/40"` | Tailwind class for overlay (affects text contrast) |

## Alternative: Pure-CSS Version

For projects without Framer Motion or minimal setups, see `HeroFixedCss.tsx`. This uses `background-attachment: fixed` but may have reliability issues on iOS.

## Performance Considerations

- Keep parallax transform ranges small (±100–150px) for subtlety and performance
- Use optimized image formats (`.avif`, `.webp`) and appropriate sizing
- The component uses `will-change-transform` to optimize rendering
- Background images should be preloaded for best UX

## Integration Notes

### Adding to Existing Pages

1. Import the component: `import HeroParallax from '#app/components/HeroParallax.tsx'`
2. Replace existing hero sections with `<HeroParallax />`
3. Adjust props to match your design (heading, overlay, height)
4. Ensure your hero image is optimized and properly sized

### Gotchas

- **Fixed positioning scope**: The fixed background uses `inset-0`, so it covers the entire viewport. If you have multiple parallax heroes on one page, each will need its own fixed layer (or a different approach)
- **Z-index stacking**: The background uses `z-10`, content uses `z-10`. Ensure this doesn't conflict with your page navigation/headers
- **Image loading**: Large hero images should be optimized. Consider using Next.js Image or similar optimization
- **Mobile performance**: Test on actual devices; parallax can be janky on lower-end phones

## References

- [Framer Motion Scroll Animations](https://motion.dev/docs/react-scroll-animations)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [MDN: background-attachment](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment)
- [iOS background-attachment issues](https://stackoverflow.com/questions/41436892/background-attachment-fixed-doesnt-work-on-ios)

