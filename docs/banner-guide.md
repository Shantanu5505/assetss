# Personal banner kit

A dependency-free Node.js banner generator for this profile. Requires Node.js 18+.

## List styles
```bash
node banner-kit/make-banner.mjs --list
```

## Generate a banner
```bash
node banner-kit/make-banner.mjs --style diagonal-drift --repo "Shantanu Dhatrak" --tagline "AI & Data Science Engineer" --handle "@Shantanu5505" --out banners/custom.svg
```

Available styles: diagonal-drift, flow-field, radial-burst, data-streams, orbit-arcs, signal-waves and circuit-traces.

Use `--animate false` for a static SVG. Text is XML-escaped. Keep titles and taglines concise so they fit the 1280 × 360 canvas.

## Publish
Commit the generated SVG, then embed its raw GitHub URL in a README. Use stable file paths so existing profile links remain valid. The social preview is a separate 1280 × 640 asset and must be uploaded through repository Settings → Social preview.
