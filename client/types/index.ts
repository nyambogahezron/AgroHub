import { SvgIconTypeMap, SxProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React, { SetStateAction } from 'react';

export type event = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type HomeNavDataProps = {
  id: number;
  name: string;
};

export type FeaturesItemProps = {
  icon: any;
  title: string;
  description: string;
  imageLight: string;
  imageDark: string;
};

export type CustomInputFieldProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  textInputStyles?: string;
  containerStyles?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  fullWidth?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  showInputAdornment?: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  inputRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
};

export type CustomPasswordInputProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  requireViewPassword?: boolean;
};

export type CustomButtonProps = {
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
  containerStyles?: string;
  textStyles?: string;
  variant?: 'contained' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
};

export type GlobalContextProps = {
  User: any;
  setUser: React.Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  session: any;
  setSession: React.Dispatch<SetStateAction<any>>;
  deleteSession: () => void;
  organization: any;
  getOrganization: () => void;
  deleteOrganization: () => void;
  setUserOrganization: (data: any) => void;
  currentOrganization: any;
  setCurrentOrganizationData: (data: any) => void;
  getCurrentOrganization: () => void;
  fetchBudgets: () => void;
  budgetData: BudgetProps[];
  setBudgetData: React.Dispatch<SetStateAction<any>>;
  users: User[];
  fetchUsers: () => void;
  setUsers: React.Dispatch<SetStateAction<User[]>>;
  setTransactions: React.Dispatch<SetStateAction<Transaction[]>>;
  transactions: Transaction[];
  setProducts: React.Dispatch<SetStateAction<any>>;
  products: any[];
};

export interface OrganizationDialogProps {
  open: boolean;
  openCreateOrgModal: () => void;
  onClose: (value: string) => void;
}

export interface NavItemConfig {
  key: string;
  title?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  icon?: string;
  href?: string;
  items?: NavItemConfig[];
  matcher?: { type: 'startsWith' | 'equals'; href: string };
}

export interface BudgetItem {
  _id: string;
  name: string;
  amount: number;
}

export interface BudgetProps {
  _id: string;
  user: string;
  organization: string;
  title: string;
  date: string;
  items: BudgetItem[];
  createdAt: string;
  updatedAt: string;
  amount: number;
  __v?: number;
}

export interface BudgetTableProps {
  count?: number;
  page?: number;
  rows?: BudgetProps[];
  rowsPerPage?: number;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  date: string;
  organization: string;
  role: 'admin' | 'member';
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Transaction {
  user?: string;
  organization: string;
  budget: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  transaction_date: string;
  receipt: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
