'use client';

import { GlobalContextProps } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext<GlobalContextProps>({
  User: null,
  setUser: () => {},
  isLoading: false,
  session: null,
  setSession: () => {},
  deleteSession: () => {},
});

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [User, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState();

  async function deleteSession() {
    await localStorage.removeItem('user');
    setSession(null);
  }

  async function getSession() {
    const user = await localStorage.getItem('user');

    console.log('user', user);

    if (user) {
      setSession(JSON.parse(user));
    } else {
      setSession(null);
    }
  }

  useEffect(() => {
    getSession();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        User,
        setUser,
        isLoading,
        session,
        setSession,
        deleteSession,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
