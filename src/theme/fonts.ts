/* FIRST — font resolution.
 * Custom fonts in React Native don't synthesize weight/italic reliably, so we
 * map each (family, weight, italic) to the exact face name loaded by the
 * @expo-google-fonts packages. The map of names→modules used by useFonts()
 * lives in ./loadFonts.ts.
 */

type Weight = 300 | 400 | 500 | 600 | 700;

/** Hanken Grotesk — the interface. */
function sans(weight: Weight = 400, italic = false): string {
  const w =
    weight <= 300
      ? '300Light'
      : weight >= 700
        ? '700Bold'
        : weight >= 600
          ? '600SemiBold'
          : weight >= 500
            ? '500Medium'
            : '400Regular';
  return `HankenGrotesk_${w}${italic ? '_Italic' : ''}`;
}

/** IBM Plex Mono — the archive's data layer. */
function mono(weight: Weight = 400, italic = false): string {
  const w = weight >= 600 ? '600SemiBold' : weight >= 500 ? '500Medium' : '400Regular';
  return `IBMPlexMono_${w}${italic ? '_Italic' : ''}`;
}

/** Instrument Serif — cinematic display. Ships regular + italic only. */
function serif(italic = false): string {
  return `InstrumentSerif_400Regular${italic ? '_Italic' : ''}`;
}

export const font = { sans, mono, serif };

/** em → absolute px letter-spacing, against a given font size. */
export const track = (fontSize: number, em: number): number => fontSize * em;
