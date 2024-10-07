import { PaletteMode, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type HomeNavDataProps = {
  id: number;
  name: string;
};

type FeaturesItemProps = {
  icon: any;
  title: string;
  description: string;
  imageLight: string;
  imageDark: string;
};

interface HomeNavbarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

type CustomInputFieldProps = {
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

type CustomPasswordInputProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  requireViewPassword?: boolean;
};

type CustomButtonProps = {
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
  containerStyles?: string;
  textStyles?: string;
  variant?: 'contained' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
};

export type {
  HomeNavDataProps,
  FeaturesItemProps,
  HomeNavbarProps,
  CustomPasswordInputProps,
  CustomInputFieldProps,
  CustomButtonProps,
};
