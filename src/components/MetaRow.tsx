/* FIRST — MetaRow. EXIF-style facts joined by a separator: place / date /
 * weather. Tracked mono caps. Ported from components/data/MetaRow.jsx.
 */
import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { onImage as onImageTokens, useTheme, mono } from '../theme';

export type MetaSize = 'sm' | 'md';

const FONT: Record<MetaSize, number> = { sm: 10.5, md: 12 };
const GAP: Record<MetaSize, number> = { sm: 10, md: 12 };

export function MetaRow({
  items = [],
  separator = '/',
  size = 'md',
  onImage = false,
  color,
  style,
}: {
  items?: (string | null | undefined | false)[];
  separator?: string;
  size?: MetaSize;
  onImage?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const clean = items.filter(Boolean) as string[];
  const base = mono(FONT[size], { weight: 400 });
  const c = color ?? (onImage ? onImageTokens.soft : colors.text.muted);

  return (
    <View style={[styles.row, { columnGap: GAP[size] }, style]}>
      {clean.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Text style={[base, { color: c, opacity: 0.5 }]}>{separator}</Text>}
          <Text style={[base, { color: c }]}>{it}</Text>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
});
