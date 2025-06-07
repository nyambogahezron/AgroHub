import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '@/store/cart';

export default function CartScreen() {
	const router = useRouter();
	const { items, removeItem, updateQuantity, getTotal } = useCartStore();

	if (items.length === 0) {
		return (
			<View className='flex-1 items-center justify-center p-4'>
				<Ionicons name='cart-outline' size={64} color='#666' />
				<Text className='text-xl font-bold text-text mt-4'>
					Your cart is empty
				</Text>
				<Text className='text-text-secondary text-center mt-2'>
					Add some products to your cart to see them here
				</Text>
				<TouchableOpacity
					className='bg-primary px-6 py-3 rounded-lg mt-6'
					onPress={() => router.back()}
				>
					<Text className='text-white font-semibold'>Continue Shopping</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View className='flex-1 bg-background'>
			{/* Header */}
			<View className='p-4 bg-surface'>
				<Text className='text-2xl font-bold text-text'>Shopping Cart</Text>
				<Text className='text-text-secondary'>
					{items.length} {items.length === 1 ? 'item' : 'items'} in your cart
				</Text>
			</View>

			<ScrollView className='flex-1 p-4'>
				{items.map((item) => (
					<View
						key={item.product.id}
						className='bg-surface rounded-lg p-4 mb-4 flex-row'
					>
						<Image
							source={{ uri: item.product.image }}
							className='w-20 h-20 rounded-lg'
							resizeMode='cover'
						/>
						<View className='flex-1 ml-4'>
							<Text className='font-bold text-text'>{item.product.name}</Text>
							<Text className='text-primary font-bold mt-1'>
								${item.product.price.toFixed(2)} per {item.product.unit}
							</Text>
							<View className='flex-row items-center mt-2'>
								<TouchableOpacity
									className='bg-background p-1 rounded-l-lg'
									onPress={() =>
										updateQuantity(
											item.product.id,
											Math.max(1, item.quantity - 1)
										)
									}
								>
									<Ionicons name='remove' size={16} color='#666' />
								</TouchableOpacity>
								<View className='bg-background px-3 py-1'>
									<Text className='text-text'>{item.quantity}</Text>
								</View>
								<TouchableOpacity
									className='bg-background p-1 rounded-r-lg'
									onPress={() =>
										updateQuantity(item.product.id, item.quantity + 1)
									}
								>
									<Ionicons name='add' size={16} color='#666' />
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity
							className='p-2'
							onPress={() => removeItem(item.product.id)}
						>
							<Ionicons name='trash-outline' size={20} color='#666' />
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>

			{/* Footer */}
			<View className='p-4 bg-surface border-t border-gray-200'>
				<View className='flex-row justify-between mb-4'>
					<Text className='text-text font-semibold'>Total:</Text>
					<Text className='text-primary font-bold text-xl'>
						${getTotal().toFixed(2)}
					</Text>
				</View>
				<TouchableOpacity
					className='bg-primary p-4 rounded-lg'
					onPress={() => router.push('/checkout')}
				>
					<Text className='text-white font-semibold text-center'>
						Proceed to Checkout
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
