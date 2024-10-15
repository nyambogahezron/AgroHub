'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '@/utils/actions/auth';
import ContainerCard from '@/components/ContainerCard';
import { CustomInputField, CustomPasswordInput } from '@/components/FormInputs';
import { Box, Button, Container } from '@mui/material';
import { AuthFooter, AuthHeader } from '@/components/Auth';
import CustomButton from '@/components/CustomButton';
import { Email, Person } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [state, action] = useFormState(signUp, undefined);
  const router = useRouter();

  if (state?.errors?.confirmPassword) {
    state.errors.password = state.errors.confirmPassword;
    delete state.errors.confirmPassword;
  }

  return (
    <ContainerCard>
      <Box className=' absolute top-0 left-0 flex  h-10 w-10 hover:cursor-pointer items-center justify-center mx-auto ml-4 mt-4 '>
        <Button onClick={() => router.back()} className='p-3'>
          <KeyboardBackspaceIcon
            sx={{
              fontSize: 35,
            }}
          />
        </Button>
      </Box>

      <Container
        className='flex flex-col max-w-[500px] items-center justify-center w-full p-6 rounded-lg shadow-lg'
        sx={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        }}
      >
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

        <Box className='mb-10'>
          <AuthHeader customTitleStyles='text-2xl' title='Register' />
        </Box>
        {state?.message && (
          <div className='flex flex-col items-start w-full rounded-lg border border-gray-200 border-l-8 border-l-green-600'>
            <p className='text-black text-lg font-medium p-3'>
              {state?.message}
            </p>
          </div>
        )}
        {state?.error && (
          <div className='flex flex-col items-start w-full rounded-lg border border-gray-200 border-l-8 border-l-red-600'>
            <p className='text-red-500 text-lg font-medium p-3'>
              {state?.error}
            </p>
          </div>
        )}
        <Box className='w-full'>
          <form action={action}>
            <CustomInputField
              id='name'
              name='name'
              label='Name'
              placeholder='Name'
              variant='outlined'
              fullWidth
              margin='normal'
              type='text'
              icon={Person}
            />
            {state?.errors?.name && (
              <p className='text-red-500 font-medium'>{state.errors.name}</p>
            )}

            <CustomInputField
              id='email'
              name='email'
              label='Email'
              placeholder='Email'
              variant='outlined'
              fullWidth
              margin='normal'
              type='email'
              icon={Email}
            />
            {state?.errors?.email && (
              <p className='text-red-500 font-medium'>{state.errors.email}</p>
            )}

            <CustomPasswordInput
              id='password'
              name='password'
              label='Password'
              requireViewPassword={true}
            />

            {state?.errors?.password && (
              <div>
                {!state?.errors?.confirmPassword && (
                  <p className='text-red-500 font-medium'>Password must:</p>
                )}
                <ul>
                  {state.errors.password.map((error) => (
                    <li className='text-red-500 font-medium' key={error}>
                      - {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <CustomPasswordInput
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm Password'
            />
            {state?.errors?.confirmPassword && (
              <p className='text-red-500 font-medium'>{state.errors.email}</p>
            )}
            <SubmitButton />
          </form>
        </Box>

        <AuthFooter
          title='Sign In'
          ContainerText='Already have an account? '
          link='/login'
        />
      </Container>
    </ContainerCard>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <CustomButton title='Sign Up' type='submit' isLoading={pending} />;
}
