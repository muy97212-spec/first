/* FIRST — semantic theme palettes.
 * Two worlds. In the CSS these were one set of aliases flipped by a `.cinema`
 * scope; here they are two concrete palettes selected via <ThemeProvider>.
 * Author screens/components against `useTheme().colors`, not the raw scales.
 */
import { ink, paper, cinema, amber, cinemaFg, onImage } from './tokens';

export type ThemeMode = 'paper' | 'cinema';

export interface ThemeColors {
  text: {
    primary: string;
    secondary: string;
    muted: string;
    faint: string;
    inverse: string;
    accent: string;
  };
  surface: {
    page: string;
    raised: string;
    inset: string;
    well: string;
  };
  line: {
    base: string;
    strong: string;
    ink: string;
  };
  accent: {
    base: string;
    press: string;
    soft: string;
  };
  /** Literal-white overlays for text/controls sitting on a photograph. */
  onImage: typeof onImage;
}

/** PAPER — light editorial. The archive, timeline, settings. */
export const paperTheme: ThemeColors = {
  text: {
    primary: ink[900],
    secondary: ink[600],
    muted: ink[400],
    faint: ink[300],
    inverse: paper[100],
    accent: amber[600],
  },
  surface: {
    page: paper[100],
    raised: paper['000'],
    inset: paper[200],
    well: paper[300],
  },
  line: {
    base: paper[300],
    strong: ink[200],
    ink: ink[900],
  },
  accent: {
    base: amber[500],
    press: amber[600],
    soft: amber[200],
  },
  onImage,
};

/** CINEMA — warm near-black. Capture, immersive memory pages, full-bleed. */
export const cinemaTheme: ThemeColors = {
  text: {
    primary: cinemaFg,
    secondary: 'rgba(244,238,228,0.70)',
    muted: 'rgba(244,238,228,0.46)',
    faint: 'rgba(244,238,228,0.30)',
    inverse: ink[900],
    accent: amber[400],
  },
  surface: {
    page: cinema[900],
    raised: cinema[800],
    inset: cinema[800],
    well: cinema[700],
  },
  line: {
    base: cinema.line,
    strong: 'rgba(244,238,228,0.18)',
    ink: cinemaFg,
  },
  accent: {
    base: amber[400],
    press: amber[500],
    soft: amber[200],
  },
  onImage,
};

export const themes: Record<ThemeMode, ThemeColors> = {
  paper: paperTheme,
  cinema: cinemaTheme,
};
