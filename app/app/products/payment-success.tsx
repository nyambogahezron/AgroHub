import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentSuccessScreen() {
	const router = useRouter();

	return (
		<View className='flex-1 bg-background items-center justify-center p-4'>
			<View className='items-center'>
				<View className='w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-6'>
					<Ionicons name='checkmark' size={40} color='#4CAF50' />
				</View>
				<Text className='text-2xl font-bold text-text mb-2'>
					Payment Successful!
				</Text>
				<Text className='text-text/60 text-center mb-8'>
					Thank you for your purchase. Your order has been confirmed and will be
					shipped soon.
				</Text>
				<TouchableOpacity
					className='bg-primary p-4 rounded-lg w-full'
					onPress={() => router.push('/(home)')}
				>
					<Text className='text-white font-semibold text-center'>
						Continue Shopping
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
