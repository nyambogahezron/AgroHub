'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { updatePassword } from '@/query/api';

export function UpdatePasswordForm(): React.JSX.Element {
  const [oldPassword, setOldPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handlePasswordUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // call the api
    const res = await updatePassword({
      oldPassword,
      newPassword: password,
    });

    if (res) {
      toast.success('Password updated successfully');
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <form onSubmit={handlePasswordUpdate} className='w-full '>
      <Card className='max-w-[800px] items-center justify-center mx-auto mt-12'>
        <CardHeader subheader='Update password' title='Password' />
        <Divider />
        <CardContent>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Old Password</InputLabel>
              <OutlinedInput
                label='Old Password'
                name='oldPassword'
                type='password'
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                label='Password'
                name='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Confirm password</InputLabel>
              <OutlinedInput
                label='Confirm password'
                name='confirmPassword'
                type='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type='submit' variant='contained'>
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
