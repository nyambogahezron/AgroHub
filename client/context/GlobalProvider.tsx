import { createContext, useContext } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
