export type DocCategory = 'government' | 'education' | 'financial' | 'personal';

export type DocTypeId =
  | 'aadhaar'
  | 'pan'
  | 'dl'
  | 'x'
  | 'xii'
  | 'passport'
  | 'voter'
  | 'bank'
  | 'insurance'
  | 'ration'
  | 'other';

export interface DocumentField {
  label: string;
  value: string;
  masked?: boolean;
}

export interface DocumentItem {
  id: string;
  type: DocTypeId;
  title: string;
  reference: string;
  category: DocCategory;
  addedAt: string;
  size: string;
  fields: DocumentField[];
}

export type SafetyVerdict = 'safe' | 'caution' | 'malicious';

export interface FormListing {
  id: string;
  name: string;
  issuer: string;
  category: string;
  verdict: SafetyVerdict;
  verified: boolean;
  languages: string;
  fields: number;
  minutes: number;
  note?: string;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}
