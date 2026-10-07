# Design System: Counter Arena
**Project ID:** 4541233496081771704

## 1. Visual Theme & Atmosphere
Counter Arena is a calm, precise training tool with an athletic edge. Minimal, universal, clean, and confident. The camera and the count are the focus; decoration never competes with them. Use generous empty space, obvious hierarchy, and a small number of clear actions. Avoid crowded dashboards, gradients, neon, glass effects, loud shadows, fake charts, gamification, and stock athlete imagery inside the app. Use the approved Counter Arena logo artwork, never a redrawn logo. The athlete is for website imagery only.

## 2. Color Palette & Roles
- **Warm white (#FAFAFA):** default page background and light surfaces. This should dominate non-camera screens.
- **Pale sky (#C7EEFF):** quiet selected states, guidance panels, and subtle progress or framing cues.
- **Arena blue (#0077C0):** primary action, active navigation, focused input, and valid-count feedback. Use sparingly, once per visual cluster.
- **Deep ink (#1D242B):** main text, icons, and the dark camera surface.
- On dark camera surfaces, use warm white text and pale sky details. Derive dividers and secondary text by opacity from deep ink or warm white; do not introduce a new hue family.
- Use color with text or shape, never as the only status signal. Keep readable contrast.

## 3. Typography Rules
- **Saira Condensed 600/700:** display headings, live rep or seconds number, countdown. Large, direct, with controlled letter spacing. Do not use it for paragraphs.
- **Barlow 400/500:** instructions, descriptions, and history details. Clear sentence case; 16 px body, 22–24 px line height.
- **Inter 500/600:** buttons, tabs, labels, navigation, stats, and timers. 14–16 px with clear hierarchy.
- **Noto Sans:** fallback for unsupported scripts or glyphs. Use real font names; do not substitute Barlow Condensed for Barlow.
- Prefer short, literal copy. No all-caps paragraphs, invented technical metrics, or promotional claims.

## 4. Component Stylings
- **Primary button:** one clear blue (#0077C0) filled action per screen, white label, 52–56 px tall, 12 px softly rounded corners, full-width within the content column. Disabled state stays legible. Secondary actions are ink text or ink-outline buttons.
- **Cards:** warm white surface, 1 px quiet ink-opacity border, 16 px soft corners, no heavy shadow. Use a card only when it groups a decision or result; do not wrap every text line.
- **Inputs and choices:** 52 px minimum touch height, 12 px corners, clear label above value, visible focus. Selected choices use pale sky (#C7EEFF) plus an ink check or border.
- **Navigation:** simple bottom tabs for Train, Challenge, History, and Settings; icon plus short label. Only one active destination. Hide bottom navigation during camera tracking.
- **Live count:** one large centered number with explicit unit: "reps" for push-ups and squats, "sec" for plank. Put tracking status close to count. Controls remain reachable below the camera view.
- **Icons:** simple rounded line icons with consistent 2 px strokes. No emoji as UI icons.
- **Logo:** use the approved local primary/secondary/sub-mark assets. Allow breathing room around it; do not stretch, recolor, or add effects.

## 5. Layout Principles
- Design for a 390 px Android phone first. Use a 4 px base rhythm, mainly 8/16/24/32 px gaps; 24 px side margins. Align every text block, card, and button to one shared content grid.
- Center hero messages, countdowns, counters, and empty states precisely. Left-align multi-line instructions and form labels. Do not mix alignments inside the same component.
- Use 32 px between major sections, 16–24 px between related controls, 8 px between label and value. Keep matching cards equal width and aligned edges.
- Respect status/navigation safe areas. No clipped text, overlaps, cramped icon rows, or CTA under the system gesture area. Support larger text and narrower devices without breaking alignment.
- Use one main purpose per screen. Keep supporting detail collapsible or below the primary action. Avoid long scrolling during session setup and training.
- Motion is restrained: brief count confirmation, gentle selected-state transition, no continuous decorative animation.

## 6. Product and Content Rules
- Android preview: push-up and squat valid rep counting, live count, on-device tracking, Standard/High Accuracy, exercise choice.
- Planned workout: plank measures valid hold **seconds**, never reps; framing guidance, pause/resume/finish, cues, summary, history, goals, offline after model setup, accessibility.
- Planned competition: private person-to-person challenge only. Invite one friend, live or take turns, clear rules, result, rematch, and privacy. No tournament, leaderboard, rankings, or public feed.
- Distinguish preview capabilities from planned features in screen copy. Do not invent detection accuracy, form measurements, scores, records, names, dates, or personal results. Use clear sample placeholders when showing a concept.
- Cover empty, loading, permission denied, camera out-of-frame, paused, offline, and challenge pending states where relevant.

## 7. Screen Family
1. Sign in with Google.
2. Train home and exercise choice.
3. Workout setup and camera framing.
4. Live push-up/squat count.
5. Live plank valid-seconds timer (planned).
6. Workout summary and history.
7. Private one-on-one challenge setup, invite/pending, live or later match, result/rematch (planned).
8. Settings and privacy.

For each screen, explore 2–3 **layout** alternatives inside this same identity. Vary hierarchy and composition, not the brand colors, font roles, or spacing rhythm. Keep controls aligned and compare each alternative at the same phone size.
