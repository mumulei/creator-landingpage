# Token Factory illustrations

- Hairline source: https://github.com/lucasmarkes/hairline (MIT).
  The unmodified kernel lives in `public/vendor/hairline-kernel.js`.
  Custom geometry lives in `src/components/token-art/hairline-figure.js`.
  The React wrapper mounts and disposes the kernel's pointer and frame-loop handlers.
- Anatomy source: https://github.com/wheresryan22/anatomy (MIT).
  The hero uses the official `anatomy-figures/computer` component, loaded in its
  own chunk. The local adapter hides the demo frame and replaces the display
  mark with the existing Creatorial asset. Keyboard input and power switching
  remain the official component's interactions.
- `node scripts/token-art/check-hairline.mjs` builds the standalone Hairline
  review files and runs the installed skill's static validator. It needs the
  `hairline-create` skill installed under `~/.codex/skills`.

The old three-scene hero has been replaced by one interactive desktop computer.
The five-step flow is now a compact vertical timeline, with alternating copy
on desktop and one reading column on mobile. Each step has a short explanation,
a two-digit number and a small Lucide icon at 1.35px stroke. The central line
progresses on scroll; focus and pointer interaction highlight the current row.
The previous oversized Nucleo icons and package have been removed.
The AI Stack uses four custom Hairline figures in `hairline-stack.js`: a globe
with three floating creator portrait cards and no instrument base, an open
three-layer neural lattice with connected nodes and manufactured frames, a
three-level compute assembly with cooling fins, and a Creatorial logo hub
connected to five AI providers (Gemini, GPT, Claude, DeepSeek and Grok) on an open arc. No flow illustration is
reused in the AI Stack. Four SVG arrows make the ordered flow explicit.
The five brand marks come from lobehub/lobe-icons; their license is preserved
in `public/token-art/ai-logos/LICENSE`. Brand marks are a user-requested
exception to Hairline's geometry-only convention. All animation uses the
unmodified Hairline scheduler, not a separate 3D or particle renderer.
Part selection uses the kernel's 700ms tweens with a 40ms distance stagger;
continuous pointer offset uses its default springs. Hit points stay at rest.
Token providers are spaced equally along a 270-degree arc, with curved links
to the central Creatorial mark. Their logos stay #a4a4ac at rest and turn
black for the selected node; its rim and link gain the kernel highlight.
The previous isometric tiles have been removed. Orbit nodes never lift.
The React wrapper runs the upstream `HL.tour` for all four Stack figures,
pauses for pointer/keyboard control, resumes on leave, and disposes the tour
before the figure. Reduced-motion mode does not start automatic tours.
The globe surface rotates orthographically once per approximately 52 seconds;
only meridians and parallels are drawn, with no land or country shapes.
The orbit and portraits stay fixed while the surface lines rotate behind the limb.
Hovering the provider orbit sends staggered pulses from the center along all
five quadratic links. Pulses are moving 46%-length route strokes, each traversing
its link in 620ms with a 55ms stagger on a 1.15s loop. The user-requested 1.4px
trace is an explicit emphasis override. Leaving hides it; reduced motion disables it.

Hairline figures have no default selected part. They run a subtle geometry-only
idle loop with the original kernel scheduler; only actual pointer/keyboard
selection, including the automatic tour, applies the highlight stroke. User-requested neutral rest styling
takes precedence over the skill's default single-highlight rest rule.

The presentation follows the Home page's Satoshi typography, 48px pill buttons,
quiet white cards, soft borders and grey body copy. The Figma reference was
read at Home `42668:1709`, hero `42668:1725`, and card `42668:7266`.

Validation: production build, ESLint on the modified React modules, all nine
Hairline static validations, browser rendering of all nine instances, pointer
and keyboard response, and desktop/phone/320px layouts. Rest has zero active
Hairline highlight strokes; the idle loop moves geometry without selecting it.
The current hero is upstream geometry; the replaced custom mechanical drawings
and their generator remain as earlier design exploration, not runtime assets.
