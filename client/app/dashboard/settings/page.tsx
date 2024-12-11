import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import ThemedBox from '@/components/theme/ThemedBox';

export const metadata = { title: `Dashboard | Settings` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <Typography variant='h4'>Settings</Typography>
      </div>
      <ThemedBox containerStyles='flex flex-col items-center justify-center mt-4 w-full '>
        <UpdatePasswordForm />
      </ThemedBox>
    </Stack>
  );
}
