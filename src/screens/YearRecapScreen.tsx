/* FIRST — Year recap. The year, packaged automatically. Lives under the "You"
 * tab: stats, a montage, the most-replayed memory, and a printed-book CTA.
 * Ported from ui_kits/first_app/YearRecap.jsx.
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, TabBar, type TabItem } from '../components';
import { Icon } from '../icons';
import { MEMORIES, RECAP } from '../data';
import { serif, sans, mono, radius, shadowPrint, useTheme } from '../theme';
import type { Go } from './types';

const TABS: TabItem[] = [
  { id: 'capture', label: 'Capture', icon: <Icon.aperture /> },
  { id: 'archive', label: 'Archive', icon: <Icon.bookOpen /> },
  { id: 'you', label: 'You', icon: <Icon.user /> },
];

export function YearRecapScreen({
  go,
  tab,
  setTab,
}: {
  go: Go;
  tab: string;
  setTab: (id: string) => void;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const r = RECAP;
  const shots = MEMORIES.slice(0, 5);

  const stats = [
    { n: r.firsts, label: 'Firsts' },
    { n: r.cities, label: 'Cities' },
    { n: r.countries, label: 'Countries' },
    { n: r.rolls, label: 'Rolls' },
  ];

  return (
    <View style={[styles.root, { backgroundColor: colors.surface.page }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={[mono(10.5, { em: 0.22, weight: 500 }), { color: colors.text.accent }]}>
            YOUR YEAR · IN FIRSTS
          </Text>
          <Text style={[serif(58, { em: -0.02, lh: 0.96 }), styles.title, { color: colors.text.primary }]}>
            Twenty{'\n'}Twenty-Six
          </Text>
          <Text style={[sans(16, { lh: 1.5 }), styles.lede, { color: colors.text.secondary }]}>
            So far, twenty-two moments became chapters — without you lifting a finger after the
            shutter.
          </Text>
        </View>

        <View style={[styles.statGrid, { borderTopColor: colors.line.base }]}>
          {stats.map((s) => (
            <View key={s.label} style={[styles.stat, { borderBottomColor: colors.line.base }]}>
              <Text style={[serif(52, { em: -0.02, lh: 1 }), { color: colors.text.primary }]}>
                {s.n}
              </Text>
              <Text style={[mono(10.5, { em: 0.18, weight: 500 }), styles.statL, { color: colors.text.muted }]}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.montage}>
          {shots.map((m) => (
            <View key={m.index} style={styles.shot}>
              <Image source={m.image} style={StyleSheet.absoluteFill} contentFit="cover" />
            </View>
          ))}
        </View>

        <View style={styles.highlight}>
          <Text style={[mono(10, { em: 0.18, weight: 500 }), { color: colors.text.muted }]}>
            Most replayed
          </Text>
          <Text style={[serif(34, { lh: 1.05, em: 0 }), styles.hTitle, { color: colors.text.primary }]}>
            {r.highlight}
          </Text>
          <Text style={[mono(10.5, { em: 0.14, weight: 400 }), { color: colors.text.faint }]}>
            JOSHUA TREE · 24 MAY 2026
          </Text>
        </View>

        <View style={styles.cta}>
          <Button variant="primary" shape="pill" size="lg" block icon={<Icon.bookOpen size={17} />}>
            Make this year's book
          </Button>
          <Text style={[sans(13), styles.ctaNote, { color: colors.text.muted }]}>
            A printed edition of your 2026 firsts.
          </Text>
        </View>
      </ScrollView>

      <TabBar items={TABS} active={tab} onChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 24, paddingBottom: 4 },
  title: { marginTop: 12, marginBottom: 16 },
  lede: { maxWidth: 320 },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    marginHorizontal: 24,
    marginTop: 28,
  },
  stat: { width: '50%', paddingTop: 20, paddingBottom: 22, paddingHorizontal: 4, borderBottomWidth: 1 },
  statL: { marginTop: 8 },
  montage: { flexDirection: 'row', gap: 8, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 4 },
  shot: { flex: 1, aspectRatio: 3 / 4, borderRadius: radius.print, overflow: 'hidden', ...shadowPrint },
  highlight: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 4 },
  hTitle: { marginTop: 8, marginBottom: 6 },
  cta: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 8 },
  ctaNote: { textAlign: 'center', marginTop: 12 },
});
