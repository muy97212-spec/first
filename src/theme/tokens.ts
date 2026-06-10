/* FIRST — design tokens
 * Ported from the design system's tokens/*.css. Raw scales only; semantic
 * aliases (which flip between the Paper and Cinema worlds) live in themes.ts.
 *
 * Note on units: CSS letter-spacing is in `em`; React Native letterSpacing is
 * absolute px. The type presets in ./type.ts convert em→px against font size.
 */

/** Warm ink — near-black through warm grey. */
export const ink = {
  900: '#16130F', // almost-black, warm
  800: '#221E18',
  700: '#38322B',
  600: '#564E44',
  500: '#756B5E',
  400: '#978C7C',
  300: '#B8AD9C',
  200: '#D6CCBC',
  100: '#E8E0D3',
} as const;

/** Paper — warm off-white archive surfaces. */
export const paper = {
  '000': '#FFFFFF',
  100: '#FAF6EF', // primary page
  200: '#F3ECE1', // raised / inset
  300: '#EBE2D4', // hairlines, wells
} as const;

/** Cinema — warm blacks for immersive / capture surfaces. */
export const cinema = {
  '000': '#000000',
  900: '#0C0A08', // primary immersive bg
  800: '#161310', // raised surface on cinema
  700: '#221E19', // cards / sheets on cinema
  line: '#312B24',
} as const;

/** Accent — sunset amber. Used only at moments of meaning. */
export const amber = {
  600: '#B5562F',
  500: '#C86B3C', // primary accent
  400: '#D88A5C',
  200: '#EAC4A6',
} as const;

/** Support — system states only, never decoration. */
export const signal = {
  good: '#5E7C5A', // muted sage — saved / synced
  warn: '#B98A3C', // muted ochre
} as const;

/** Cinema foreground (the warm off-white used on near-black). */
export const cinemaFg = '#F4EEE4';

/** Spacing scale (4px base). */
export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

/** Semantic spacing. */
export const gutter = { screen: space[6], page: space[16] } as const;

/** Radii — photographs keep a crisp print edge; chrome is softly rounded. */
export const radius = {
  none: 0,
  print: 3, // a photographic print's edge
  sm: 8,
  md: 14, // buttons, inputs
  lg: 22, // sheets, large cards
  xl: 32, // bottom-sheet top corners
  pill: 999, // chips, capsule controls
} as const;

export const border = { hairline: 1, base: 1.5 } as const;

/** Motion — calm and cinematic; nothing bounces. */
export const duration = {
  quick: 140,
  base: 240,
  slow: 420,
  develop: 900, // the signature "memory develops" reveal
} as const;

/** Cubic-bezier control points, consumed by Easing.bezier in ./motion.ts. */
export const easeOut = [0.22, 0.61, 0.36, 1] as const;
export const easeCinematic = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

/** On-image overlays — text sitting on a photograph (literal whites). */
export const onImage = {
  text: 'rgba(255,255,255,0.98)',
  soft: 'rgba(255,255,255,0.72)',
  faint: 'rgba(255,255,255,0.50)',
  fill: 'rgba(255,255,255,0.14)', // frosted control fill
  fillHover: 'rgba(255,255,255,0.24)',
  hairline: 'rgba(255,255,255,0.22)', // frosted control border
} as const;

/** Protection-scrim gradient stops (photo → readable text at the edges).
 *  Consumed by <Scrim> via expo-linear-gradient. Each entry is [color, stop]. */
export const scrim = {
  top: [
    ['rgba(8,6,4,0.55)', 0],
    ['rgba(8,6,4,0)', 0.42],
  ],
  bottom: [
    ['rgba(8,6,4,0.78)', 0],
    ['rgba(8,6,4,0.28)', 0.38],
    ['rgba(8,6,4,0)', 0.7],
  ],
} as const;
