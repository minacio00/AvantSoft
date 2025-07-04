'use client';
import { ReactNode } from 'react';
import { AuthProvider } from '../hooks/useAuth';
import Protected from '@/components/Protected';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Protected>
        {children}
      </Protected>
    </AuthProvider>
  );
}

