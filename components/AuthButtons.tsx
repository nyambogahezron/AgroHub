import { Button } from '@mui/material';
import React from 'react';

export default function AuthButtons() {
  return (
    <>
      <Button
        color='primary'
        variant='text'
        size='small'
        component='a'
        href='/sign-in'
        target='_blank'
      >
        Sign in
      </Button>
      <Button
        color='primary'
        variant='contained'
        size='small'
        component='a'
        href='/sign-up'
        target='_blank'
      >
        Sign up
      </Button>
    </>
  );
}
