import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AnalyticsScreen() {
	return (
		<ScrollView className='flex-1 bg-background'>
			{/* Header Section */}
			<View className='p-4 bg-surface'>
				<Text className='text-2xl font-bold text-text mb-2'>
					Agricultural Price Analytics
				</Text>
				<Text className='text-text-secondary'>
					Track, analyze, and predict agricultural commodity prices across
					markets.
				</Text>

				{/* Action Buttons */}
				<View className='flex-row mt-4 space-x-3'>
					<TouchableOpacity className='flex-1 bg-surface border border-gray-200 rounded-lg p-3 flex-row items-center justify-center'>
						<Ionicons name='download-outline' size={20} color='#4CAF50' />
						<Text className='text-text ml-2'>Export Data</Text>
					</TouchableOpacity>
					<TouchableOpacity className='flex-1 bg-primary rounded-lg p-3 flex-row items-center justify-center'>
						<Ionicons
							name='information-circle-outline'
							size={20}
							color='white'
						/>
						<Text className='text-white ml-2'>Market Reports</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Price Trends Section */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>Price Trends</Text>
				<View className='bg-surface rounded-lg p-4'>
					<Text className='text-text-secondary mb-4'>
						Price trends chart will be implemented here
					</Text>
				</View>
			</View>

			{/* Regional Comparison Section */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>
					Regional Comparison
				</Text>
				<View className='bg-surface rounded-lg p-4'>
					<Text className='text-text-secondary mb-4'>
						Regional comparison chart will be implemented here
					</Text>
				</View>
			</View>

			{/* Market Insights Section */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>
					Market Insights
				</Text>
				<View className='space-y-4'>
					<InsightCard
						title='Seasonal Trends'
						description='Apple prices typically increase by 12% during the winter months due to decreased supply. Farmers should consider storage solutions to benefit from this price differential.'
					/>
					<InsightCard
						title='Regional Opportunities'
						description='The Northeast region consistently pays 15% more for organic produce. Farmers with organic certification should consider targeting this market for premium pricing.'
					/>
					<InsightCard
						title='Price Volatility'
						description='Beef prices show the highest volatility (±8% monthly) among tracked commodities. Producers should consider hedging strategies to mitigate risk.'
					/>
				</View>
			</View>
		</ScrollView>
	);
}

function InsightCard({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<View className='bg-surface border border-gray-200 rounded-lg p-4'>
			<Text className='font-bold text-text mb-2'>{title}</Text>
			<Text className='text-text-secondary text-sm'>{description}</Text>
		</View>
	);
}
