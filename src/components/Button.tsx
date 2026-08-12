import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { palette, radius } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: 'md' | 'lg';
  disabled?: boolean;
  leading?: ReactNode;
  style?: ViewStyle;
}

const VARIANT_FILL: Record<ButtonVariant, string> = {
  primary: palette.brand,
  secondary: palette.surface,
  ghost: 'transparent',
  danger: palette.dangerSoft,
};

const VARIANT_TEXT: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  secondary: palette.ink,
  ghost: palette.brand,
  danger: palette.danger,
};

const VARIANT_BORDER: Record<ButtonVariant, string | undefined> = {
  primary: undefined,
  secondary: palette.border,
  ghost: undefined,
  danger: undefined,
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  leading,
  style,
}: ButtonProps) {
  const height = size === 'lg' ? 54 : 44;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: 'rgba(255,255,255,0.18)', borderless: false }}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          backgroundColor: VARIANT_FILL[variant],
          borderColor: VARIANT_BORDER[variant],
          opacity: disabled ? 0.5 : pressed ? 0.88 : 1,
        },
        style,
      ]}
    >
      {leading}
      <Text style={[styles.label, { color: VARIANT_TEXT[variant] }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});
