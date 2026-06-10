/* FIRST — Archive. Your life as chapters, newest first, grouped by month.
 * Editorial cards, single column, month-ruled — a story, not a feed.
 * Ported from ui_kits/first_app/Timeline.jsx.
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MemoryCard, TabBar, type TabItem } from '../components';
import { Icon } from '../icons';
import { MEMORIES, type Memory } from '../data';
import { serif, mono, space, useTheme } from '../theme';
import type { Go } from './types';

const TABS: TabItem[] = [
  { id: 'capture', label: 'Capture', icon: <Icon.aperture /> },
  { id: 'archive', label: 'Archive', icon: <Icon.bookOpen /> },
  { id: 'you', label: 'You', icon: <Icon.user /> },
];

export function ArchiveScreen({
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

  // group consecutive memories by month
  const groups: { month: string; items: Memory[] }[] = [];
  MEMORIES.forEach((m) => {
    const g = groups[groups.length - 1];
    if (g && g.month === m.month) g.items.push(m);
    else groups.push({ month: m.month, items: [m] });
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.surface.page }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={[mono(10.5, { em: 0.22, weight: 500 }), { color: colors.text.accent }]}>
            YOUR FIRSTS · 2026
          </Text>
          <Text style={[serif(46, { em: -0.02, lh: 1.0 }), styles.title, { color: colors.text.primary }]}>
            The Archive
          </Text>
          <Text style={[mono(11, { em: 0.14, weight: 400 }), { color: colors.text.muted }]}>
            22 chapters · 9 cities
          </Text>
        </View>

        {groups.map((g) => (
          <View key={g.month} style={styles.group}>
            <View style={styles.monthRow}>
              <Text style={[mono(11, { em: 0.18, weight: 500 }), { color: colors.text.secondary }]}>
                {g.month}
              </Text>
              <View style={[styles.rule, { backgroundColor: colors.line.base }]} />
            </View>
            <View style={styles.list}>
              {g.items.map((m) => (
                <Pressable key={m.index} onPress={() => go('detail', m)}>
                  <MemoryCard
                    variant="editorial"
                    image={m.image}
                    index={m.index}
                    title={m.title}
                    caption={m.caption}
                    meta={[m.place, m.date]}
                    scene={m.scene}
                    aspect={m.aspect === 'landscape' ? 'landscape' : 'tall'}
                    size="sm"
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <TabBar items={TABS} active={tab} onChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 24, paddingBottom: 8 },
  title: { marginTop: 10, marginBottom: 8 },
  group: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 4 },
  monthRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  rule: { flex: 1, height: 1 },
  list: { gap: 30 },
});
