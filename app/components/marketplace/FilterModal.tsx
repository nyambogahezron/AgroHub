import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMarketplaceStore, FilterOptions } from '@/store/marketplace';

interface FilterModalProps {
	visible: boolean;
	onClose: () => void;
}

const categories = [
	'All',
	'Grains',
	'Vegetables',
	'Fruits',
	'Livestock',
	'Equipment',
];
const locations = [
	'All',
	'North Region',
	'South Region',
	'East Region',
	'West Region',
	'Central Region',
];
const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];

export default function FilterModal({ visible, onClose }: FilterModalProps) {
	const { filters, setFilters, applyFilters } = useMarketplaceStore();

	const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
		setFilters({ ...filters, ...newFilters });
	};

	const handleApply = () => {
		applyFilters();
		onClose();
	};

	return (
		<Modal
			visible={visible}
			animationType='slide'
			presentationStyle='pageSheet'
		>
			<View className='flex-1 bg-background'>
				{/* Header */}
				<View className='flex-row items-center justify-between p-4 border-b border-gray-200'>
					<Text className='text-xl font-bold text-text'>Filters</Text>
					<TouchableOpacity onPress={onClose}>
						<Ionicons name='close' size={24} color='#666' />
					</TouchableOpacity>
				</View>

				<ScrollView className='flex-1 p-4'>
					{/* Search */}
					<View className='mb-6'>
						<Text className='text-text font-semibold mb-2'>Search</Text>
						<TextInput
							className='bg-surface p-3 rounded-lg'
							placeholder='Search products...'
							value={filters.search}
							onChangeText={(text) => handleFilterChange({ search: text })}
						/>
					</View>

					{/* Categories */}
					<View className='mb-6'>
						<Text className='text-text font-semibold mb-2'>Categories</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{categories.map((category) => (
								<TouchableOpacity
									key={category}
									className={`mr-2 px-4 py-2 rounded-full ${
										filters.category === category ? 'bg-primary' : 'bg-surface'
									}`}
									onPress={() =>
										handleFilterChange({
											category: category === 'All' ? null : category,
										})
									}
								>
									<Text
										className={
											filters.category === category ? 'text-white' : 'text-text'
										}
									>
										{category}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>

					{/* Locations */}
					<View className='mb-6'>
						<Text className='text-text font-semibold mb-2'>Locations</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{locations.map((location) => (
								<TouchableOpacity
									key={location}
									className={`mr-2 px-4 py-2 rounded-full ${
										filters.location === location ? 'bg-primary' : 'bg-surface'
									}`}
									onPress={() =>
										handleFilterChange({
											location: location === 'All' ? null : location,
										})
									}
								>
									<Text
										className={
											filters.location === location ? 'text-white' : 'text-text'
										}
									>
										{location}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>

					{/* Seasons */}
					<View className='mb-6'>
						<Text className='text-text font-semibold mb-2'>Seasons</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{seasons.map((season) => (
								<TouchableOpacity
									key={season}
									className={`mr-2 px-4 py-2 rounded-full ${
										filters.season === season ? 'bg-primary' : 'bg-surface'
									}`}
									onPress={() =>
										handleFilterChange({
											season: season === 'All' ? null : season,
										})
									}
								>
									<Text
										className={
											filters.season === season ? 'text-white' : 'text-text'
										}
									>
										{season}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>

					{/* Organic Toggle */}
					<View className='mb-6'>
						<TouchableOpacity
							className='flex-row items-center'
							onPress={() => handleFilterChange({ organic: !filters.organic })}
						>
							<View
								className={`w-6 h-6 rounded-full mr-2 border-2 ${
									filters.organic
										? 'bg-primary border-primary'
										: 'border-gray-300'
								}`}
							>
								{filters.organic && (
									<Ionicons name='checkmark' size={16} color='white' />
								)}
							</View>
							<Text className='text-text'>Organic Products Only</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				{/* Footer */}
				<View className='p-4 border-t border-gray-200'>
					<TouchableOpacity
						className='bg-primary p-4 rounded-lg'
						onPress={handleApply}
					>
						<Text className='text-white text-center font-semibold'>
							Apply Filters
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
