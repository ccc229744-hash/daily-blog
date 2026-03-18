'use client';

import { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { showAuthModal } = useAuth();
  
  return (
    <>
      {children}
      {showAuthModal && <AuthModal />}
    </>
  );
}
