import React from 'react';
import { Box, InputAdornment, SvgIconTypeMap, TextField } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type CustomInputFieldProps = {
  textInputStyles?: string;
  containerStyles?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  fullWidth?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showInputAdornment?: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

export default function CustomInputField({
  containerStyles,
  textInputStyles,
  placeholder,
  type,
  required = true,
  fullWidth = true,
  margin = 'normal',
  onChange,
  showInputAdornment = true,
  icon: Icon,
}: CustomInputFieldProps) {
  return (
    <Box className={containerStyles}>
      <TextField
        onChange={onChange}
        className={textInputStyles}
        type={type}
        placeholder={placeholder}
        required={required}
        fullWidth={fullWidth}
        margin={margin}
        InputProps={
          showInputAdornment && Icon
            ? {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon />
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}
