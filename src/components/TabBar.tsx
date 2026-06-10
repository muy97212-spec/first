/* FIRST — TabBar. The app's three rooms: Capture / Archive / You. Mono labels,
 * an amber dot under the active tab. A paper variant (opaque) and a cinema
 * variant (frosted over black). Ported from components/navigation/TabBar.jsx.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cinema, cinemaFg, space, useTheme, mono } from '../theme';
import { tintIcon } from './icon-util';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function TabBar({
  items,
  active,
  onChange,
  cinema: isCinema = false,
}: {
  items: TabItem[];
  active?: string;
  onChange?: (id: string) => void;
  cinema?: boolean;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const activeColor = isCinema ? cinemaFg : colors.text.primary;

  const Bar = (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: space[2] + insets.bottom,
          borderTopColor: isCinema ? cinema.line : colors.line.base,
        },
        !isCinema && { backgroundColor: colors.surface.raised },
      ]}
    >
      {items.map((it) => {
        const on = it.id === active;
        const color = on ? activeColor : colors.text.muted;
        return (
          <Pressable
            key={it.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange?.(it.id)}
            style={styles.tab}
          >
            <View style={styles.icon}>{tintIcon(it.icon, color, 21)}</View>
            <Text style={[mono(9.5, { em: 0.14, weight: 500 }), { color }]}>{it.label}</Text>
            <View
              style={[styles.dot, { backgroundColor: colors.accent.base, opacity: on ? 1 : 0 }]}
            />
          </Pressable>
        );
      })}
    </View>
  );

  if (isCinema) {
    return (
      <BlurView intensity={28} tint="dark" style={styles.cinemaWrap}>
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(12,10,8,0.72)' }]} />
        </View>
        {Bar}
      </BlurView>
    );
  }
  return Bar;
}

const styles = StyleSheet.create({
  cinemaWrap: { overflow: 'hidden' },
  bar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingTop: space[2],
    paddingHorizontal: space[4],
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: space[2],
  },
  icon: { height: 24, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 4, height: 4, borderRadius: 2 },
});
