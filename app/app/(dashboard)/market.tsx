import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
	TrendingUp,
	TrendingDown,
	Search,
	RefreshCw,
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

// Mock price history data - would come from API in real app
const priceHistory = [
	{ date: '2025-04-09', wheat: 7.0, corn: 6.5, soybeans: 14.2, barley: 5.8 },
	{ date: '2025-04-10', wheat: 7.1, corn: 6.6, soybeans: 14.3, barley: 5.7 },
	{ date: '2025-04-11', wheat: 7.0, corn: 6.7, soybeans: 14.4, barley: 5.9 },
	{ date: '2025-04-12', wheat: 7.2, corn: 6.8, soybeans: 14.3, barley: 5.8 },
	{ date: '2025-04-13', wheat: 7.3, corn: 6.7, soybeans: 14.5, barley: 5.8 },
	{ date: '2025-04-14', wheat: 7.4, corn: 6.8, soybeans: 14.4, barley: 5.9 },
	{ date: '2025-04-15', wheat: 7.2, corn: 6.8, soybeans: 14.5, barley: 5.9 },
];

export default function Market() {
	const { marketPrices } = useStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCrop, setSelectedCrop] = useState('wheat');
	const [selectedMarket, setSelectedMarket] = useState('all');

	// Filter market prices based on search and filters
	const filteredPrices = marketPrices.filter((price) => {
		const matchesSearch =
			price.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
			price.market.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesMarket =
			selectedMarket === 'all' || price.market === selectedMarket;

		return matchesSearch && matchesMarket;
	});

	// Prepare chart data
	const chartData = {
		labels: priceHistory.map((entry) => entry.date.split('-')[2]), // Just use day for x-axis
		datasets: [
			{
				data: priceHistory.map(
					(entry) => entry[selectedCrop as keyof typeof entry] as number
				),
				color: () => '#4D7C0F',
			},
		],
	};

	// Simulate refresh function (would fetch from API in real app)
	const handleRefresh = () => {
		console.log('Refreshing market data...');
		// In a real app, this would fetch the latest data from an API
		alert(
			'Market data would be refreshed from an API in the full implementation.'
		);
	};

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View className='flex-row justify-between items-center'>
					<View>
						<Text className='text-2xl font-bold tracking-tight'>
							Market Prices
						</Text>
						<Text className='text-muted-foreground'>
							Track commodity prices and market trends.
						</Text>
					</View>

					<TouchableOpacity
						onPress={handleRefresh}
						className='bg-muted p-2 rounded-lg'
					>
						<RefreshCw className='h-4 w-4' />
					</TouchableOpacity>
				</View>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-2'>Price Trends</Text>
						<Select
							value={selectedCrop}
							onValueChange={setSelectedCrop}
							items={[
								{ label: 'Wheat', value: 'wheat' },
								{ label: 'Corn', value: 'corn' },
								{ label: 'Soybeans', value: 'soybeans' },
								{ label: 'Barley', value: 'barley' },
							]}
						/>
						<View className='h-[300px] mt-4'>
							<LineChart
								data={chartData}
								width={350}
								height={300}
								chartConfig={{
									backgroundColor: '#ffffff',
									backgroundGradientFrom: '#ffffff',
									backgroundGradientTo: '#ffffff',
									decimalPlaces: 2,
									color: (opacity = 1) => `rgba(77, 124, 15, ${opacity})`,
									style: {
										borderRadius: 16,
									},
								}}
								bezier
								style={{
									marginVertical: 8,
									borderRadius: 16,
								}}
							/>
						</View>
					</View>
				</Card>

				<View className='flex-row flex-wrap gap-4'>
					<Card className='flex-1 min-w-[150px]'>
						<View className='p-4'>
							<Text className='text-sm text-muted-foreground mb-2'>Wheat</Text>
							<View className='flex-row justify-between items-center'>
								<Text className='text-2xl font-bold'>$7.20</Text>
								<View className='flex-row items-center'>
									<TrendingUp className='h-4 w-4 text-green-600 mr-1' />
									<Text className='text-sm text-green-600'>+2.8%</Text>
								</View>
							</View>
						</View>
					</Card>

					<Card className='flex-1 min-w-[150px]'>
						<View className='p-4'>
							<Text className='text-sm text-muted-foreground mb-2'>Corn</Text>
							<View className='flex-row justify-between items-center'>
								<Text className='text-2xl font-bold'>$6.80</Text>
								<View className='flex-row items-center'>
									<TrendingUp className='h-4 w-4 text-green-600 mr-1' />
									<Text className='text-sm text-green-600'>+4.6%</Text>
								</View>
							</View>
						</View>
					</Card>

					<Card className='flex-1 min-w-[150px]'>
						<View className='p-4'>
							<Text className='text-sm text-muted-foreground mb-2'>
								Soybeans
							</Text>
							<View className='flex-row justify-between items-center'>
								<Text className='text-2xl font-bold'>$14.50</Text>
								<View className='flex-row items-center'>
									<TrendingUp className='h-4 w-4 text-green-600 mr-1' />
									<Text className='text-sm text-green-600'>+2.1%</Text>
								</View>
							</View>
						</View>
					</Card>

					<Card className='flex-1 min-w-[150px]'>
						<View className='p-4'>
							<Text className='text-sm text-muted-foreground mb-2'>Barley</Text>
							<View className='flex-row justify-between items-center'>
								<Text className='text-2xl font-bold'>$5.90</Text>
								<View className='flex-row items-center'>
									<TrendingDown className='h-4 w-4 text-red-600 mr-1' />
									<Text className='text-sm text-red-600'>-1.7%</Text>
								</View>
							</View>
						</View>
					</Card>
				</View>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-2'>Market Prices</Text>
						<View className='space-y-2'>
							<View className='flex-row items-center space-x-2 bg-muted p-2 rounded-lg'>
								<Search className='h-4 w-4 text-muted-foreground' />
								<TextInput
									placeholder='Search crops or markets...'
									value={searchQuery}
									onChangeText={setSearchQuery}
									className='flex-1'
								/>
							</View>
							<Select
								value={selectedMarket}
								onValueChange={setSelectedMarket}
								items={[
									{ label: 'All Markets', value: 'all' },
									{ label: 'Local Market', value: 'Local' },
									{ label: 'Regional Market', value: 'Regional' },
								]}
							/>
						</View>

						<View className='mt-4 space-y-2'>
							{filteredPrices.length > 0 ? (
								filteredPrices.map((price) => (
									<View
										key={price.id}
										className='flex-row justify-between items-center p-2 bg-muted/50 rounded-lg'
									>
										<View>
											<Text className='font-medium'>{price.crop}</Text>
											<Text className='text-sm text-muted-foreground'>
												{price.market}
											</Text>
										</View>
										<View className='items-end'>
											<Text className='font-medium'>
												${price.price.toFixed(2)}
											</Text>
											<Text className='text-sm text-muted-foreground'>
												{price.date}
											</Text>
										</View>
									</View>
								))
							) : (
								<Text className='text-center text-muted-foreground'>
									No price data found
								</Text>
							)}
						</View>
					</View>
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-2'>Price Comparison</Text>
						<View className='space-y-4'>
							<View>
								<View className='flex-row justify-between mb-1'>
									<Text className='text-sm'>Local vs Regional - Wheat</Text>
									<Text className='text-sm text-green-600'>+5.6% Premium</Text>
								</View>
								<View className='w-full bg-muted rounded-full h-2.5'>
									<View
										className='bg-primary h-2.5 rounded-full'
										style={{ width: '94%' }}
									/>
								</View>
							</View>
						</View>
					</View>
				</Card>
			</View>
		</ScrollView>
	);
}
