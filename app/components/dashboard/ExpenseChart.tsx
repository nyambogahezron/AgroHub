import { View, Text } from 'react-native';
import { useExpensesStore } from '@/store/expensesStore';

export function ExpenseChart() {
	const expenses = useExpensesStore((state) => state.expenses);

	return (
		<View className='bg-card p-4 rounded-lg'>
			<Text className='text-lg font-medium mb-4'>Expense Trends</Text>
			<View className='h-48 items-center justify-center'>
				<Text className='text-muted-foreground'>
					Chart visualization coming soon
				</Text>
			</View>
		</View>
	);
}
