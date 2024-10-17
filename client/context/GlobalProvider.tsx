'use client';

import { GlobalContextProps } from '@/types';
import { GlobalContextInitialValues } from '@/types/initialValues';
import { createContext, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext<GlobalContextProps>({
  ...GlobalContextInitialValues,
});

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [User, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState();
  const [organization, setOrganization] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState();

  async function deleteSession() {
    await localStorage.removeItem('user');
    setSession(null);
  }

  async function getSession() {
    const user = await localStorage.getItem('user');
    // console.log('user', user);
    if (user) {
      setSession(JSON.parse(user));
    } else {
      setSession(null);
    }
  }

  //  *********  Organization functionality *********

  // store user organization
  async function setUserOrganization(data: any) {
    if (!data) return;

    const currentOrganization = await localStorage.getItem('organization');
    let organizationData = currentOrganization
      ? JSON.parse(currentOrganization)
      : [];

    if (!Array.isArray(organizationData)) {
      organizationData = [];
    }

    organizationData.push(data);

    await localStorage.setItem(
      'organization',
      JSON.stringify(organizationData)
    );

    return organizationData;
  }

  // get user organization from local storage
  async function getOrganization() {
    const organization = await localStorage.getItem('organization');
    const data = JSON.parse(organization) || [];
    if (organization) {
      setOrganization(data);
      // console.log('organization', data);
    } else {
      setOrganization(null);
    }
  }

  // get current organization
  async function getCurrentOrganization() {
    const currentOrganization = await localStorage.getItem(
      'currentOrganization'
    );
    console.log('currentOrganization', currentOrganization);
    const data = JSON.parse(currentOrganization);
    if (currentOrganization) {
      setCurrentOrganization(data);
    } else {
      setCurrentOrganization(null);
    }
  }

  // set current organization
  async function setCurrentOrganizationData(data: any) {
    await localStorage.setItem('currentOrganization', JSON.stringify(data));
    setCurrentOrganization(data);
  }

  // delete organization
  async function deleteOrganization() {
    await localStorage.removeItem('organization');
    setOrganization(null);
  }

  useEffect(() => {
    getSession();
    getOrganization();
    getCurrentOrganization();
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
        organization,
        getOrganization,
        deleteOrganization,
        setUserOrganization,
        currentOrganization,
        setCurrentOrganizationData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
