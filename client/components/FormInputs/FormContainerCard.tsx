import React from 'react';
import { Container } from '@mui/material';
type Props = {
  children: React.ReactNode;
  containerStyles?: string;
};

export default function FormContainerCard({
  children,
  containerStyles,
}: Props) {
  return (
    <Container
      className={`max-w-[500px] flex items-center justify-center w-full p-6 rounded-lg shadow-lg  ${containerStyles}`}
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      }}
    >
      {children}
    </Container>
  );
}
