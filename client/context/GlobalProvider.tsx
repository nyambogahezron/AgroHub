'use client';

import {
  getAllBudgets,
  getAllProducts,
  getAllTransactions,
  getAllUsers,
  getUserOrg,
} from '@/query/api';
import { BudgetProps, GlobalContextProps, Transaction, User } from '@/types';
import { GlobalContextInitialValues } from '@/types/initialValues';
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext<GlobalContextProps>(
  GlobalContextInitialValues
);

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
  const [budgetData, setBudgetData] = useState<BudgetProps[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState([]);

  async function deleteSession() {
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
    localStorage.removeItem('currentOrganization');
    setSession(null);
    setOrganization(null);
    setCurrentOrganization(null);
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

    localStorage.setItem('organization', JSON.stringify(organizationData));
  }

  // get user organization from local storage
  async function getOrganization() {
    const organization = localStorage.getItem('organization');
    const data = JSON.parse(organization);
    if (organization) {
      setOrganization(data);
    } else {
      setOrganization(null);
    }
  }

  // get current organization
  async function getCurrentOrganization() {
    const currentOrganization = await localStorage.getItem(
      'currentOrganization'
    );
    const organization = await localStorage.getItem('organization');
    const data = JSON.parse(currentOrganization);
    if (currentOrganization) {
      setCurrentOrganization(data);
    } else {
      if (organization) {
        setCurrentOrganization(JSON.parse(organization)[0]);
      } else {
        setCurrentOrganization(null);
      }
    }
  }

  // set current organization
  async function setCurrentOrganizationData(data: any) {
    localStorage.setItem('currentOrganization', JSON.stringify(data));
    setCurrentOrganization(data);
  }

  // delete organization
  async function deleteOrganization() {
    await localStorage.removeItem('organization');
    setOrganization(null);
  }

  // *********  Budget functionality *********
  const fetchBudgets = async () => {
    const data = await getAllBudgets();

    if (data && data.budgets) {
      setBudgetData(data.budgets);
      console.log('budget from g', data);
    } else {
      setBudgetData([]);
      console.log('budget from null');
    }
  };

  // *********  Users functionality *********

  // fetch users
  async function fetchUsers() {
    const data = await getAllUsers();

    if (data && data.users) {
      setUsers(data.users);
    } else {
      setUsers([]);
    }
  }

  // fetch user transactions
  async function fetchTransactions() {
    const data = await getAllTransactions();

    if (data && data.transactions) {
      setTransactions(data.transactions);
    } else {
      setTransactions([]);
    }
  }

  // fetch user products
  async function fetchUserProducts() {
    const data = await getAllProducts();

    if (data && data.products) {
      setProducts(data.products);
    } else {
      setProducts([]);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserOrg();

      if (result){
      localStorage.setItem('organization', JSON.stringify(result.organization));
      setOrganization(result.organization);
      const org = getCurrentOrganization();
      if (!org) {
        setCurrentOrganizationData(result.organization[0]);
      }
    }
    };

    fetchData();
  }, [User]);

  useEffect(() => {
    getSession();
    getOrganization();
    getCurrentOrganization();
    fetchBudgets();
    fetchUsers();
    fetchTransactions();
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
        getCurrentOrganization,
        deleteOrganization,
        setUserOrganization,
        currentOrganization,
        setCurrentOrganizationData,
        fetchBudgets,
        budgetData,
        setBudgetData,
        users,
        fetchUsers,
        setUsers,
        setTransactions,
        transactions,
        setProducts,
        products,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
