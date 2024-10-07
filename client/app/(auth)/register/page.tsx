'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '@/utils/actions/auth';
import ContainerCard from '@/components/ContainerCard';
import { CustomInputField, CustomPasswordInput } from '@/components/FormInputs';
import { Box, Container } from '@mui/material';
import { AuthFooter, AuthHeader } from '@/components/Auth';
import CustomButton from '@/components/CustomButton';
import { Email, Person } from '@mui/icons-material';

export default function Register() {
  const [state, action] = useFormState(signUp, undefined);

  if (state?.errors?.confirmPassword) {
    state.errors.password = state.errors.confirmPassword;
    delete state.errors.confirmPassword;
  }

  return (
    <ContainerCard>
      <Container
        className='flex flex-col max-w-[500px] items-center justify-center w-full p-6 rounded-lg shadow-lg'
        sx={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        }}
      >
        <Box className='mb-10'>
          <AuthHeader title='Register' />
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
