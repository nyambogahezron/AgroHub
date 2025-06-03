import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	forgotPasswordSchema,
	type ForgotPasswordFormData,
} from '@/lib/validations/auth';

export default function ForgotPasswordPage() {
	const [isSuccess, setIsSuccess] = useState(false);
	const { requestPasswordReset, isLoading, error } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		try {
			await requestPasswordReset(data.email);
			setIsSuccess(true);
		} catch (error) {
			// Error is handled by the auth store
		}
	};

	if (isSuccess) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
				<Card className='w-full max-w-md'>
					<CardHeader>
						<CardTitle className='text-center text-2xl font-bold'>
							Check your email
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Alert>
							<AlertDescription>
								If an account exists with that email, we've sent password reset
								instructions. Please check your email.
							</AlertDescription>
						</Alert>
						<div className='mt-4 text-center'>
							<Link to='/login' className='text-primary hover:text-primary/80'>
								Return to login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-center text-2xl font-bold'>
						Reset your password
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
						{error && (
							<Alert variant='destructive'>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className='space-y-2'>
							<Label htmlFor='email'>Email address</Label>
							<Input
								id='email'
								type='email'
								{...register('email')}
								placeholder='Enter your email'
							/>
							{errors.email && (
								<p className='text-sm text-red-500'>{errors.email.message}</p>
							)}
						</div>

						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? 'Sending...' : 'Send reset instructions'}
						</Button>

						<div className='text-center text-sm'>
							Remember your password?{' '}
							<Link to='/login' className='text-primary hover:text-primary/80'>
								Sign in
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
