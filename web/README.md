# Nara Intelligence — landing page

Production implementation of the Claude Design prototype in
`../project/Nara Intelligence - Landing.dc.html`.

Next.js 16 (App Router) · React 19 · TypeScript · plain CSS.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx        Fonts, metadata, <LangProvider>
    page.tsx          Section composition
    globals.css       All styling — design tokens at the top
  components/         One file per section
  lib/
    copy.ts           EN + ES copy, partner list, contact email
    lang-context.tsx  Language store (English default)
    use-scroll-progress.ts
    use-muted-autoplay.ts
public/assets/        Logo + the three agent videos
```

## Notes on the implementation

**Language.** English is the default and is what the server renders. A
visitor's choice is stored in `localStorage` and applied on the client via
`useSyncExternalStore`, so there is no hydration mismatch and no flash of
the wrong language for first-time visitors. All copy lives in
`src/lib/copy.ts` — nothing is hardcoded in a component.

**Scroll behaviour.** Two sections are scroll-driven, both using
`useScrollProgress` (rAF-throttled, so it stays smooth alongside the
videos):

- *Under the hood* — a 250vh track with a sticky pane. Scroll progress
  drives a `clip-path` that wipes the android's outer shell away from the
  bottom up to reveal the interior beneath it.
- *How it works* — a 400vh track; each of the four steps owns a quarter of
  it. The active step is derived from scroll position during render (no
  state, no effect). Step videos stay mounted so the swap is a 1s
  crossfade, but only the active one is allowed to play.

**Video autoplay.** `muted` is set as a DOM *property* before `play()` and
`play()` is retried on `canplay`. Both are required to satisfy Chrome's
autoplay policy — the HTML/JSX `muted` attribute alone is not enough. See
`use-muted-autoplay.ts`.

**Layout.** `overflow-x: clip` on `.page`, never `hidden` — `hidden` on an
ancestor silently breaks `position: sticky` in both scroll sections.

## Pending assets

Five visuals are still placeholders (`<ImagePlaceholder>`) because no
render exists for them yet. Each is a drop-in swap — the surrounding layout
and scroll behaviour do not change:

| Where | Component | Needs |
| --- | --- | --- |
| Under the hood, back layer | `Reveal.tsx` | Android interior / X-ray render |
| Under the hood, front layer | `Reveal.tsx` | Android exterior render |
| Step 03 — Development | `HowItWorks.tsx` (`STEP_VIDEOS[2]`) | Video |
| Step 04 — Flexible payment | `HowItWorks.tsx` (`STEP_VIDEOS[3]`) | Video |
| Company section | `About.tsx` | Team/agent image |

For the two step videos, drop the files into `public/assets/` and fill in
the `null` entries in `STEP_VIDEOS` — the crossfade and play/pause logic
already handles them.

The partner ribbon renders wordmarks as text. Official logo files were
never sourced during the design pass; if they arrive, replace the `<span>`
in `PartnerMarquee.tsx` with `<Image>` and keep the two-group structure so
the `-50%` loop stays seamless.

## Verification

Checked in Chromium at 360/390/480/640/820/1440px in both languages: no
horizontal overflow, nav fits at every width, both scroll sections track
correctly, and the step videos receive `play()`/`pause()` in the right
order.

The container's Chromium has no H.264 decoder, so the `.mp4` files render
blank *there only* — the elements, autoplay calls and crossfade were
verified by instrumenting `HTMLMediaElement`. Check the videos in a real
browser.
