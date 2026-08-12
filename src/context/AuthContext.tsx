import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ReactNode } from 'react';

export type AppStage = 'onboarding' | 'locked' | 'unlocked';

interface AuthContextValue {
  stage: AppStage;
  passcode: string;
  completeOnboarding: () => void;
  savePasscode: (code: string) => void;
  unlock: () => void;
  lock: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<AppStage>('onboarding');
  const [passcode, setPasscode] = useState<string>('');

  const completeOnboarding = useCallback(() => setStage('locked'), []);
  const savePasscode = useCallback((code: string) => setPasscode(code), []);
  const unlock = useCallback(() => setStage('unlocked'), []);
  const lock = useCallback(() => setStage('locked'), []);

  const value = useMemo<AuthContextValue>(
    () => ({ stage, passcode, completeOnboarding, savePasscode, unlock, lock }),
    [stage, passcode, completeOnboarding, savePasscode, unlock, lock],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
