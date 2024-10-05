import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function AuthButtons() {
  return (
    <>
      <Button color='primary' variant='text' size='small'>
        <Link className='text-black' href='/login'>
          Sign In
        </Link>
      </Button>
      <Button color='primary' variant='contained' size='small'>
        <Link className='text-white font-bold text-sm ' href='/register'>
          Sign Up
        </Link>
      </Button>
    </>
  );
}
