/* FIRST — Camera. Zero-effort capture: a full-bleed viewfinder with minimal
 * chrome. Tap the shutter; it "develops" for a beat, then hands the generated
 * memory to the result screen. Uses the real device camera when available,
 * falling back to the viewfinder placeholder otherwise.
 * Ported from ui_kits/first_app/Camera.jsx.
 */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton, ShutterButton, Frost, Grain } from '../components';
import { Icon } from '../icons';
import { VIEWFINDER, MEMORIES } from '../data';
import { mono, sans, space } from '../theme';
import type { Go } from './types';

export function CameraScreen({ go }: { go: Go }) {
  const insets = useSafeAreaInsets();
  const vf = VIEWFINDER;
  const last = MEMORIES[0];

  const [perm, requestPerm] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [torch, setTorch] = useState(false);
  const [busy, setBusy] = useState(false);
  const camRef = useRef<CameraView>(null);
  const live = perm?.granted === true;

  useEffect(() => {
    if (perm && !perm.granted && perm.canAskAgain) requestPerm();
  }, [perm, requestPerm]);

  const capture = async () => {
    if (busy) return;
    setBusy(true);
    let image = vf.image;
    try {
      const shot = await camRef.current?.takePictureAsync({ quality: 0.75 });
      if (shot?.uri) image = shot.uri;
    } catch {
      // fall back to the viewfinder placeholder
    }
    setTimeout(() => {
      setBusy(false);
      go('result', {
        index: vf.nextIndex,
        scene: 'First Sunset',
        title: 'First Sunset',
        caption: 'The sky did all the work.',
        place: 'Santa Cruz',
        date: '09 Jun 2026',
        weekday: 'Tue',
        temp: '18°C',
        sky: 'Clear',
        time: '6:44 PM',
        month: 'June',
        image,
        aspect: 'portrait',
      });
    }, 1500);
  };

  return (
    <View style={styles.root}>
      {live ? (
        <CameraView ref={camRef} style={StyleSheet.absoluteFill} facing={facing} enableTorch={torch} />
      ) : (
        <Image source={vf.image} style={StyleSheet.absoluteFill} contentFit="cover" />
      )}
      <Grain opacity={0.06} />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={[styles.scrimTop, { height: 180 + insets.top }]}
      />
      <LinearGradient
        pointerEvents="none"
        colors={['transparent', 'rgba(0,0,0,0.62)']}
        style={styles.scrimBottom}
      />

      {/* top chrome */}
      <View style={[styles.top, { top: insets.top + 8 }]}>
        <Frost radius={999} intensity={18} style={styles.nextChip} fill="rgba(255,255,255,0.12)">
          <Text style={[mono(11, { em: 0.2, weight: 500 }), styles.nextChipText]}>
            {`FIRST #0${vf.nextIndex}`}
          </Text>
        </Frost>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <IconButton variant="on-image" size="md" label="Flash" onPress={() => setTorch((t) => !t)}>
            <Icon.zap />
          </IconButton>
          <IconButton
            variant="on-image"
            size="md"
            label="Flip camera"
            onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
          >
            <Icon.flip />
          </IconButton>
        </View>
      </View>

      {/* focus reticle */}
      <View style={styles.reticle} pointerEvents="none">
        <View style={[styles.corner, { top: 0, left: 0, borderTopWidth: 1.5, borderLeftWidth: 1.5 }]} />
        <View style={[styles.corner, { top: 0, right: 0, borderTopWidth: 1.5, borderRightWidth: 1.5 }]} />
        <View style={[styles.corner, { bottom: 0, left: 0, borderBottomWidth: 1.5, borderLeftWidth: 1.5 }]} />
        <View style={[styles.corner, { bottom: 0, right: 0, borderBottomWidth: 1.5, borderRightWidth: 1.5 }]} />
      </View>

      {/* AI guidance hint */}
      <View style={[styles.hintWrap, { bottom: 168 + insets.bottom }]} pointerEvents="none">
        <Frost radius={999} intensity={16} style={styles.hint} fill="rgba(0,0,0,0.32)">
          <Icon.sparkles size={13} color="rgba(255,255,255,0.9)" />
          <Text style={[sans(13.5, { weight: 500 }), styles.hintText]}>
            {busy ? 'Composing your memory…' : vf.hint}
          </Text>
        </Frost>
      </View>

      {/* bottom capture bar */}
      <View style={[styles.bottom, { bottom: 46 + insets.bottom }]}>
        <Pressable style={styles.thumb} onPress={() => go('archive')} accessibilityLabel="Open archive">
          <Image source={last.image} style={StyleSheet.absoluteFill} contentFit="cover" />
        </Pressable>
        <ShutterButton size={78} busy={busy} onPress={capture} />
        <Text style={[mono(11, { em: 0.2, weight: 500 }), styles.mode]}>AUTO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scrimTop: { position: 'absolute', top: 0, left: 0, right: 0 },
  scrimBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 280 },
  top: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextChip: { paddingVertical: 8, paddingHorizontal: 14, alignSelf: 'flex-start' },
  nextChipText: { color: 'rgba(255,255,255,0.9)' },
  reticle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 150,
    height: 150,
    marginTop: -75,
    marginLeft: -75,
    opacity: 0.5,
  },
  corner: { position: 'absolute', width: 22, height: 22, borderColor: 'rgba(255,255,255,0.9)' },
  hintWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 15 },
  hintText: { color: 'rgba(255,255,255,0.94)' },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  mode: { width: 48, textAlign: 'center', color: 'rgba(255,255,255,0.78)' },
});
