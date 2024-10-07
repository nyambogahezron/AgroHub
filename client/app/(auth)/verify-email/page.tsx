'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import ContainerCard from '@/components/ContainerCard';
import FormContainerCard from '@/components/FormInputs/FormContainerCard';
import { AuthHeader } from '@/components/Auth';
import { CustomInputField } from '@/components/FormInputs';
import CustomButton from '@/components/CustomButton';
import { Email } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('h@gmail.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeVerification = async (e) => {
    e.preventDefault();
    console.log('Code:', code);
    console.log('Email:', email);

    const data = {
      email: email,
      code: code,
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        '/api/v1/auth/verify-email',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setIsLoading(false);
        toast.success(res.data.msg);

        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerCard>
      <Box>
        <FormContainerCard containerStyles='-mt-24'>
          <Box
            className='max-w-[500px] w-full'
            component='form'
            onSubmit={handleCodeVerification}
          >
            <AuthHeader
              title='Enter code to verify your email'
              customTitleStyles='text-lg  mb-10 capitalize'
            />
            <CustomInputField
              variant='outlined'
              fullWidth
              margin='normal'
              type='email'
              icon={Email}
              value={email}
              disabled
            />
            <CustomInputField
              type='number'
              placeholder='Enter your code'
              onChange={(e) => setCode(e.target.value)}
            />
            <CustomButton title='Verify' type='submit' isLoading={isLoading} />
          </Box>
        </FormContainerCard>
      </Box>
    </ContainerCard>
  );
}
