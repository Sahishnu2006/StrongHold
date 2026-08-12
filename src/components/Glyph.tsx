import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface GlyphProps {
  mono: string;
  tint: string;
  soft: string;
  size?: number;
}

export function Glyph({ mono, tint, soft, size = 46 }: GlyphProps) {
  const radius = size * 0.34;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: soft,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={[styles.mono, { color: tint, fontSize: size * 0.32 }]}>{mono}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mono: {
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
