# First — iOS app (Expo / React Native)

A production implementation of the **First** memory-camera app, built from the
[Claude Design handoff](../project) in this repo. First is an AI memory
*packaging* system: you only take photos, and each one becomes a composed
"memory chapter" — enhanced photo, auto-detected context, a scene reading, an
ALL-CAPS title, and a one-line cinematic caption. The principle is **zero-effort
capture**: open → take photo → done.

All five screens from the design are implemented and wired together:

1. **Camera** — full-bleed live viewfinder, minimal chrome. Tap the shutter; it
   "develops" for a beat, then →
2. **Capture result** — the generated memory card fades up out of a soft bright
   blur and settles into focus. No editing tools — Save / Replay / Share only.
3. **Archive** — your firsts as month-ruled chapters (editorial cards, single
   column — a story, not a feed). Tap one →
4. **Memory detail** — an immersive cinematic page with the four auto-detected
   facts and the chapter note.
5. **Year recap** — under the **You** tab: stats, a montage, the most-replayed
   memory, and a printed-book CTA.

## Run it

```bash
cd first-app
npm install          # already installed in this checkout
npx expo start       # then press: i (iOS sim) · a (Android) · w (web)
```

On a phone, install **Expo Go** and scan the QR code. The camera (live
viewfinder + real capture) needs a physical device or a simulator with a camera;
without one it falls back to the placeholder viewfinder image automatically, so
every screen still works end-to-end.

> Camera, blur, and SVG are native modules. Expo Go covers them; if you eject to
> a bare build, run `npx expo prebuild` first.

## Architecture

```
App.tsx                 load fonts → SafeAreaProvider → AppShell
src/
  AppShell.tsx          state-machine router; flips Paper/Cinema per view
  theme/                design tokens → JS (the heart of the port)
    tokens.ts           raw scales: ink / paper / cinema / amber, space, radius, motion
    themes.ts           Paper & Cinema semantic palettes (the CSS `.cinema` flip)
    ThemeContext.tsx    useTheme() — components read colors from here
    type.ts             serif() / sans() / mono() TextStyle factories
    fonts.ts            (family, weight, italic) → loaded face name
    loadFonts.ts        the 10 faces to load (per-face subpath imports)
    shadows.ts          RN shadow presets
    motion.ts           cubic-bezier easings
  components/           the 8 design-system primitives + 3 effect helpers
    Button · IconButton · Chip · IndexLabel · MetaRow
    MemoryCard · ShutterButton · TabBar
    Grain · Scrim · Frost   (CSS effects → RN, see below)
    usePressScale.ts · icon-util.ts
  icons.ts              Lucide set, canonical assignments from the design
  data.ts               sample archive (Unsplash placeholder photos)
  screens/              one file per screen, composing the primitives
```

The router mirrors the prototype's `App.jsx` exactly: a `view` + `mem` state
machine, with the bottom tab derived from the current view. Camera / result /
detail are **Cinema** (warm near-black, immersive); archive / recap are **Paper**
(light editorial). Switching worlds re-themes every primitive via context.

## How the CSS design system maps to React Native

The design medium was HTML/CSS/JS. The visual contract is preserved; the
implementation is idiomatic RN.

| Design (CSS) | This app (RN) |
| --- | --- |
| `:root` custom properties, `.cinema` scope | `theme/tokens.ts` + two palettes selected by `ThemeProvider` |
| `var(--font-*)` + Google Fonts `@import` | `@expo-google-fonts/*` loaded via `useFonts`, resolved per weight in `fonts.ts` |
| `letter-spacing` in `em` | converted to px against font size in `type.ts` |
| Lucide via CDN + `currentColor` | `lucide-react-native`; `icon-util.ts` injects the control's color (mimics `currentColor`) |
| `--scrim-top/bottom` gradients | `expo-linear-gradient` in `<Scrim>` |
| `.grain` SVG turbulence overlay | `react-native-svg` `<FeTurbulence>` in `<Grain>` (same technique) |
| `backdrop-filter: blur()` frosted controls | `expo-blur` `<BlurView>` in `<Frost>` |
| `:active { transform: scale() }` | `usePressScale` (Animated, quick-eased) |
| the "develop" reveal (`--dur-develop`) | `Animated` opacity + scale + animated blur intensity in `CaptureResultScreen` |
| `aspect-ratio`, `gap`, safe-area `env()` | RN `aspectRatio`, `gap`, `react-native-safe-area-context` |

## Fidelity notes & caveats

- **Fonts** — Instrument Serif / Hanken Grotesk / IBM Plex Mono are the brand
  faces, here as the official `@expo-google-fonts` packages (bundled, offline).
- **Photography** — all images are the design's Unsplash placeholders
  (`src/data.ts`). A real capture replaces the result/`#023` image with the
  photo you actually took. Swap `data.ts` for real archive photos.
- **Film grain** — renders via SVG turbulence on iOS and web; on some Android
  configurations the SVG filter may no-op (the grain simply doesn't show).
  Everything else is unaffected.
- **App icons / splash** — still the Expo scaffold placeholders. The design
  ships brand SVGs (`../project/assets/`); generating the PNG icon set is a
  separate step I didn't auto-create (I don't generate brand imagery).
- **Verification** — typechecks clean and bundles for both iOS and web here;
  there's no simulator in this environment, so I couldn't capture screenshots.
  Run `npx expo start` to see it live.
