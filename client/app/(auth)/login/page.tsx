'use client';

import React from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Email } from '@mui/icons-material';
import ContainerCard from '@/components/ContainerCard';
import Link from 'next/link';
import {
  CustomInputField,
  CustomPasswordInput,
  FormContainerCard,
} from '@/components/FormInputs';
import { AuthFooter, AuthHeader } from '@/components/Auth';
import CustomButton from '@/components/CustomButton';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmission = () => {
    if (!email || !password) return toast.error('Please fill in all fields');

    console.log('Email:', email);
    console.log('Password, password');
  };
  return (
    <ContainerCard>
      <Box>
        <FormContainerCard>
          <Box className='max-w-[500px] w-full' component='form'>
            <AuthHeader title='Login' />

            <CustomInputField
              containerStyles='container-class'
              textInputStyles='text-input-class'
              placeholder='Email'
              type='email'
              icon={Email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomPasswordInput
              requireViewPassword={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box className='option_field'>
              <FormControlLabel
                control={<Checkbox id='check' />}
                label='Remember me'
              />
              <Link
                href='/forgot-password'
                className='text-blue-500 font-semibold underline'
              >
                Forgot password?
              </Link>
            </Box>

            <CustomButton title='Login Now' onClick={handleSubmission} />

            <AuthFooter
              title='Sign Up'
              ContainerText='Don’t have an account? '
              link='/register'
            />
          </Box>
        </FormContainerCard>
      </Box>
    </ContainerCard>
  );
}
