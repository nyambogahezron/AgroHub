import { View, Text, ScrollView } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react-native';

// Mock weather data
const currentWeather = {
	temperature: 24,
	condition: 'Sunny',
	humidity: 65,
	windSpeed: 12,
	precipitation: 0,
	icon: Sun,
};

const forecast = [
	{
		day: 'Today',
		high: 26,
		low: 18,
		condition: 'Sunny',
		icon: Sun,
	},
	{
		day: 'Tomorrow',
		high: 24,
		low: 17,
		condition: 'Partly Cloudy',
		icon: Cloud,
	},
	{
		day: 'Wed',
		high: 22,
		low: 16,
		condition: 'Rain',
		icon: CloudRain,
	},
	{
		day: 'Thu',
		high: 23,
		low: 17,
		condition: 'Cloudy',
		icon: Cloud,
	},
	{
		day: 'Fri',
		high: 25,
		low: 19,
		condition: 'Sunny',
		icon: Sun,
	},
];

const weatherAlerts = [
	{
		type: 'Rain Alert',
		message:
			'Heavy rainfall expected in the next 24 hours. Consider protecting sensitive crops.',
		severity: 'warning',
	},
	{
		type: 'Temperature Alert',
		message:
			'High temperatures expected this week. Ensure proper irrigation for crops.',
		severity: 'info',
	},
];

export default function Weather() {
	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View>
					<Text className='text-2xl font-bold tracking-tight'>Weather</Text>
					<Text className='text-muted-foreground'>
						Real-time weather information and forecasts for your farm.
					</Text>
				</View>

				<Card>
					<View className='p-4'>
						<View className='flex-row items-center justify-between mb-4'>
							<View>
								<Text className='text-4xl font-bold'>
									{currentWeather.temperature}°C
								</Text>
								<Text className='text-muted-foreground'>
									{currentWeather.condition}
								</Text>
							</View>
							<currentWeather.icon size={48} color='#000' />
						</View>

						<View className='flex-row justify-between mt-4'>
							<View className='items-center'>
								<Droplets size={24} color='#666' />
								<Text className='text-sm mt-1'>{currentWeather.humidity}%</Text>
								<Text className='text-xs text-muted-foreground'>Humidity</Text>
							</View>
							<View className='items-center'>
								<Wind size={24} color='#666' />
								<Text className='text-sm mt-1'>
									{currentWeather.windSpeed} km/h
								</Text>
								<Text className='text-xs text-muted-foreground'>Wind</Text>
							</View>
							<View className='items-center'>
								<CloudRain size={24} color='#666' />
								<Text className='text-sm mt-1'>
									{currentWeather.precipitation}%
								</Text>
								<Text className='text-xs text-muted-foreground'>Precip</Text>
							</View>
						</View>
					</View>
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-4'>5-Day Forecast</Text>
						<View className='space-y-4'>
							{forecast.map((day, index) => (
								<View
									key={index}
									className='flex-row items-center justify-between'
								>
									<Text className='w-20'>{day.day}</Text>
									<day.icon size={24} color='#666' />
									<Text className='w-24'>{day.condition}</Text>
									<Text className='w-20 text-right'>
										{day.high}° / {day.low}°
									</Text>
								</View>
							))}
						</View>
					</View>
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-4'>Weather Alerts</Text>
						<View className='space-y-4'>
							{weatherAlerts.map((alert, index) => (
								<Card
									key={index}
									className={`border-l-4 border-${
										alert.severity === 'warning' ? 'yellow' : 'blue'
									}-500`}
								>
									<View className='p-4'>
										<Text className='font-bold mb-1'>{alert.type}</Text>
										<Text className='text-sm text-muted-foreground'>
											{alert.message}
										</Text>
									</View>
								</Card>
							))}
						</View>
					</View>
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-4'>
							Farming Recommendations
						</Text>
						<View className='space-y-4'>
							<View>
								<Text className='font-bold mb-1'>Irrigation</Text>
								<Text className='text-sm text-muted-foreground'>
									Based on current conditions, no additional irrigation is
									needed today.
								</Text>
							</View>
							<View>
								<Text className='font-bold mb-1'>Crop Protection</Text>
								<Text className='text-sm text-muted-foreground'>
									Consider applying sun protection for sensitive crops during
									peak hours.
								</Text>
							</View>
							<View>
								<Text className='font-bold mb-1'>Harvest Timing</Text>
								<Text className='text-sm text-muted-foreground'>
									Optimal conditions for harvesting leafy greens in the early
									morning.
								</Text>
							</View>
						</View>
					</View>
				</Card>

				<Button variant='outline' className='mt-4'>
					View Detailed Forecast
				</Button>
			</View>
		</ScrollView>
	);
}
