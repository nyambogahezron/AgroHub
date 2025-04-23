'use client';

import { useGlobalContext } from '@/context/GlobalProvider';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }) {
  const { session } = useGlobalContext();
  useEffect(() => {
    if (session) {
      return redirect('/');
    }
  }, [session]);

  return <>{children}</>;
}
