import { FormListing } from '../types';

export const MOCK_FORMS: FormListing[] = [
  {
    id: 'f1',
    name: 'GST Registration (New Business)',
    issuer: 'Government of India · GST Council',
    category: 'Tax',
    verdict: 'safe',
    verified: true,
    languages: 'English / हिन्दी',
    fields: 18,
    minutes: 12,
  },
  {
    id: 'f2',
    name: 'Driving Licence Application',
    issuer: 'Ministry of Road Transport & Highways',
    category: 'Transport',
    verdict: 'safe',
    verified: true,
    languages: 'English / हिन्दी',
    fields: 14,
    minutes: 10,
  },
  {
    id: 'f3',
    name: 'Voter ID Correction Form (Form 8)',
    issuer: 'Election Commission of India',
    category: 'Election',
    verdict: 'safe',
    verified: true,
    languages: 'English / हिन्दी / தமிழ்',
    fields: 9,
    minutes: 6,
  },
  {
    id: 'f4',
    name: 'Caste Certificate Application',
    issuer: 'State Revenue Department',
    category: 'Certificates',
    verdict: 'caution',
    verified: false,
    languages: 'English / हिन्दी',
    fields: 11,
    minutes: 8,
    note: 'Double-check the uploaded proof before submitting.',
  },
  {
    id: 'f5',
    name: 'Instant Loan — Quick Approval',
    issuer: 'Unknown third-party site',
    category: 'Unverified',
    verdict: 'malicious',
    verified: false,
    languages: 'English',
    fields: 22,
    minutes: 2,
    note: 'Blocked. Requests PAN number and bank OTP — never share these.',
  },
];

export const LANGUAGES = ['EN', 'हिन्दी', 'தமிழ்', 'తెలుగు', 'বাংলা'];

export const CHAT_PREVIEW: { role: 'assistant' | 'user'; text: string }[] = [
  {
    role: 'assistant',
    text: 'Namaste! I am your form assistant. Tell me which government form you would like to fill, or share a scanned copy of it.',
  },
  {
    role: 'user',
    text: 'I need to apply for a new driving licence.',
  },
  {
    role: 'assistant',
    text: 'Got it. I found the official SARATHI application. It is safe. I will open it for you and guide you field by field. Your licence details will be pre-filled from the vault.',
  },
];
