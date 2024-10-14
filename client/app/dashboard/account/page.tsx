import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import { config } from '@/config';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';
import ThemedBox from '@/components/theme/ThemedBox';
import  OrganizationInfo  from '@/components/dashboard/account/organization-info';

export const metadata = {
  title: `Account | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack>
      <ThemedBox containerStyles='flex flex-col items-center justify-center mt-4'>
        <ThemedBox containerStyles='gap-8'>
          <AccountInfo />
          <OrganizationInfo />
        </ThemedBox>
        <ThemedBox>
          <AccountDetailsForm />
        </ThemedBox>
        <ThemedBox>
          <AccountDetailsForm />
        </ThemedBox>
      </ThemedBox>
    </Stack>
  );
}
