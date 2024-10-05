'use client';

import React from 'react';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

type CustomPasswordInputProps = {
  requireViewPassword?: boolean;
  placeholder?: string;
};

export default function CustomPasswordInput({
  requireViewPassword = false,
  placeholder = 'Enter your password',
}: CustomPasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <Box className='input_box'>
      <TextField
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        required
        fullWidth
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Lock />
            </InputAdornment>
          ),

          ...(requireViewPassword && {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
      />
    </Box>
  );
}
