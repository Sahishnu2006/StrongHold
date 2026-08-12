import { DocTypeId } from '../types';

export const CATEGORY_ORDER: DocTypeId[] = [
  'aadhaar',
  'pan',
  'dl',
  'passport',
  'voter',
  'x',
  'xii',
  'bank',
  'insurance',
  'ration',
  'other',
];

export const DOCUMENT_TYPES: Record<
  DocTypeId,
  { label: string; mono: string; tint: string; soft: string }
> = {
  aadhaar: { label: 'Aadhaar Card', mono: 'Aa', tint: '#B45309', soft: '#FDF0DC' },
  pan: { label: 'PAN Card', mono: 'PAN', tint: '#6D28D9', soft: '#F1EBFD' },
  dl: { label: 'Driving License', mono: 'DL', tint: '#0369A1', soft: '#E1F4FC' },
  x: { label: 'Class X Marks Card', mono: 'X', tint: '#0F766E', soft: '#E0F4F2' },
  xii: { label: 'Class XII Marks Card', mono: 'XII', tint: '#15803D', soft: '#E4F6E9' },
  passport: { label: 'Passport', mono: 'PS', tint: '#4338CA', soft: '#EAEEFF' },
  voter: { label: 'Voter ID', mono: 'VR', tint: '#BE123C', soft: '#FCEAF0' },
  bank: { label: 'Bank Statement', mono: 'BK', tint: '#047857', soft: '#E2F6EF' },
  insurance: { label: 'Insurance Policy', mono: 'IN', tint: '#1D4ED8', soft: '#E8F0FE' },
  ration: { label: 'Ration Card', mono: 'RT', tint: '#B45309', soft: '#FDF0DC' },
  other: { label: 'Other Document', mono: 'OT', tint: '#475569', soft: '#EDF0F4' },
};

export const CATEGORY_LABELS: Record<string, string> = {
  government: 'Government ID',
  education: 'Education',
  financial: 'Financial',
  personal: 'Personal',
};
