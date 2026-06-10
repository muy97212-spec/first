/* FIRST — MemoryCard. The signature output: a single, beautifully composed
 * memory. Two formats:
 *   • overlay  — text set over the photograph, on the bottom scrim (default).
 *   • editorial — a print on top, the text block on paper below (the archive).
 * Ported from components/memory/MemoryCard.jsx.
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import {
  cinema,
  radius,
  space,
  shadowPrint,
  onImage as onImageTokens,
  useTheme,
  serif,
  mono,
} from '../theme';
import { Grain } from './Grain';
import { Scrim } from './Scrim';
import { Frost } from './Frost';

export type MemoryAspect = 'portrait' | 'tall' | 'landscape' | 'square' | 'wide' | 'fill';
export type MemorySize = 'sm' | 'md' | 'lg' | 'xl';
export type MemoryVariant = 'overlay' | 'editorial';

const ASPECT: Record<Exclude<MemoryAspect, 'fill'>, number> = {
  portrait: 4 / 5,
  tall: 3 / 4,
  landscape: 3 / 2,
  square: 1,
  wide: 16 / 9,
};

const TITLE: Record<MemorySize, number> = { sm: 26, md: 38, lg: 54, xl: 72 };
const CAPTION: Record<MemorySize, number> = { sm: 15, md: 16, lg: 18, xl: 20 };

function frameStyle(aspect: MemoryAspect): ViewStyle {
  return aspect === 'fill' ? { height: '100%' } : { aspectRatio: ASPECT[aspect] };
}

export interface MemoryCardProps {
  image: ImageSourcePropType | string;
  index?: number | string;
  prefix?: string;
  title?: string;
  caption?: string;
  meta?: (string | null | undefined | false)[];
  scene?: string;
  aspect?: MemoryAspect;
  size?: MemorySize;
  caps?: boolean;
  variant?: MemoryVariant;
  style?: StyleProp<ViewStyle>;
  /** extra style for the overlay text block (e.g. bottom inset on the result screen) */
  bodyStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function MemoryCard({
  image,
  index,
  prefix = 'FIRST',
  title,
  caption,
  meta = [],
  scene,
  aspect = 'portrait',
  size = 'md',
  caps = true,
  variant = 'overlay',
  style,
  bodyStyle,
  children,
}: MemoryCardProps) {
  const { colors } = useTheme();
  const cleanMeta = meta.filter(Boolean) as string[];
  const idx =
    index === undefined || index === null
      ? null
      : `${prefix} #${String(index).padStart(3, '0')}`;
  const editorial = variant === 'editorial';

  const titleStyle: TextStyle = serif(TITLE[size], {
    caps,
    lh: 1.05,
    em: caps ? 0.005 : -0.01,
  });

  const Body = (
    <View
      style={[
        editorial ? styles.bodyEditorial : styles.bodyOverlay,
        editorial ? { gap: space[2] } : { gap: space[3] },
        bodyStyle,
      ]}
    >
      {idx && (
        <Text
          style={[
            mono(11, { em: 0.24, weight: 500 }),
            { color: editorial ? colors.text.accent : onImageTokens.soft },
          ]}
        >
          {idx}
        </Text>
      )}
      {title && (
        <Text style={[titleStyle, { color: editorial ? colors.text.primary : '#fff' }]}>
          {title}
        </Text>
      )}
      {caption && (
        <Text
          style={[
            serif(CAPTION[size], { italic: true, lh: 1.25, em: 0 }),
            { color: editorial ? colors.text.secondary : 'rgba(255,255,255,0.86)' },
          ]}
        >
          {caption}
        </Text>
      )}
      {cleanMeta.length > 0 && (
        <View style={styles.meta}>
          {cleanMeta.map((m, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <Text
                  style={[
                    mono(11, { weight: 400 }),
                    { color: editorial ? colors.text.muted : onImageTokens.soft, opacity: 0.5 },
                  ]}
                >
                  /
                </Text>
              )}
              <Text
                style={[
                  mono(11, { weight: 400 }),
                  { color: editorial ? colors.text.muted : onImageTokens.soft },
                ]}
              >
                {m}
              </Text>
            </React.Fragment>
          ))}
        </View>
      )}
      {children}
    </View>
  );

  const SceneChip = scene ? (
    <Frost radius={radius.pill} intensity={16} style={styles.scene} fill="rgba(255,255,255,0.15)">
      <Text style={[mono(10.5, { weight: 500 }), styles.sceneText]}>{scene}</Text>
    </Frost>
  ) : null;

  if (editorial) {
    return (
      <View style={[styles.editorialRoot, style]}>
        <View style={[styles.photo, frameStyle(aspect)]}>
          <Image source={image as ImageSourcePropType} style={StyleSheet.absoluteFill} contentFit="cover" />
          <Grain opacity={0.07} />
          {SceneChip}
        </View>
        {Body}
      </View>
    );
  }

  return (
    <View style={[styles.overlayRoot, frameStyle(aspect), style]}>
      <Image source={image as ImageSourcePropType} style={StyleSheet.absoluteFill} contentFit="cover" />
      <Grain opacity={0.07} />
      {scene && <Scrim variant="top" />}
      <Scrim variant="bottom" />
      {SceneChip}
      {Body}
    </View>
  );
}

const styles = StyleSheet.create({
  overlayRoot: {
    position: 'relative',
    borderRadius: radius.print,
    overflow: 'hidden',
    backgroundColor: cinema[800],
    ...shadowPrint,
  },
  editorialRoot: { position: 'relative' },
  photo: {
    position: 'relative',
    borderRadius: radius.print,
    overflow: 'hidden',
    ...shadowPrint,
  },
  bodyOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: space[8],
    paddingHorizontal: space[6],
    paddingBottom: space[6],
  },
  bodyEditorial: {
    paddingTop: space[5],
    paddingHorizontal: 2,
  },
  meta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 11 },
  scene: {
    position: 'absolute',
    top: space[5],
    left: space[5],
    paddingVertical: 7,
    paddingHorizontal: 13,
    alignSelf: 'flex-start',
  },
  sceneText: { color: '#fff' },
});
