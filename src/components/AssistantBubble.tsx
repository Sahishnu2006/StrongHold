import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, radius, spacing } from '../theme';

interface AssistantBubbleProps {
  role: 'assistant' | 'user';
  text: string;
}

export function AssistantBubble({ role, text }: AssistantBubbleProps) {
  const isAssistant = role === 'assistant';

  return (
    <View style={[styles.row, isAssistant ? styles.assistantRow : styles.userRow]}>
      {isAssistant ? (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SH</Text>
        </View>
      ) : null}
      <View style={[styles.bubble, isAssistant ? styles.assistantBubble : styles.userBubble]}>
        <Text style={[styles.text, isAssistant ? styles.assistantText : styles.userText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
  },
  assistantBubble: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: palette.brand,
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  assistantText: {
    color: palette.inkSoft,
  },
  userText: {
    color: '#FFFFFF',
  },
});
