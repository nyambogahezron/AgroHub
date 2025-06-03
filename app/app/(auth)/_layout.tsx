import { Stack } from 'expo-router';

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: '#fff' },
			}}
		>
			<Stack.Screen name='login' />
			<Stack.Screen name='register' />
			<Stack.Screen name='forgot-password' />
			<Stack.Screen name='reset-password' />
		</Stack>
	);
}
