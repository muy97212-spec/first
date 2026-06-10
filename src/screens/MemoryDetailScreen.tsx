/* FIRST — Memory detail. One memory, one cinematic page. A full-bleed hero,
 * then the auto-detected facts and the chapter note. Immersive (cinema world).
 * Ported from ui_kits/first_app/MemoryDetail.jsx.
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Frost, Grain, Scrim } from '../components';
import { Icon } from '../icons';
import { MEMORIES, type Memory } from '../data';
import { cinema, radius, serif, sans, mono, useTheme } from '../theme';
import type { Go } from './types';

export function MemoryDetailScreen({ go, memory }: { go: Go; memory?: Memory }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const m = memory ?? MEMORIES[0];

  const facts = [
    { icon: <Icon.mapPin />, label: 'Place', value: m.place },
    { icon: <Icon.calendar />, label: 'Date', value: `${m.weekday} · ${m.date}` },
    { icon: <Icon.clock />, label: 'Time', value: m.time },
    { icon: <Icon.thermometer />, label: 'Weather', value: `${m.temp} · ${m.sky}` },
  ];

  return (
    <View style={[styles.root, { backgroundColor: colors.surface.page }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={m.image} style={StyleSheet.absoluteFill} contentFit="cover" />
          <Grain opacity={0.07} />
          <Scrim variant="bottom" />
          <View style={styles.heroText}>
            <Frost radius={radius.pill} intensity={16} style={styles.scene} fill="rgba(255,255,255,0.14)">
              <Text style={[mono(10.5, { weight: 500 }), { color: '#fff' }]}>{m.scene}</Text>
            </Frost>
            <Text style={[mono(11, { em: 0.24, weight: 500 }), { color: 'rgba(255,255,255,0.82)' }]}>
              {`FIRST #0${m.index}`}
            </Text>
            <Text style={[serif(52, { caps: true, lh: 1.02, em: 0.005 }), styles.title]}>{m.title}</Text>
            <Text style={[serif(19, { italic: true, lh: 1.3, em: 0 }), styles.caption]}>
              “{m.caption}”
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={[styles.grid, { borderColor: cinema.line }]}>
            {facts.map((f, i) => (
              <View
                key={f.label}
                style={[
                  styles.cell,
                  { backgroundColor: colors.surface.page },
                  i % 2 === 0 && { borderRightWidth: 1, borderRightColor: cinema.line },
                  i < 2 && { borderBottomWidth: 1, borderBottomColor: cinema.line },
                ]}
              >
                <View style={styles.cellHead}>
                  {React.cloneElement(f.icon as React.ReactElement<any>, {
                    size: 15,
                    color: colors.text.accent,
                  })}
                  <Text style={[mono(9.5, { weight: 500 }), { color: colors.text.muted }]}>
                    {f.label}
                  </Text>
                </View>
                <Text style={[sans(15, { weight: 500 }), { color: colors.text.primary }]}>
                  {f.value}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.note}>
            <Text style={[mono(10, { em: 0.18, weight: 500 }), { color: colors.text.muted }]}>
              The chapter
            </Text>
            <Text style={[serif(21, { lh: 1.4, em: 0 }), styles.noteText, { color: colors.text.secondary }]}>
              First read the light and the place, then wrote this down for you — so the moment keeps
              even after the evening does.
            </Text>
          </View>

          <View style={[styles.share, { paddingBottom: insets.bottom + 24 }]}>
            <Button variant="on-image" shape="pill" size="lg" block icon={<Icon.share size={17} />}>
              Share this memory
            </Button>
          </View>
        </View>
      </ScrollView>

      {/* floating back */}
      <Pressable style={[styles.back, { top: insets.top + 6 }]} onPress={() => go('archive')} accessibilityLabel="Back">
        <BlurView intensity={18} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
        <Icon.arrowLeft size={18} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { height: 540, position: 'relative', overflow: 'hidden' },
  heroText: { position: 'absolute', left: 24, right: 24, bottom: 22, gap: 0 },
  scene: { paddingVertical: 6, paddingHorizontal: 12, alignSelf: 'flex-start', marginBottom: 16 },
  title: { color: '#fff', marginTop: 8, marginBottom: 10 },
  caption: { color: 'rgba(255,255,255,0.88)' },
  body: { padding: 24, paddingTop: 28 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  cell: { width: '50%', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 18 },
  cellHead: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 9 },
  note: { marginTop: 26 },
  noteText: { marginTop: 10 },
  share: { marginTop: 30 },
  back: {
    position: 'absolute',
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
});
