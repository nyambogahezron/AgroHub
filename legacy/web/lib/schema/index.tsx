import * as Yup from 'yup';

export const OrganizationSchema = Yup.object({
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
