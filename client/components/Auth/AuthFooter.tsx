import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

type AuthFooterProps = {
  title: string;
  ContainerText: string;
  customTitleStyles?: string;
  link: string;
};

export default function AuthFooter({
  title,
  customTitleStyles,
  link,
  ContainerText,
}: AuthFooterProps) {
  return (
    <Box className={`text-xs text-center mt-3.5 ${customTitleStyles}`}>
      <Typography>
        {ContainerText}
        <Link className='text-blue-500 font-semibold underline' href={link}>
          {title}
        </Link>
      </Typography>
    </Box>
  );
}
