import { Platform } from 'react-native';

export const palette = {
  ink: '#0B1220',
  inkSoft: '#3A4356',
  inkMuted: '#7C8698',
  surface: '#FFFFFF',
  canvas: '#F4F6FB',
  brand: '#4F46E5',
  brandDeep: '#3730A3',
  brandSoft: '#EDF0FF',
  accent: '#0891B2',
  success: '#059669',
  successSoft: '#E5F6EE',
  warning: '#C2700B',
  warningSoft: '#FDF2E2',
  danger: '#D64545',
  dangerSoft: '#FDEBEB',
  border: '#E4E8F1',
  overlay: 'rgba(11, 18, 32, 0.42)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

const systemFont = Platform.select({ ios: 'System', default: 'sans-serif' });

export const typography = {
  display: {
    fontFamily: systemFont,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 40,
    color: palette.ink,
  },
  title: {
    fontFamily: systemFont,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 32,
    color: palette.ink,
  },
  heading: {
    fontFamily: systemFont,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 24,
    color: palette.ink,
  },
  body: {
    fontFamily: systemFont,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    color: palette.inkSoft,
  },
  bodyStrong: {
    fontFamily: systemFont,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    color: palette.ink,
  },
  label: {
    fontFamily: systemFont,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    color: palette.ink,
  },
  caption: {
    fontFamily: systemFont,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: palette.inkMuted,
  },
  micro: {
    fontFamily: systemFont,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    lineHeight: 14,
    color: palette.inkMuted,
  },
} as const;

export const shadows = {
  card: {
    elevation: 2,
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  raised: {
    elevation: 6,
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
} as const;

export type PaletteColor = keyof typeof palette;
export type SpacingKey = keyof typeof spacing;
