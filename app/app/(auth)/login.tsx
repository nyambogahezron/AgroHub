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

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async () => {
		try {
			await login(email, password);
			router.replace('/(tabs)');
		} catch (error) {
			// Error is handled by the auth store
		}
	};

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='flex-1 justify-center p-4'>
				<View className='mb-8'>
					<Text className='text-3xl font-bold text-text text-center'>
						Welcome Back
					</Text>
					<Text className='text-text-secondary text-center mt-2'>
						Sign in to your account
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

					<View>
						<Text className='text-text mb-2'>Password</Text>
						<View className='flex-row items-center bg-surface border border-gray-200 rounded-lg px-4'>
							<Ionicons name='lock-closed-outline' size={20} color='#666' />
							<TextInput
								className='flex-1 py-3 px-2 text-text'
								placeholder='Enter your password'
								value={password}
								onChangeText={setPassword}
								secureTextEntry
							/>
						</View>
					</View>

					<TouchableOpacity
						onPress={() => router.push('/forgot-password')}
						className='self-end'
					>
						<Text className='text-primary'>Forgot your password?</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={handleLogin}
						disabled={isLoading}
						className='bg-primary py-4 rounded-lg mt-4'
					>
						{isLoading ? (
							<ActivityIndicator color='white' />
						) : (
							<Text className='text-white text-center font-semibold'>
								Sign in
							</Text>
						)}
					</TouchableOpacity>

					<View className='flex-row justify-center mt-4'>
						<Text className='text-text-secondary'>Don't have an account? </Text>
						<Link href='/register' asChild>
							<TouchableOpacity>
								<Text className='text-primary font-semibold'>
									Register here
								</Text>
							</TouchableOpacity>
						</Link>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
