import { Box } from '@mui/material';
import { Email } from '@mui/icons-material';
import ContainerCard from '@/components/ContainerCard';
import Link from 'next/link';
import { CustomInputField, FormContainerCard } from '@/components/FormInputs';
import { AuthHeader } from '@/components/Auth';
import CustomButton from '@/components/CustomButton';

export default function ForgotPassword() {
  return (
    <ContainerCard>
      <Box>
        <FormContainerCard>
          <Box className='max-w-[500px] w-full' component='form'>
            <AuthHeader
              title='Enter your email to receive a code'
              customTitleStyles='text-lg  mb-10'
            />

            <CustomInputField
              type='email'
              placeholder='Enter your email'
              icon={Email}
            />

            <Link href='/reset-password' passHref>
              <CustomButton title='Send Code' />
            </Link>
          </Box>
        </FormContainerCard>
      </Box>
    </ContainerCard>
  );
}
