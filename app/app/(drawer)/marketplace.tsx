import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MarketplaceScreen() {
	return (
		<ScrollView className='flex-1 bg-background'>
			{/* Header Section */}
			<View className='p-4 bg-surface'>
				<Text className='text-2xl font-bold text-text mb-2'>Marketplace</Text>
				<Text className='text-text-secondary'>
					Buy and sell agricultural products
				</Text>
			</View>

			{/* Search and Filter */}
			<View className='p-4'>
				<TouchableOpacity
					className='flex-row items-center bg-surface p-3 rounded-lg mb-4'
					onPress={() => {}}
				>
					<Ionicons name='search' size={20} color='#666' />
					<Text className='text-text-secondary ml-2'>Search products...</Text>
				</TouchableOpacity>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					className='mb-4'
				>
					<FilterChip label='All' active={true} />
					<FilterChip label='Grains' active={false} />
					<FilterChip label='Vegetables' active={false} />
					<FilterChip label='Fruits' active={false} />
					<FilterChip label='Livestock' active={false} />
					<FilterChip label='Equipment' active={false} />
				</ScrollView>
			</View>

			{/* Featured Products */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>
					Featured Products
				</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					className='mb-4'
				>
					<ProductCard
						image='https://example.com/wheat.jpg'
						title='Premium Wheat'
						price='$450/ton'
						location='North Region'
						rating={4.8}
						reviews={124}
					/>
					<ProductCard
						image='https://example.com/corn.jpg'
						title='Organic Corn'
						price='$380/ton'
						location='East Region'
						rating={4.5}
						reviews={89}
					/>
					<ProductCard
						image='https://example.com/soybeans.jpg'
						title='Soybeans'
						price='$520/ton'
						location='South Region'
						rating={4.9}
						reviews={156}
					/>
				</ScrollView>
			</View>

			{/* Recent Listings */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>
					Recent Listings
				</Text>
				<View className='space-y-4'>
					<ListingItem
						image='https://example.com/potatoes.jpg'
						title='Fresh Potatoes'
						price='$1.20/kg'
						location='West Region'
						time='2 hours ago'
						quantity='5000 kg'
					/>
					<ListingItem
						image='https://example.com/tomatoes.jpg'
						title='Organic Tomatoes'
						price='$2.50/kg'
						location='Central Region'
						time='5 hours ago'
						quantity='2000 kg'
					/>
					<ListingItem
						image='https://example.com/apples.jpg'
						title='Red Apples'
						price='$1.80/kg'
						location='North Region'
						time='1 day ago'
						quantity='3000 kg'
					/>
				</View>
			</View>

			{/* Sell Button */}
			<TouchableOpacity
				className='absolute bottom-6 right-6 bg-primary p-4 rounded-full shadow-lg'
				onPress={() => {}}
			>
				<Ionicons name='add' size={32} color='white' />
			</TouchableOpacity>
		</ScrollView>
	);
}

function FilterChip({ label, active }: { label: string; active: boolean }) {
	return (
		<TouchableOpacity
			className={`mr-2 px-4 py-2 rounded-full ${
				active ? 'bg-primary' : 'bg-surface'
			}`}
			onPress={() => {}}
		>
			<Text className={`${active ? 'text-white' : 'text-text'}`}>{label}</Text>
		</TouchableOpacity>
	);
}

function ProductCard({
	image,
	title,
	price,
	location,
	rating,
	reviews,
}: {
	image: string;
	title: string;
	price: string;
	location: string;
	rating: number;
	reviews: number;
}) {
	return (
		<View className='w-64 mr-4 bg-surface rounded-lg overflow-hidden'>
			<Image
				source={{ uri: image }}
				className='w-full h-40'
				resizeMode='cover'
			/>
			<View className='p-4'>
				<Text className='font-semibold text-text text-lg'>{title}</Text>
				<Text className='text-primary font-bold mt-1'>{price}</Text>
				<View className='flex-row items-center mt-2'>
					<Ionicons name='location' size={16} color='#666' />
					<Text className='text-text-secondary text-sm ml-1'>{location}</Text>
				</View>
				<View className='flex-row items-center mt-2'>
					<Ionicons name='star' size={16} color='#FFB800' />
					<Text className='text-text-secondary text-sm ml-1'>
						{rating} ({reviews} reviews)
					</Text>
				</View>
			</View>
		</View>
	);
}

function ListingItem({
	image,
	title,
	price,
	location,
	time,
	quantity,
}: {
	image: string;
	title: string;
	price: string;
	location: string;
	time: string;
	quantity: string;
}) {
	return (
		<View className='bg-surface rounded-lg overflow-hidden flex-row'>
			<Image source={{ uri: image }} className='w-24 h-24' resizeMode='cover' />
			<View className='flex-1 p-3'>
				<Text className='font-semibold text-text'>{title}</Text>
				<Text className='text-primary font-bold mt-1'>{price}</Text>
				<View className='flex-row items-center mt-1'>
					<Ionicons name='location' size={14} color='#666' />
					<Text className='text-text-secondary text-xs ml-1'>{location}</Text>
				</View>
				<View className='flex-row items-center justify-between mt-2'>
					<Text className='text-text-secondary text-xs'>{time}</Text>
					<Text className='text-text-secondary text-xs'>{quantity}</Text>
				</View>
			</View>
		</View>
	);
}
