import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export default function CheckoutScreen() {
	const router = useRouter();
	const { items, getTotal, clearCart } = useCartStore();
	const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

	const handlePayment = () => {
		// Here you would typically integrate with a payment processor
		// For now, we'll just simulate a successful payment
		clearCart();
		router.push('/(home)/payment-success');
	};

	return (
		<View className='flex-1 bg-background'>
			{/* Header */}
			<View className='p-4 bg-surface'>
				<Text className='text-2xl font-bold text-text'>Checkout</Text>
			</View>

			<ScrollView className='flex-1 p-4'>
				{/* Shipping Information */}
				<View className='mb-6'>
					<Text className='text-lg font-bold text-text mb-4'>
						Shipping Information
					</Text>
					<View className='space-y-4'>
						<TextInput
							className='bg-surface p-3 rounded-lg'
							placeholder='Full Name'
						/>
						<TextInput
							className='bg-surface p-3 rounded-lg'
							placeholder='Address'
						/>
						<View className='flex-row space-x-4'>
							<TextInput
								className='flex-1 bg-surface p-3 rounded-lg'
								placeholder='City'
							/>
							<TextInput
								className='flex-1 bg-surface p-3 rounded-lg'
								placeholder='Postal Code'
							/>
						</View>
					</View>
				</View>

				{/* Payment Method */}
				<View className='mb-6'>
					<Text className='text-lg font-bold text-text mb-4'>
						Payment Method
					</Text>
					<View className='space-y-4'>
						<TouchableOpacity
							className={`p-4 rounded-lg border-2 ${
								paymentMethod === 'card'
									? 'border-primary bg-primary/5'
									: 'border-gray-200'
							}`}
							onPress={() => setPaymentMethod('card')}
						>
							<View className='flex-row items-center'>
								<Ionicons
									name='card-outline'
									size={24}
									color={paymentMethod === 'card' ? '#4CAF50' : '#666'}
								/>
								<Text
									className={`ml-3 font-semibold ${
										paymentMethod === 'card' ? 'text-primary' : 'text-text'
									}`}
								>
									Credit/Debit Card
								</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							className={`p-4 rounded-lg border-2 ${
								paymentMethod === 'bank'
									? 'border-primary bg-primary/5'
									: 'border-gray-200'
							}`}
							onPress={() => setPaymentMethod('bank')}
						>
							<View className='flex-row items-center'>
								<Ionicons
									name='business-outline'
									size={24}
									color={paymentMethod === 'bank' ? '#4CAF50' : '#666'}
								/>
								<Text
									className={`ml-3 font-semibold ${
										paymentMethod === 'bank' ? 'text-primary' : 'text-text'
									}`}
								>
									Bank Transfer
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				{/* Order Summary */}
				<View className='mb-6'>
					<Text className='text-lg font-bold text-text mb-4'>
						Order Summary
					</Text>
					<View className='bg-surface rounded-lg p-4'>
						{items.map((item) => (
							<View
								key={item.product.id}
								className='flex-row justify-between mb-2'
							>
								<Text className='text-text'>
									{item.quantity}x {item.product.name}
								</Text>
								<Text className='text-text'>
									${(item.product.price * item.quantity).toFixed(2)}
								</Text>
							</View>
						))}
						<View className='border-t border-gray-200 my-2' />
						<View className='flex-row justify-between'>
							<Text className='font-bold text-text'>Total</Text>
							<Text className='font-bold text-primary'>
								${getTotal().toFixed(2)}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* Footer */}
			<View className='p-4 bg-surface border-t border-gray-200'>
				<TouchableOpacity
					className='bg-primary p-4 rounded-lg'
					onPress={handlePayment}
				>
					<Text className='text-white font-semibold text-center'>
						Pay ${getTotal().toFixed(2)}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
