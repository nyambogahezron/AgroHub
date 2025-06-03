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
import { useAuthStore, UserRole } from '../../store/auth-store';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [role, setRole] = useState<UserRole>('buyer');
	const { register, isLoading, error } = useAuthStore();

	const handleRegister = async () => {
		if (password !== confirmPassword) {
			// You might want to show this error in a more user-friendly way
			alert("Passwords don't match");
			return;
		}

		try {
			await register({
				name,
				email,
				password,
				role,
			});
			router.replace('/(tabs)');
		} catch (error) {
			// Error is handled by the auth store
		}
	};

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='flex-1 p-4'>
				<View className='mb-8'>
					<Text className='text-3xl font-bold text-text text-center'>
						Create Account
					</Text>
					<Text className='text-text-secondary text-center mt-2'>
						Join AgroHub today
					</Text>
				</View>

				{error && (
					<View className='bg-error/10 p-4 rounded-lg mb-4'>
						<Text className='text-error text-center'>{error}</Text>
					</View>
				)}

				<View className='space-y-4'>
					<View>
						<Text className='text-text mb-2'>Full Name</Text>
						<View className='flex-row items-center bg-surface border border-gray-200 rounded-lg px-4'>
							<Ionicons name='person-outline' size={20} color='#666' />
							<TextInput
								className='flex-1 py-3 px-2 text-text'
								placeholder='Enter your full name'
								value={name}
								onChangeText={setName}
							/>
						</View>
					</View>

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
								placeholder='Create a password'
								value={password}
								onChangeText={setPassword}
								secureTextEntry
							/>
						</View>
					</View>

					<View>
						<Text className='text-text mb-2'>Confirm Password</Text>
						<View className='flex-row items-center bg-surface border border-gray-200 rounded-lg px-4'>
							<Ionicons name='lock-closed-outline' size={20} color='#666' />
							<TextInput
								className='flex-1 py-3 px-2 text-text'
								placeholder='Confirm your password'
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								secureTextEntry
							/>
						</View>
					</View>

					<View>
						<Text className='text-text mb-2'>I am a</Text>
						<View className='flex-row space-x-4'>
							<TouchableOpacity
								onPress={() => setRole('buyer')}
								className={`flex-1 py-3 rounded-lg border ${
									role === 'buyer'
										? 'bg-primary border-primary'
										: 'bg-surface border-gray-200'
								}`}
							>
								<Text
									className={`text-center font-semibold ${
										role === 'buyer' ? 'text-white' : 'text-text'
									}`}
								>
									Buyer
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => setRole('farmer')}
								className={`flex-1 py-3 rounded-lg border ${
									role === 'farmer'
										? 'bg-primary border-primary'
										: 'bg-surface border-gray-200'
								}`}
							>
								<Text
									className={`text-center font-semibold ${
										role === 'farmer' ? 'text-white' : 'text-text'
									}`}
								>
									Farmer
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					<TouchableOpacity
						onPress={handleRegister}
						disabled={isLoading}
						className='bg-primary py-4 rounded-lg mt-4'
					>
						{isLoading ? (
							<ActivityIndicator color='white' />
						) : (
							<Text className='text-white text-center font-semibold'>
								Create Account
							</Text>
						)}
					</TouchableOpacity>

					<View className='flex-row justify-center mt-4'>
						<Text className='text-text-secondary'>
							Already have an account?{' '}
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
