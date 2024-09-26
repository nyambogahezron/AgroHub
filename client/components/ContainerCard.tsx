'use client';
import { Container } from '@mui/material';
import React from 'react';

export default function ContainerCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      sx={(theme) => ({
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : `#090E10`,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
      })}
    >
      {children}
    </Container>
  );
}
