import {  SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React, { SetStateAction } from 'react';

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
};


export interface OrganizationDialogProps {
  open: boolean;
  openCreateOrgModal: () => void;
  onClose: (value: string) => void;
}