/* FIRST — IndexLabel. The archival chapter number, e.g. FIRST #021.
 * Tracked mono, amber by default. Ported from components/data/IndexLabel.jsx.
 */
import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { onImage as onImageTokens, useTheme, mono } from '../theme';

export type IndexTone = 'accent' | 'muted' | 'on-image';
export type IndexSize = 'sm' | 'md' | 'lg';

const FONT: Record<IndexSize, number> = { sm: 10.5, md: 13, lg: 16 };

export function IndexLabel({
  n,
  prefix = 'FIRST',
  pad = 3,
  size = 'md',
  tone = 'accent',
  style,
}: {
  n?: number | string | null;
  prefix?: string;
  pad?: number;
  size?: IndexSize;
  tone?: IndexTone;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const num = n === undefined || n === null ? '' : String(n).padStart(pad, '0');
  const color =
    tone === 'muted'
      ? colors.text.muted
      : tone === 'on-image'
        ? onImageTokens.soft
        : colors.text.accent;

  // labelLg tracking (0.24em)
  const textStyle = [mono(FONT[size], { em: 0.24, weight: 500 }), { color }];

  return (
    <View style={[styles.row, style]}>
      <Text style={textStyle}>{prefix}</Text>
      {num !== '' && <Text style={textStyle}>{`#${num}`}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
});
