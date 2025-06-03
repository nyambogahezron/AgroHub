import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';

export default function LoginPage() {
	const navigate = useNavigate();
	const { login, isLoading, error } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data.email, data.password);
			navigate('/dashboard');
		} catch (error) {
			// Error is handled by the auth store
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-center text-2xl font-bold'>
						Sign in to your account
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

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								{...register('password')}
								placeholder='Enter your password'
							/>
							{errors.password && (
								<p className='text-sm text-red-500'>
									{errors.password.message}
								</p>
							)}
						</div>

						<div className='flex items-center justify-between'>
							<div className='text-sm'>
								<Link
									to='/forgot-password'
									className='text-primary hover:text-primary/80'
								>
									Forgot your password?
								</Link>
							</div>
						</div>

						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? 'Signing in...' : 'Sign in'}
						</Button>

						<div className='text-center text-sm'>
							Don't have an account?{' '}
							<Link
								to='/register'
								className='text-primary hover:text-primary/80'
							>
								Register here
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
