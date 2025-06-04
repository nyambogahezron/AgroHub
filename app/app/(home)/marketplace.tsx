import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useMarketplaceStore } from '@/store/marketplace';
import FilterModal from '@/components/marketplace/FilterModal';
import ProductCard from '@/components/marketplace/ProductCard';
import { sampleProducts } from '@/data/products';

export default function MarketplaceScreen() {
	const [showFilters, setShowFilters] = useState(false);
	const { filteredProducts, viewMode, setViewMode, setProducts } =
		useMarketplaceStore();

	useEffect(() => {
		setProducts(sampleProducts);
	}, []);

	return (
		<View className='flex-1 bg-background'>
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
					onPress={() => setShowFilters(true)}
				>
					<Ionicons name='search' size={20} color='#666' />
					<Text className='text-text-secondary ml-2'>
						Search and filter products...
					</Text>
				</TouchableOpacity>

				{/* View Mode Toggle */}
				<View className='flex-row justify-end mb-4'>
					<TouchableOpacity
						className={`p-2 rounded-md mr-2 ${
							viewMode === 'grid' ? 'bg-primary' : 'bg-surface'
						}`}
						onPress={() => setViewMode('grid')}
					>
						<Ionicons
							name='grid'
							size={20}
							color={viewMode === 'grid' ? 'white' : '#666'}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						className={`p-2 rounded-md ${
							viewMode === 'list' ? 'bg-primary' : 'bg-surface'
						}`}
						onPress={() => setViewMode('list')}
					>
						<Ionicons
							name='list'
							size={20}
							color={viewMode === 'list' ? 'white' : '#666'}
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Products Grid/List */}
			<ScrollView className='flex-1 px-4'>
				{filteredProducts.length === 0 ? (
					<View className='items-center justify-center py-10'>
						<Text className='text-xl font-bold text-text mb-2'>
							No products found
						</Text>
						<Text className='text-text-secondary text-center'>
							Try adjusting your filters to find what you're looking for.
						</Text>
					</View>
				) : (
					<View
						className={`${
							viewMode === 'grid'
								? 'flex-row flex-wrap justify-between'
								: 'space-y-4'
						}`}
					>
						{filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								viewMode={viewMode}
							/>
						))}
					</View>
				)}
			</ScrollView>

			{/* Sell Button */}
			<TouchableOpacity
				className='absolute bottom-6 right-6 bg-primary p-4 rounded-full shadow-lg'
				onPress={() => {}}
			>
				<Ionicons name='add' size={32} color='white' />
			</TouchableOpacity>

			{/* Filter Modal */}
			<FilterModal
				visible={showFilters}
				onClose={() => setShowFilters(false)}
			/>
		</View>
	);
}
