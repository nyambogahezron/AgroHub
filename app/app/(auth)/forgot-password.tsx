import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth-store';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const { requestPasswordReset, isLoading, error } = useAuthStore();

	const handleSubmit = async () => {
		try {
			await requestPasswordReset(email);
			setIsSuccess(true);
		} catch (error) {
			// Error is handled by the auth store
		}
	};

	if (isSuccess) {
		return (
			<ScrollView className='flex-1 bg-background'>
				<View className='flex-1 justify-center p-4'>
					<View className='bg-surface p-6 rounded-lg'>
						<View className='items-center mb-4'>
							<Ionicons name='mail' size={48} color='#4CAF50' />
						</View>
						<Text className='text-2xl font-bold text-text text-center mb-2'>
							Check your email
						</Text>
						<Text className='text-text-secondary text-center mb-6'>
							If an account exists with that email, we've sent password reset
							instructions. Please check your email.
						</Text>
						<TouchableOpacity
							onPress={() => router.push('/login')}
							className='bg-primary py-4 rounded-lg'
						>
							<Text className='text-white text-center font-semibold'>
								Return to login
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='flex-1 justify-center p-4'>
				<View className='mb-8'>
					<Text className='text-3xl font-bold text-text text-center'>
						Reset Password
					</Text>
					<Text className='text-text-secondary text-center mt-2'>
						Enter your email to receive reset instructions
					</Text>
				</View>

				{error && (
					<View className='bg-error/10 p-4 rounded-lg mb-4'>
						<Text className='text-error text-center'>{error}</Text>
					</View>
				)}

				<View className='space-y-4'>
					<View>
						<Text className='text-text mb-2'>Email address</Text>
						<View className='flex-row items-center bg-surface border border-gray-200 rounded-lg px-4'>
							<Ionicons name='mail-outline' size={20} color='#666' />
							<TextInput
								className='flex-1 py-3 px-2 text-text'
								placeholder='Enter your email'
								value={email}
								onChangeText={setEmail}
								keyboardType='email-address'
								autoCapitalize='none'
							/>
						</View>
					</View>

					<TouchableOpacity
						onPress={handleSubmit}
						disabled={isLoading}
						className='bg-primary py-4 rounded-lg mt-4'
					>
						{isLoading ? (
							<ActivityIndicator color='white' />
						) : (
							<Text className='text-white text-center font-semibold'>
								Send Reset Instructions
							</Text>
						)}
					</TouchableOpacity>

					<View className='flex-row justify-center mt-4'>
						<Text className='text-text-secondary'>
							Remember your password?{' '}
						</Text>
						<Link href='/login' asChild>
							<TouchableOpacity>
								<Text className='text-primary font-semibold'>Sign in</Text>
							</TouchableOpacity>
						</Link>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
