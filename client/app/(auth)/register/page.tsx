import React from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Link,
  Typography,
} from '@mui/material';
import ContainerCard from '../../../components/ContainerCard';
import AuthHeader from '../../../components/AuthHeader';

export const metadata = {
  title: 'Register',
};
export default function Register() {
  return (
    <ContainerCard>
      <Box>
        <Container
          className='max-w-[500px] flex items-center justify-center w-full p-6 rounded-lg shadow-lg'
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          }}
        >
          <Box className='max-w-[500px] w-full' component='form'>
            <AuthHeader title='Register' />
            <Box className='input_box'>
              <TextField
                type='email'
                placeholder='Enter your email'
                required
                fullWidth
                margin='normal'
              />
            </Box>
            <Box className='input_box'>
              <TextField
                type='text'
                placeholder='Enter your username'
                required
                fullWidth
                margin='normal'
              />
            </Box>
            <Box className='input_box'>
              <TextField
                type='password'
                placeholder='Enter your password'
                required
                fullWidth
                margin='normal'
              />
            </Box>
            <Box className='input_box'>
              <TextField
                type='password'
                placeholder='Confirm your password'
                required
                fullWidth
                margin='normal'
              />
            </Box>
            <Button
              className='bg-purple-700 mt-7 w-full py-2.5 rounded-lg'
              variant='contained'
            >
              Register
            </Button>
            <Box className='text-xs text-center mt-3.5'>
              <Typography>
                {`Don't have an account? `}
                <Link href='/login' id='signup'>
                  Signin
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ContainerCard>
  );
}
