/* FIRST — type style factories.
 * Three voices (see tokens/typography.css). Each returns a React Native
 * TextStyle. Sizes are passed explicitly so screens can match the design's
 * exact values; defaults encode the per-family line-height and tracking rules.
 */
import type { TextStyle } from 'react-native';
import { font, track } from './fonts';

interface SerifOpts {
  italic?: boolean;
  /** unitless line-height multiplier */
  lh?: number;
  /** letter-spacing in em */
  em?: number;
  caps?: boolean;
}
/** Instrument Serif — cinematic display. Memory titles, hero statements. */
export function serif(size: number, o: SerifOpts = {}): TextStyle {
  const { italic = false, lh = 1.05, em = -0.015, caps = false } = o;
  return {
    fontFamily: font.serif(italic),
    fontSize: size,
    lineHeight: Math.round(size * lh),
    letterSpacing: track(size, em),
    ...(caps ? { textTransform: 'uppercase' as const } : null),
  };
}

interface SansOpts {
  weight?: 300 | 400 | 500 | 600 | 700;
  italic?: boolean;
  lh?: number;
  em?: number;
}
/** Hanken Grotesk — the interface. Body, buttons, labels. */
export function sans(size: number, o: SansOpts = {}): TextStyle {
  const { weight = 400, italic = false, lh = 1.5, em = 0 } = o;
  return {
    fontFamily: font.sans(weight, italic),
    fontSize: size,
    lineHeight: Math.round(size * lh),
    ...(em ? { letterSpacing: track(size, em) } : null),
  };
}

interface MonoOpts {
  weight?: 400 | 500 | 600;
  /** letter-spacing in em — default 0.16 (tracked-out labels) */
  em?: number;
  lh?: number;
  caps?: boolean;
}
/** IBM Plex Mono — the data layer. Index numbers, dates, GPS, weather. */
export function mono(size: number, o: MonoOpts = {}): TextStyle {
  const { weight = 500, em = 0.16, lh = 1, caps = true } = o;
  return {
    fontFamily: font.mono(weight),
    fontSize: size,
    lineHeight: Math.round(size * lh) || size,
    letterSpacing: track(size, em),
    ...(caps ? { textTransform: 'uppercase' as const } : null),
  };
}
