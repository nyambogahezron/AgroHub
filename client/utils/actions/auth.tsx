import { redirect } from 'next/navigation';
import { SignUpFormSchema, FormState } from '../lib/definitions';
import axios from 'axios';

export function signIn(state: FormState, formData: FormData) {}

export async function signUp(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (state?.errors) {
    // Clear any previous errors
    state.errors = undefined;
  }

  // console.log('Form data is valid!', validatedFields.data);
  // login user

  const data = {
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/auth/register',
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      const email = encodeURIComponent(data.email);
      redirect(`/verify-email?email=${email}`);
    }
  } catch (error) {
    return {
      error: error.response.data.msg,
    };
  }
}
