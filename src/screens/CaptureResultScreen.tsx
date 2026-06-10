/* FIRST — Capture result. The generated memory, developed in front of you.
 * No editing tools — Save / Replay / Share only. The card fades up from a soft,
 * bright blur and settles into focus, like film developing.
 * Ported from ui_kits/first_app/CaptureResult.jsx.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, MemoryCard, Frost } from '../components';
import { Icon } from '../icons';
import { MEMORIES, type Memory } from '../data';
import { mono, sans, easing, duration } from '../theme';
import type { Go } from './types';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

export function CaptureResultScreen({ go, memory }: { go: Go; memory?: Memory }) {
  const insets = useSafeAreaInsets();
  const m = memory ?? MEMORIES[0];
  const [saved, setSaved] = useState(false);

  const reveal = useRef(new Animated.Value(0)).current; // the develop
  const ui = useRef(new Animated.Value(0)).current; // chrome fade-in

  const play = () => {
    reveal.setValue(0);
    ui.setValue(0);
    Animated.timing(reveal, {
      toValue: 1,
      duration: duration.develop,
      easing: easing.cinematic,
      useNativeDriver: false, // drives blur intensity too
    }).start();
    Animated.timing(ui, {
      toValue: 1,
      duration: 600,
      delay: 420,
      easing: easing.out,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    play();
  }, [m]);

  const scale = reveal.interpolate({ inputRange: [0, 1], outputRange: [1.04, 1] });
  const blurI = reveal.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });
  const brightness = reveal.interpolate({ inputRange: [0, 1], outputRange: [0.32, 0] });
  const uiTranslate = ui.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });

  return (
    <View style={styles.root}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: reveal, transform: [{ scale }] }]}>
        <MemoryCard
          image={m.image}
          index={m.index}
          title={m.title}
          caption={m.caption}
          meta={[m.place, m.date, `${m.temp} ${m.sky}`]}
          aspect="fill"
          size="lg"
          bodyStyle={{ paddingBottom: 156 + insets.bottom }}
        />
        {/* developing wash — blur + brightness settling out */}
        <AnimatedBlur tint="light" intensity={blurI} style={StyleSheet.absoluteFill} pointerEvents="none" />
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { backgroundColor: '#fff', opacity: brightness }]}
        />
      </Animated.View>

      {/* top status */}
      <View style={[styles.top, { top: insets.top + 6 }]}>
        <Animated.View style={{ opacity: ui }}>
          <Frost radius={999} intensity={16} style={styles.created} fill="rgba(0,0,0,0.3)">
            <Icon.sparkles size={12} color="rgba(255,255,255,0.92)" />
            <Text style={[mono(10.5, { weight: 500 }), styles.createdText]}>Memory created</Text>
          </Frost>
        </Animated.View>
        <Pressable style={styles.close} onPress={() => go('camera')} accessibilityLabel="Close">
          <BlurView intensity={18} tint="light" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.12)' }]} />
          <Icon.x size={18} color="#fff" />
        </Pressable>
      </View>

      {/* actions */}
      <Animated.View
        style={[
          styles.actions,
          { bottom: 40 + insets.bottom, opacity: ui, transform: [{ translateY: uiTranslate }] },
        ]}
      >
        <Button
          variant="on-image"
          shape="pill"
          size="lg"
          block
          icon={saved ? <Icon.check /> : <Icon.bookmark />}
          onPress={() => {
            setSaved(true);
            setTimeout(() => go('archive'), 650);
          }}
        >
          {saved ? 'Saved to archive' : 'Save to archive'}
        </Button>
        <View style={styles.minor}>
          <Pressable style={styles.ghost} onPress={play}>
            <Icon.replay size={16} color="rgba(255,255,255,0.82)" />
            <Text style={[sans(14, { weight: 500 }), styles.ghostText]}>Replay</Text>
          </Pressable>
          <View style={styles.sep} />
          <Pressable style={styles.ghost}>
            <Icon.share size={16} color="rgba(255,255,255,0.82)" />
            <Text style={[sans(14, { weight: 500 }), styles.ghostText]}>Share</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  top: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  created: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 7, paddingHorizontal: 13 },
  createdText: { color: 'rgba(255,255,255,0.92)' },
  close: {
    width: 40,
    height: 40,
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  actions: { position: 'absolute', left: 20, right: 20, gap: 14 },
  minor: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18 },
  ghost: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 4, paddingHorizontal: 6 },
  ghostText: { color: 'rgba(255,255,255,0.82)' },
  sep: { width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.25)' },
});
