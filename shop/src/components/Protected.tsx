'use client';
import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Protected({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const publicPaths = ['/login'];

  useEffect(() => {
    if (!token && !publicPaths.includes(path)) {
      router.push('/login');
    }
  }, [token, path, router]);

  if (!token && !publicPaths.includes(path)) {
    return null;
  }

  return <>{children}</>;
}
