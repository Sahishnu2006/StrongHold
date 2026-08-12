import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, radius, spacing, typography } from '../theme';
import { DocumentItem } from '../types';
import { DOCUMENT_TYPES } from '../data/documentTypes';
import { Glyph } from './Glyph';
import { Card } from './Card';
import { Icon } from './Icon';

interface VaultItemCardProps {
  document: DocumentItem;
  onPress?: () => void;
}

export function VaultItemCard({ document, onPress }: VaultItemCardProps) {
  const meta = DOCUMENT_TYPES[document.type];

  return (
    <Card onPress={onPress} padding={14}>
      <View style={styles.row}>
        <Glyph mono={meta.mono} tint={meta.tint} soft={meta.soft} size={46} />
        <View style={styles.textBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {document.title}
            </Text>
            <Icon name="lock" size={12} color={palette.success} />
          </View>
          <Text style={styles.reference} numberOfLines={1}>
            {document.reference}
          </Text>
          <Text style={styles.date}>{document.addedAt}</Text>
        </View>
        <Icon name="chevronRight" size={16} color={palette.inkMuted} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    ...typography.bodyStrong,
    flexShrink: 1,
  },
  reference: {
    ...typography.caption,
    fontSize: 12,
    fontVariant: ['tabular-nums'],
  },
  date: {
    ...typography.caption,
    fontSize: 11,
    marginTop: 1,
  },
});
