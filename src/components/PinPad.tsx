import React, { useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { palette, radius, spacing, typography } from '../theme';
import { Icon } from './Icon';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'] as const;

interface PinPadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function PinPad({ value, onChange, maxLength = 6 }: PinPadProps) {
  const [shake] = useState(() => new Animated.Value(0));

  const handleKey = (key: string) => {
    if (key === 'del') {
      onChange(value.slice(0, -1));
      return;
    }
    if (!key || value.length >= maxLength) {
      return;
    }
    onChange(value + key);
  };

  const shakeTranslate = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-10, 10],
  });

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[styles.dots, { transform: [{ translateX: shakeTranslate }] }]}
      >
        {Array.from({ length: maxLength }).map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i < value.length ? styles.dotFilled : null]}
          />
        ))}
      </Animated.View>

      <View style={styles.grid}>
        {KEYS.map((key, i) => {
          if (key === '') {
            return <View key={i} style={styles.keySlot} />;
          }
          const isBackspace = key === 'del';
          return (
            <Pressable
              key={i}
              onPress={() => handleKey(key)}
              style={({ pressed }) => [
                styles.key,
                pressed ? styles.keyPressed : null,
              ]}
              android_ripple={{ color: palette.brandSoft, borderless: true }}
            >
              {isBackspace ? (
                <Icon name="backspace" size={26} color={palette.ink} />
              ) : (
                <Text style={styles.keyText}>{key}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxxl,
    minHeight: 14,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  dotFilled: {
    backgroundColor: palette.brand,
    borderColor: palette.brand,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.lg,
  },
  keySlot: {
    width: '33.333%',
    alignItems: 'center',
  },
  key: {
    width: 68,
    height: 68,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  keyPressed: {
    backgroundColor: palette.brandSoft,
    borderColor: palette.brand,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
    color: palette.ink,
  },
});
