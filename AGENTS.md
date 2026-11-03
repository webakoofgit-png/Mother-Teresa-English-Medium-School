<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project decisions — Mother Teresa English Medium School

- User update (2026-11-03): use a logo-derived maroon, gold, leaf-green and warm-ivory theme instead of the initial navy/teal palette. Keep the existing semantic token aliases in `src/styles.css` for component compatibility. Original logo artwork remains unchanged.

- Stack is TanStack Start + TypeScript with file-based routing under `src/routes` (platform-fixed). The uploaded brief asks for React Router/JS; implement its intent with TanStack Router and TS instead. Do not install react-router-dom.
- All colors/typography are design tokens in `src/styles.css` (brand: navy #17365D, teal #0D9488, sunshine #F5B942, coral #F26B5B, pale teal #E9F7F4, ink #172B4D). Fonts Plus Jakarta Sans (display) + DM Sans (body) load via `<link>` in `src/routes/__root.tsx`. Never hardcode hex classes in components.
- Official logos (MTEMS badge, Shree Dhanlaxmi Foundation shield) are CDN assets imported via `.asset.json` pointers in `src/assets/`. Never recreate, recolor or modify them; use their `.url`.
- Editable site copy lives in `src/data/site.ts`. Public pages read from it so later admin CMS stages can replace it. Never fabricate real institutional facts (principal name, facilities, awards, fee structure, streams, foundation legal details) — use clearly editable placeholders.
- Animations use framer-motion with `MotionConfig reducedMotion="user"` in the root route; reveals are opacity/transform only.
- Demo data (stage 5) must be central (mock repository + localStorage), never scattered direct localStorage calls.
- No dark mode on the public site; light, whitespace-rich, premium institutional look.
