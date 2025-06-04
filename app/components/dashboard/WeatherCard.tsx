import { View, Text } from 'react-native';

export function WeatherCard() {
	return (
		<View className='p-4 rounded-lg border border-border bg-card'>
			<Text className='text-lg font-medium'>Weather</Text>
			<Text className='mt-2 text-muted-foreground'>
				Weather information will be displayed here.
			</Text>
		</View>
	);
}
