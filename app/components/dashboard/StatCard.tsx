import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
	title: string;
	value: string;
	icon: LucideIcon;
	description: string;
	trend?: { value: number; positive: boolean };
}

export function StatCard({
	title,
	value,
	icon: Icon,
	description,
	trend,
}: StatCardProps) {
	return (
		<View className='p-4 rounded-lg border border-border bg-card'>
			<View className='flex-row items-center justify-between'>
				<Text className='text-sm font-medium text-muted-foreground'>
					{title}
				</Text>
				<Icon size={16} className='text-muted-foreground' />
			</View>
			<Text className='mt-2 text-2xl font-bold'>{value}</Text>
			<Text className='text-sm text-muted-foreground'>{description}</Text>
			{trend && (
				<Text
					className={`mt-1 text-sm ${
						trend.positive ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{trend.positive ? '+' : '-'}
					{trend.value}%
				</Text>
			)}
		</View>
	);
}
