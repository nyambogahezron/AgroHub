'use client';

import { useEffect, useState } from 'react';
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
import { useGlobalContext } from '@/context/GlobalProvider';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setSession, setUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      return redirect('/');
    }
  }, [loggedIn]);

  async function loginUser(data) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const user = response.data.user;
      await localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setSession(user);
      toast.success('Login successful');

      setIsLoading(false);
      setLoggedIn(true);
    } catch (error) {
      toast.error(error.response.data.msg);
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmission = async () => {
    if (!email || !password) return toast.error('Please fill in all fields');
    await loginUser({ email, password });
  };
  return (
    <ContainerCard>
      <Box>
        <FormContainerCard containerStyles='flex flex-col'>
          <AuthHeader title='Login' />
          <Box className='max-w-[500px] w-full mt-10' component='form'>
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

            <CustomButton
              title='Login Now'
              onClick={handleSubmission}
              isLoading={isLoading}
            />

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
