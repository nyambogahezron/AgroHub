'use client';

import React from 'react';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { CustomPasswordInputProps } from '@/types';

export default function CustomPasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  requireViewPassword = false,
  placeholder = 'Enter your password',
}: CustomPasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <Box className='input_box'>
      <TextField
        id={id}
        name={name}
        label={label}
        onChange={onChange}
        variant='outlined'
        value={value}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        fullWidth
        margin='normal'
        InputProps={{
          ...(requireViewPassword && {
            startAdornment: (
              <InputAdornment position='start'>
                <Lock />
              </InputAdornment>
            ),

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
