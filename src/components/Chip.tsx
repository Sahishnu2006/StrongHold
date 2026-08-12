import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { palette, radius, spacing } from '../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Chip({ label, active = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        active ? styles.active : null,
        pressed && !active ? styles.pressed : null,
      ]}
    >
      <Text style={[styles.label, active ? styles.labelActive : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  active: {
    backgroundColor: palette.brandSoft,
    borderColor: palette.brand,
  },
  pressed: {
    backgroundColor: palette.canvas,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.inkSoft,
  },
  labelActive: {
    color: palette.brand,
  },
});
