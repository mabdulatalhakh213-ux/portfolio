# portfolio

## Animation and interaction upgrade

This portfolio now includes a reusable motion system and high-impact interactions implemented directly in the existing single-page architecture.

### Added motion capabilities

- Object reveal on hover/focus (`.reveal-object`, `.fourth-wall-card`)
- Portal animation (`.portal-card .portal-ring`, `@keyframes portalOrbit`)
- 3D product animation (`#productScene`, `.product-face`)
- Parallax transformation (hero rig mouse + scroll parallax on `#rig`)
- Space transition (`#astral.portal-active` radial warp overlay)
- 3D gallery with depth cues (`#miniGallery`, `.g-item`)
- Breaking-the-fourth-wall effect (`#fourthWallEye` + reveal in `.fourth-wall-card`)
- Smooth loader intro (`#smoothLoader`) with short non-blocking progress
- 3D product scroll response (scroll-rotating cube in `#productScene`)
- Physics-like motion (spring/inertia follower logic for `#fourthWallEye`)
- 3D illustration rig (`#rigStage` / `#rig` hero scene)
- Horizontal scroll storytelling section (`#hScroll`) with scroll-snap and wheel-to-horizontal behavior
- Reduced-motion and low-power fallbacks (motion gating + lower particle load)

### Performance and accessibility notes

- Respects `prefers-reduced-motion` by disabling or minimizing intensive motion.
- Low-power devices use reduced particle count and avoid heavier interaction loops.
- Hover effects are paired with keyboard-friendly focus states.
- Horizontal section supports swipe/trackpad naturally and keyboard focus.

### Dependencies

No new dependencies were added. All effects are implemented with existing HTML/CSS/vanilla JS.
