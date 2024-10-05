import React from 'react';
import { Container } from '@mui/material';

export default function FormContainerCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      className='max-w-[500px] flex items-center justify-center w-full p-6 rounded-lg shadow-lg'
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      }}
    >
      {children}
    </Container>
  );
}
