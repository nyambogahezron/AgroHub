import { redirect } from 'next/navigation';
import { SignUpFormSchema, FormState } from '../lib/definitions';
import axios from 'axios';

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

  const data = {
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  // Register user
  const res = await register(data);

  if (!res?.error) {
    const email = validatedFields.data.email;
    redirect(`/verify-email/${email}`);
  } else {
    return {
      error: res?.error,
    };
  }
}

async function register(data) {
  try {
    await axios.post(
      'http://localhost:5000/api/v1/auth/register',
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (error.response?.status === 400) {
      return {
        error: error.response.data.msg,
      };
    } else if (error.message !== 'NEXT_REDIRECT') {
      console.error('Error during sign up:', error);
      return {
        error: error?.response?.data?.msg,
      };
    }
  }
}
