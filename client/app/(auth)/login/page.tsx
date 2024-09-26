import React from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from '@mui/material';
import ContainerCard from '../../../components/ContainerCard';
import AuthHeader from '../../../components/AuthHeader';
export const metadata = {
  title: 'Login',
};
export default function Login() {
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
            <AuthHeader title='Login' />

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
                type='password'
                placeholder='Enter your password'
                required
                fullWidth
                margin='normal'
              />
            </Box>

            <Box className='option_field'>
              <FormControlLabel
                control={<Checkbox id='check' />}
                label='Remember me'
              />
              <Link href='#' className='forgot_pw'>
                Forgot password?
              </Link>
            </Box>

            <Button
              className='bg-purple-700 mt-7 w-full py-2.5 rounded-lg'
              variant='contained'
            >
              Login Now
            </Button>

            <Box className='text-xs text-center mt-3.5'>
              <Typography>
                {`Don't have an account? `}
                <Link href='/register' id='signup'>
                  Signup
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ContainerCard>
  );
}
