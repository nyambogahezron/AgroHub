import { View, Text } from 'react-native';
import { useYieldsStore, type YieldsState } from '@/store/yieldsStore';

export function YieldChart() {
	const yields = useYieldsStore((state: YieldsState) => state.yields);

	return (
		<View className='bg-card p-4 rounded-lg'>
			<Text className='text-lg font-medium mb-4'>Yield Trends</Text>
			<View className='h-48 items-center justify-center'>
				<Text className='text-muted-foreground'>
					Chart visualization coming soon
				</Text>
			</View>
		</View>
	);
}
