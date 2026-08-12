import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, radius } from '../theme';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'brand' | 'neutral';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  dot?: boolean;
}

const TONE_BG: Record<BadgeTone, string> = {
  success: palette.successSoft,
  warning: palette.warningSoft,
  danger: palette.dangerSoft,
  brand: palette.brandSoft,
  neutral: palette.canvas,
};

const TONE_TEXT: Record<BadgeTone, string> = {
  success: palette.success,
  warning: palette.warning,
  danger: palette.danger,
  brand: palette.brand,
  neutral: palette.inkSoft,
};

export function Badge({ label, tone = 'neutral', dot = false }: BadgeProps) {
  return (
    <View style={[styles.base, { backgroundColor: TONE_BG[tone] }]}>
      {dot ? <View style={[styles.dot, { backgroundColor: TONE_TEXT[tone] }]} /> : null}
      <Text style={[styles.label, { color: TONE_TEXT[tone] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
