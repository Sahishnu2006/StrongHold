import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '../theme';
import { FormListing } from '../types';
import { Badge, BadgeTone } from './Badge';
import { Card } from './Card';
import { Icon } from './Icon';

const VERDICT_TONE: Record<FormListing['verdict'], BadgeTone> = {
  safe: 'success',
  caution: 'warning',
  malicious: 'danger',
};

const VERDICT_LABEL: Record<FormListing['verdict'], string> = {
  safe: 'Verified safe',
  caution: 'Review carefully',
  malicious: 'Blocked',
};

interface FormCardProps {
  form: FormListing;
  onPress?: () => void;
}

export function FormCard({ form, onPress }: FormCardProps) {
  return (
    <Card onPress={onPress} padding={16}>
      <View style={styles.topRow}>
        <Text style={styles.name} numberOfLines={1}>
          {form.name}
        </Text>
        <Badge tone={VERDICT_TONE[form.verdict]} dot label={VERDICT_LABEL[form.verdict]} />
      </View>
      <Text style={styles.issuer} numberOfLines={1}>
        {form.issuer}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.meta}>
          <Icon name="globe" size={14} color={palette.inkMuted} />
          <Text style={styles.metaText}>{form.languages}</Text>
        </View>
        <View style={styles.meta}>
          <Icon name="clock" size={14} color={palette.inkMuted} />
          <Text style={styles.metaText}>
            {form.fields} fields · {form.minutes} min
          </Text>
        </View>
      </View>

      {form.note ? (
        <View
          style={[
            styles.note,
            { backgroundColor: form.verdict === 'malicious' ? palette.dangerSoft : palette.warningSoft },
          ]}
        >
          <Text
            style={[
              styles.noteText,
              { color: form.verdict === 'malicious' ? palette.danger : palette.warning },
            ]}
          >
            {form.note}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    ...typography.bodyStrong,
    flex: 1,
  },
  issuer: {
    ...typography.caption,
    marginTop: 3,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    ...typography.caption,
    fontSize: 11,
  },
  note: {
    marginTop: spacing.md,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
});
