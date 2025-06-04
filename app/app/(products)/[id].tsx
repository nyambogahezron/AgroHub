import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { sampleProducts } from '@/data/products';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const [quantity, setQuantity] = useState(1);
	const { addItem } = useCartStore();

	const product = sampleProducts.find((p) => p.id === id);

	if (!product) {
		return (
			<View className='flex-1 items-center justify-center'>
				<Text>Product not found</Text>
			</View>
		);
	}

	const handleAddToCart = () => {
		addItem(product, quantity);
		router.push('/cart');
	};

	return (
		<View className='flex-1 bg-background'>
			{/* Header with back button */}
			<View className='absolute top-12 left-4 z-10'>
				<TouchableOpacity
					className='bg-white/80 p-2 rounded-full'
					onPress={() => router.back()}
				>
					<Ionicons name='arrow-back' size={24} color='#000' />
				</TouchableOpacity>
			</View>

			<ScrollView className='flex-1'>
				{/* Product Images */}
				<ScrollView
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					className='h-80'
				>
					<Image
						source={{ uri: product.image }}
						className='w-full h-full'
						resizeMode='cover'
					/>
					{/* Add more images here if available */}
				</ScrollView>

				{/* Product Info */}
				<View className='p-4'>
					<View className='flex-row items-center justify-between mb-2'>
						<Text className='text-2xl font-bold text-text'>{product.name}</Text>
						<View className='flex-row items-center'>
							<Ionicons name='star' size={20} color='#FFB800' />
							<Text className='ml-1'>{product.rating}</Text>
							<Text className='text-text-secondary ml-1'>
								({product.reviews} reviews)
							</Text>
						</View>
					</View>

					<Text className='text-primary font-bold text-xl mb-4'>
						${product.price.toFixed(2)} per {product.unit}
					</Text>

					<View className='flex-row items-center mb-4'>
						<Ionicons name='location' size={20} color='#666' />
						<Text className='text-text-secondary ml-2'>{product.location}</Text>
					</View>

					{product.organic && (
						<View className='bg-primary px-3 py-1 rounded-full self-start mb-4'>
							<Text className='text-white font-semibold'>Organic</Text>
						</View>
					)}

					<Text className='text-text mb-4'>{product.description}</Text>

					{/* Quantity Selector */}
					<View className='flex-row items-center mb-6'>
						<Text className='text-text font-semibold mr-4'>Quantity:</Text>
						<View className='flex-row items-center'>
							<TouchableOpacity
								className='bg-surface p-2 rounded-l-lg'
								onPress={() => setQuantity(Math.max(1, quantity - 1))}
							>
								<Ionicons name='remove' size={20} color='#666' />
							</TouchableOpacity>
							<View className='bg-surface px-4 py-2'>
								<Text className='text-text'>{quantity}</Text>
							</View>
							<TouchableOpacity
								className='bg-surface p-2 rounded-r-lg'
								onPress={() => setQuantity(quantity + 1)}
							>
								<Ionicons name='add' size={20} color='#666' />
							</TouchableOpacity>
						</View>
					</View>

					{/* Add to Cart Button */}
					<TouchableOpacity
						className='bg-primary p-4 rounded-lg flex-row items-center justify-center'
						onPress={handleAddToCart}
					>
						<Ionicons name='cart-outline' size={24} color='white' />
						<Text className='text-white font-semibold ml-2'>Add to Cart</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
