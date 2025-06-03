import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore, UserRole } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';

const registerSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.min(2, 'Name must be at least 2 characters'),
		email: z
			.string({ required_error: 'Email is required' })
			.email('Invalid email address'),
		role: z.enum(['buyer', 'farmer', 'admin'] as const, {
			required_error: 'Role is required',
		}),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, 'Password must be at least 8 characters')
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			),
		confirmPassword: z.string({
			required_error: 'Please confirm your password',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	const navigate = useNavigate();
	const { register: registerUser, isLoading, error } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			role: 'buyer',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			const { confirmPassword, ...rest } = data;
			const registerData = {
				email: rest.email!,
				password: rest.password!,
				name: rest.name!,
				role: rest.role! as UserRole,
			};
			await registerUser(registerData);
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
						Create your account
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
							<Label htmlFor='name'>Full Name</Label>
							<Input
								id='name'
								{...register('name')}
								placeholder='Enter your full name'
							/>
							{errors.name && (
								<p className='text-sm text-red-500'>{errors.name.message}</p>
							)}
						</div>

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
							<Label htmlFor='role'>Account Type</Label>
							<Select
								value={watch('role')}
								onValueChange={(value: UserRole) => setValue('role', value)}
							>
								<SelectTrigger>
									<SelectValue placeholder='Select account type' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='buyer'>Buyer</SelectItem>
									<SelectItem value='farmer'>Farmer</SelectItem>
									<SelectItem value='admin'>Admin</SelectItem>
								</SelectContent>
							</Select>
							{errors.role && (
								<p className='text-sm text-red-500'>{errors.role.message}</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								{...register('password')}
								placeholder='Create a password'
							/>
							{errors.password && (
								<p className='text-sm text-red-500'>
									{errors.password.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input
								id='confirmPassword'
								type='password'
								{...register('confirmPassword')}
								placeholder='Confirm your password'
							/>
							{errors.confirmPassword && (
								<p className='text-sm text-red-500'>
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? 'Creating account...' : 'Create account'}
						</Button>

						<div className='text-center text-sm'>
							Already have an account?{' '}
							<Link to='/login' className='text-primary hover:text-primary/80'>
								Sign in here
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
