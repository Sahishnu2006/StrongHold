import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ReactNode } from 'react';
import { DocumentItem } from '../types';
import { MOCK_DOCUMENTS } from '../data/mockDocuments';

interface VaultContextValue {
  documents: DocumentItem[];
  addDocument: (doc: DocumentItem) => void;
  removeDocument: (id: string) => void;
}

const VaultContext = createContext<VaultContextValue | undefined>(undefined);

export function VaultProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_DOCUMENTS);

  const addDocument = useCallback((doc: DocumentItem) => {
    setDocuments((prev) => [doc, ...prev]);
  }, []);

  const removeDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const value = useMemo<VaultContextValue>(
    () => ({ documents, addDocument, removeDocument }),
    [documents, addDocument, removeDocument],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault(): VaultContextValue {
  const ctx = useContext(VaultContext);
  if (!ctx) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return ctx;
}
