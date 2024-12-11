'use client';

import GlobalProvider from '@/context/GlobalProvider';
import ThemeProvider from '@/context/ThemeProvider';

export function Providers({ children }) {
  return (
    <GlobalProvider>
      
      <ThemeProvider>{children}</ThemeProvider>
    </GlobalProvider>
  );
}
