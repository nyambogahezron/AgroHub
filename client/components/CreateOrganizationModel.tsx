'use client';
import Modal from '@mui/material/Modal';
import { Box, Container, Grid, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { AuthHeader } from '@/components/Auth';
import CustomButton from '@/components/CustomButton';
import { OrganizationSchema } from '@/lib/schema';

type CreateOrganizationModelProps = {
  open: boolean;
  handleClose: () => void;
};

export default function CreateOrganizationModel({
  open,
  handleClose,
}: CreateOrganizationModelProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{ bgcolor: 'background.paper' }}
        className='min-w-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black shadow-lg p-4'
      >
        <Box>
          <Container
            className='flex flex-col max-w-[500px] items-center justify-center w-full p-6 rounded-lg shadow-lg'
            sx={{
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            }}
          >
            <Box className='mb-10'>
              <AuthHeader
                title='Create Organization'
                customTitleStyles='text-green-600 text-2xl'
              />
            </Box>

            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                address: '',
                logo: '',
              }}
              validationSchema={OrganizationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await axios.post(
                    '/api/organizations',
                    values
                  );
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
        </Box>
      </Box>
    </Modal>
  );
}
