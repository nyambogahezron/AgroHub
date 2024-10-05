import React from 'react';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
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

export default function Login() {
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
            />
            <CustomPasswordInput requireViewPassword={true} />

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

            <CustomButton title='Login Now' />

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
