'use client';

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ContainerCard from '@/components/ContainerCard';
import FormContainerCard from '@/components/FormInputs/FormContainerCard';
import { AuthHeader } from '@/components/Auth';
import { CustomInputField } from '@/components/FormInputs';
import CustomButton from '@/components/CustomButton';
import { Email } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

export default function VerifyEmail({ params }: { params: { email: string } }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (isEmailVerified) {
      redirect('/login');
    }
  }, [isEmailVerified]);

  // Decode the email parameter
  const decodedEmail = decodeURIComponent(params.email);

  async function verifyEmail() {
    setIsLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/verify-email',
        JSON.stringify({ email: decodedEmail, verificationToken: code }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        toast.success(res.data.msg);
        setIsEmailVerified(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCodeVerification = async (e) => {
    e.preventDefault();

    if (!code) return toast.error('Invalid code');

    verifyEmail();
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
              value={decodedEmail}
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
