'use client';

import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ContainerCard from '@/components/ContainerCard';
import { AuthHeader } from '@/components/Auth';
import CustomButton from '@/components/CustomButton';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name too short')
    .max(50, 'Name too long')
    .required('Please provide Name'),
  email: Yup.string()
    .email('Please provide a valid email')
    .required('Please provide email'),
  phone: Yup.string()
    .min(10, 'Phone number too short')
    .max(15, 'Phone number too long')
    .required('Please provide phone number'),
  address: Yup.string().required('Please provide address'),
  logo: Yup.string(),
});

const CreateOrganization = () => {
  return (
    <ContainerCard>
      <Container
        className='flex flex-col max-w-[500px] items-center justify-center w-full p-6 rounded-lg shadow-lg'
        sx={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        }}
      >
        <Box className='mb-10'>
          <AuthHeader title='Create Organization' />
        </Box>

        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            address: '',
            logo: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('/api/organizations', values);
              console.log('Organization Created:', response.data);
              setSubmitting(false);
            } catch (error) {
              console.error('Error creating organization:', error);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label='Name'
                    name='name'
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label='Email'
                    name='email'
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label='Phone Number'
                    name='phone'
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label='Address'
                    name='address'
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label='Logo URL'
                    name='logo'
                    helperText='Optional'
                  />
                </Grid>

                <Grid item xs={12} className='-mt-4'>
                  <CustomButton
                    title={
                      isSubmitting ? 'Submitting...' : 'Create Organization'
                    }
                    type='submit'
                    isLoading={isSubmitting}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </ContainerCard>
  );
};

export default CreateOrganization;
