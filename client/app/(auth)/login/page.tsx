'use client';

import { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/GlobalProvider';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setSession, setUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      return redirect('/');
    }
  }, [loggedIn]);

  async function loginUser(data) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        '/api/v1/auth/login',
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
      setIsLoading(false);
      if (error?.response?.status == 500) {
        toast.error('Something went wrong, try again later');
      } else {
        toast.error(error?.response?.data?.msg);
      }
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
        <Box className=' absolute top-0 left-0 flex  h-10 w-10 hover:cursor-pointer items-center justify-center mx-auto ml-4 mt-4 '>
          <Button onClick={() => router.back()} className='p-3'>
            <KeyboardBackspaceIcon
              sx={{
                fontSize: 35,
              }}
            />
          </Button>
        </Box>
        <FormContainerCard containerStyles='flex flex-col'>
          <Link href='/'>
            <Box className='flex border border-gray-200 rounded-full h-24 w-24 hover:cursor-pointer items-center justify-center mx-auto bg-slate-100 -mt-20 mb-4'>
              <Image
                height='500'
                width='500'
                src='/images/logo.png'
                alt='logo'
                className='w-20 h-20 mx-auto rounded-full'
              />
            </Box>
          </Link>
          <AuthHeader
            title=' Welcome Back, Login'
            customTitleStyles='text-2xl font-semibold text-center mt-2'
          />

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
