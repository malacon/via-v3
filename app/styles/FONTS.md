# Font Setup Guide - Self-Hosted Local Fonts

## Current Configuration

All fonts are now self-hosted local fonts located in `public/fonts/`:

### Baskerville (Serif Font)

- **Source**: Self-hosted (`baskerville.woff2`, `baskerville-bold.woff2`)
- **Weights Available**: 400 (Regular), 700 (Bold)
- **Italic Available**: No
- **Status**: ✅ Fully configured - All available weights loaded
- **Usage**: `font-serif` class in Tailwind
- **Note**: Only Regular (400) and Bold (700) weights are available

### Futura (Display/Sans-Serif Font)

- **Source**: Self-hosted (`futura-lt-w01-book.woff2`)
- **Current Weight**: 400 (Regular) only
- **Status**: ✅ Configured - Book weight available
- **Usage**: `font-display` class in Tailwind

### Helvetica (Navigation Font)

- **Source**: Self-hosted (`helvetica-bold.woff2`)
- **Current Weight**: 700 (Bold) only
- **Status**: ✅ Configured - Bold weight available
- **Usage**: `font-navigation` class in Tailwind

### Sans Serif (Fallback Font)

- **Source**: Self-hosted (`san-serif.woff2`)
- **Current Weight**: 400 (Regular) only
- **Status**: ✅ Configured - Regular weight available
- **Usage**: General fallback sans-serif font

## Font Weight Reference

| Weight Value | Name    | Futura Available? | Helvetica Available? | Baskerville Available? | Sans Serif Available? |
| ------------ | ------- | ----------------- | -------------------- | ---------------------- | --------------------- |
| 400          | Regular | ✅ Yes            | ❌ No                | ✅ Yes                 | ✅ Yes                |
| 700          | Bold    | ❌ No             | ✅ Yes               | ✅ Yes                 | ❌ No                 |

## Adding More Font Weights (Optional)

To add more font weights (Light, Medium, Bold variants), you would need to:

1. **Obtain additional font files** from a licensed vendor
2. **Convert to web formats**: Use tools like
   [Transfonter](https://transfonter.org/) to convert TTF/OTF to WOFF2
3. **Place fonts in `public/fonts/` directory**
4. **Add @font-face declarations** in `app/styles/tailwind.css`

## Using Fonts in Your Code

### Tailwind CSS Classes

```tsx
// Baskerville (Serif)
<h1 className="font-serif">Heading</h1>
<h1 className="font-serif font-bold">Bold Heading</h1>

// Futura (Display/Sans)
<h1 className="font-display">Display Text</h1>

// Navigation (Helvetica)
<nav className="font-navigation">Navigation</nav>

// Sans Serif
<p className="font-sans">Body text</p>
```

### Direct Font Family

```tsx
// Use CSS variables
<div style={{ fontFamily: 'var(--font-serif)' }}>Baskerville</div>
<div style={{ fontFamily: 'var(--font-display)' }}>Futura</div>
<div style={{ fontFamily: 'var(--font-navigation)' }}>Helvetica</div>
```

### Font Weights

```tsx
// Regular
<span className="font-normal">Regular text</span>

// Bold (Note: Only available for Baskerville and Helvetica)
<span className="font-bold">Bold text</span>
```

## Testing Font Availability

To verify which fonts are loaded, check the browser's Developer Tools:

1. Open DevTools → Network tab
2. Filter by "Font"
3. Reload the page
4. Verify all expected font files are loading

You can also check in the Elements tab:

1. Inspect a text element
2. Check the Computed styles
3. Verify `font-family` shows the expected font

## Troubleshooting

### Fonts Not Loading

- Check browser console for CORS errors
- Verify font file paths are correct
- Ensure fonts are in the `public/` directory for static assets

### Wrong Font Rendering

- Verify font-family fallbacks are correct
- Check that font-weight matches available weights
- Use browser DevTools to see which font is actually applied

### Font Weight Not Working

- Ensure the font file includes that weight
- Check that @font-face declarations include `font-weight` property
- Verify CSS classes use correct weight values

## Current Font Family Definitions

Located in `app/styles/tailwind.css`:

```css
--font-display: 'Futura', 'Sans Serif', system-ui, sans-serif;
--font-sans: 'Sans Serif', 'Helvetica', system-ui, sans-serif;
--font-serif: 'Baskerville', 'Georgia', serif;
--font-navigation: 'Helvetica', 'Sans Serif', system-ui, sans-serif;
```

## Next Steps

1. ✅ All local fonts are configured
2. ✅ Test font rendering across different browsers
3. ✅ Verify font weights display correctly in your components
4. ⚠️ Consider adding more font weights if needed for design consistency
