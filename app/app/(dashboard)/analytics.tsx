import { View, Text, ScrollView } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Info } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Mock data for charts
const priceTrends = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	datasets: [
		{
			data: [20, 45, 28, 80, 99, 43],
			color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
			strokeWidth: 2,
		},
	],
};

const regionalPrices = {
	labels: ['North', 'South', 'East', 'West'],
	datasets: [
		{
			data: [20, 45, 28, 80],
			color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
			strokeWidth: 2,
		},
	],
};

const screenWidth = Dimensions.get('window').width;

export default function Analytics() {
	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View>
					<Text className='text-2xl font-bold tracking-tight'>
						Agricultural Price Analytics
					</Text>
					<Text className='text-muted-foreground'>
						Track, analyze, and predict agricultural commodity prices across
						markets.
					</Text>
				</View>

				<View className='flex-row gap-2'>
					<Button variant='outline' className='flex-1'>
						<Download size={18} />
						<Text className='ml-2'>Export Data</Text>
					</Button>
					<Button className='flex-1 bg-agri-green'>
						<Info size={18} />
						<Text className='ml-2 text-white'>Market Reports</Text>
					</Button>
				</View>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-4'>Price Trends</Text>
						<LineChart
							data={priceTrends}
							width={screenWidth - 32}
							height={220}
							chartConfig={{
								backgroundColor: '#ffffff',
								backgroundGradientFrom: '#ffffff',
								backgroundGradientTo: '#ffffff',
								decimalPlaces: 0,
								color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-4'>
							Regional Comparison
						</Text>
						<LineChart
							data={regionalPrices}
							width={screenWidth - 32}
							height={220}
							chartConfig={{
								backgroundColor: '#ffffff',
								backgroundGradientFrom: '#ffffff',
								backgroundGradientTo: '#ffffff',
								decimalPlaces: 0,
								color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-4'>Market Insights</Text>
						<Text className='text-muted-foreground mb-4'>
							Key insights and observations based on current market data.
						</Text>

						<View className='space-y-4'>
							<Card>
								<View className='p-4'>
									<Text className='font-bold mb-2'>Seasonal Trends</Text>
									<Text className='text-sm text-muted-foreground'>
										Apple prices typically increase by 12% during the winter
										months due to decreased supply. Farmers should consider
										storage solutions to benefit from this price differential.
									</Text>
								</View>
							</Card>

							<Card>
								<View className='p-4'>
									<Text className='font-bold mb-2'>Regional Opportunities</Text>
									<Text className='text-sm text-muted-foreground'>
										The Northeast region consistently pays 15% more for organic
										produce. Farmers with organic certification should consider
										targeting this market for premium pricing.
									</Text>
								</View>
							</Card>

							<Card>
								<View className='p-4'>
									<Text className='font-bold mb-2'>Price Volatility</Text>
									<Text className='text-sm text-muted-foreground'>
										Beef prices show the highest volatility (±8% monthly) among
										tracked commodities. Producers should consider hedging
										strategies to mitigate risk.
									</Text>
								</View>
							</Card>
						</View>

						<Button variant='outline' className='mt-4'>
							View Full Report
						</Button>
					</View>
				</Card>
			</View>
		</ScrollView>
	);
}
