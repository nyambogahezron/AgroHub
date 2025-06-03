import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	resetPasswordSchema,
	type ResetPasswordFormData,
} from '@/lib/validations/auth';

export default function ResetPasswordPage() {
	const [isSuccess, setIsSuccess] = useState(false);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const { resetPassword, isLoading, error } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	if (!token) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
				<Card className='w-full max-w-md'>
					<CardHeader>
						<CardTitle className='text-center text-2xl font-bold'>
							Invalid Reset Link
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Alert variant='destructive'>
							<AlertDescription>
								This password reset link is invalid or has expired. Please
								request a new one.
							</AlertDescription>
						</Alert>
						<div className='mt-4 text-center'>
							<Link
								to='/forgot-password'
								className='text-primary hover:text-primary/80'
							>
								Request new reset link
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	const onSubmit = async (data: ResetPasswordFormData) => {
		try {
			await resetPassword(token, data.password);
			setIsSuccess(true);
			setTimeout(() => {
				navigate('/login');
			}, 3000);
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
							Password Reset Successful
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Alert>
							<AlertDescription>
								Your password has been reset successfully. You will be
								redirected to the login page shortly.
							</AlertDescription>
						</Alert>
						<div className='mt-4 text-center'>
							<Link to='/login' className='text-primary hover:text-primary/80'>
								Go to login
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
							<Label htmlFor='password'>New password</Label>
							<Input
								id='password'
								type='password'
								{...register('password')}
								placeholder='Enter your new password'
							/>
							{errors.password && (
								<p className='text-sm text-red-500'>
									{errors.password.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm new password</Label>
							<Input
								id='confirmPassword'
								type='password'
								{...register('confirmPassword')}
								placeholder='Confirm your new password'
							/>
							{errors.confirmPassword && (
								<p className='text-sm text-red-500'>
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? 'Resetting password...' : 'Reset password'}
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
