import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import ContainerCard from '@/components/ContainerCard';
import CustomPasswordInput from '@/components/FormInputs/CustomPasswordInput';
import FormContainerCard from '@/components/FormInputs/FormContainerCard';
import { AuthHeader } from '@/components/Auth';
import { CustomInputField } from '@/components/FormInputs';
import CustomButton from '@/components/CustomButton';

export default function ResetPassword() {
  return (
    <ContainerCard>
      <Box>
        <FormContainerCard>
          <Box className='max-w-[500px] w-full' component='form'>
            <AuthHeader
              title='Enter code sent on your email to reset password'
              customTitleStyles='text-lg  mb-10 capitalize'
            />
            <CustomInputField type='number' placeholder='Enter your code' />
            <CustomPasswordInput
              requireViewPassword={true}
              placeholder='Enter new password'
            />
            <CustomPasswordInput
              requireViewPassword={false}
              placeholder='Enter new password again'
            />

            <CustomButton title='Reset Password' />
          </Box>
        </FormContainerCard>
      </Box>
    </ContainerCard>
  );
}
