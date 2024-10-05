import { Box, Button } from '@mui/material';
import { Email, Person } from '@mui/icons-material';
import ContainerCard from '@/components/ContainerCard';
import CustomPasswordInput from '@/components/FormInputs/CustomPasswordInput';
import FormContainerCard from '@/components/FormInputs/FormContainerCard';
import { AuthFooter, AuthHeader } from '@/components/Auth';
import { CustomInputField } from '@/components/FormInputs';
import CustomButton from '@/components/CustomButton';

export default function Register() {
  return (
    <ContainerCard>
      <Box>
        <FormContainerCard>
          <Box className='max-w-[500px] w-full' component='form'>
            <AuthHeader title='Register' />

            <CustomInputField
              type='email'
              placeholder='Enter your email'
              icon={Email}
            />

            <CustomInputField
              type='text'
              placeholder='Enter your username'
              icon={Person}
            />
            <CustomPasswordInput requireViewPassword={true} />
            <CustomPasswordInput
              requireViewPassword={false}
              placeholder='Confirm your password'
            />

            <CustomButton title='Register' />

            <AuthFooter
              title='Login'
              ContainerText='Already have an account? '
              link='/login'
            />
          </Box>
        </FormContainerCard>
      </Box>
    </ContainerCard>
  );
}
