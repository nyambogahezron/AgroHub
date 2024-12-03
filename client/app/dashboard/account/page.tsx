import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import AccountInfo from '@/components/dashboard/account/account-info';
import ThemedBox from '@/components/theme/ThemedBox';
import OrganizationInfo from '@/components/dashboard/account/organization-info';
import { Grid } from '@mui/material';

export const metadata = {
  title: `Dashboard | Accounts`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack>
      <ThemedBox containerStyles='flex flex-col items-center justify-center mt-4'>
        <ThemedBox containerStyles='gap-1'>
          <Grid container spacing={2} className='w-[1400px] items-center mb-6'>
            <AccountInfo />
            <OrganizationInfo />
          </Grid>
        </ThemedBox>
        <ThemedBox>
          <AccountDetailsForm />
        </ThemedBox>
      </ThemedBox>
    </Stack>
  );
}
