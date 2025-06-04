import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '@/store/marketplace';

interface ProductCardProps {
	product: Product;
	viewMode: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
	if (viewMode === 'list') {
		return (
			<View className='bg-surface rounded-lg overflow-hidden flex-row'>
				<Image
					source={{ uri: product.image }}
					className='w-24 h-24'
					resizeMode='cover'
				/>
				<View className='flex-1 p-3'>
					<View className='flex-row items-center justify-between mb-1'>
						<Text className='text-xs text-text-secondary'>
							{product.category}
						</Text>
						<View className='flex-row items-center'>
							<Ionicons name='star' size={14} color='#FFB800' />
							<Text className='text-xs ml-1'>{product.rating}</Text>
						</View>
					</View>
					<Text className='font-bold text-text'>{product.name}</Text>
					<Text className='text-primary font-bold mt-1'>
						${product.price.toFixed(2)}
					</Text>
					<View className='flex-row items-center justify-between mt-2'>
						<Text className='text-xs text-text-secondary'>
							{product.location}
						</Text>
						<TouchableOpacity className='bg-primary p-2 rounded-full'>
							<Ionicons name='cart-outline' size={16} color='white' />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View className='w-[48%] mb-4 bg-surface rounded-lg overflow-hidden'>
			<View className='relative'>
				<Image
					source={{ uri: product.image }}
					className='w-full h-40'
					resizeMode='cover'
				/>
				<TouchableOpacity className='absolute top-3 right-3 bg-white p-2 rounded-full'>
					<Ionicons name='heart-outline' size={18} color='#666' />
				</TouchableOpacity>
				{product.organic && (
					<View className='absolute top-3 left-3 bg-primary px-2 py-1 rounded-md'>
						<Text className='text-white text-xs font-bold'>Organic</Text>
					</View>
				)}
				{product.featured && (
					<View className='absolute bottom-3 left-3 bg-yellow-600 px-2 py-1 rounded-md'>
						<Text className='text-white text-xs font-bold'>Featured</Text>
					</View>
				)}
			</View>

			<View className='p-3'>
				<View className='flex-row items-center justify-between mb-1'>
					<Text className='text-xs text-text-secondary'>
						{product.category}
					</Text>
					<View className='flex-row items-center'>
						<Ionicons name='star' size={14} color='#FFB800' />
						<Text className='text-xs ml-1'>{product.rating}</Text>
					</View>
				</View>

				<Text className='font-bold text-text'>{product.name}</Text>
				<Text className='text-text-secondary text-xs mt-1 line-clamp-2'>
					{product.description.substring(0, 80)}...
				</Text>

				<View className='flex-row items-baseline justify-between mt-2'>
					<Text className='text-primary font-bold'>
						${product.price.toFixed(2)}
					</Text>
					<Text className='text-text-secondary text-xs'>
						per {product.unit}
					</Text>
				</View>

				<View className='flex-row items-center justify-between mt-3'>
					<Text className='text-xs text-text-secondary'>
						{product.location}
					</Text>
					<TouchableOpacity className='bg-primary p-2 rounded-full'>
						<Ionicons name='cart-outline' size={16} color='white' />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
