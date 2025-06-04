import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
	return (
		<ScrollView className='flex-1 bg-background'>
			{/* Header Section */}
			<View className='p-4 bg-surface'>
				<Text className='text-2xl font-bold text-text mb-2'>
					Farm Dashboard
				</Text>
				<Text className='text-text-secondary'>
					Monitor your farm's performance and key metrics
				</Text>
			</View>

			{/* Stats Overview */}
			<View className='p-4'>
				<View className='flex-row flex-wrap justify-between'>
					<StatCard
						icon='cash'
						value='$12,450'
						label='Total Expenses'
						trend='+5.2%'
						trendUp={false}
					/>
					<StatCard
						icon='leaf'
						value='2,450'
						label='Total Yield (kg)'
						trend='+12.5%'
						trendUp={true}
					/>
					<StatCard
						icon='cube'
						value='8'
						label='Low Stock Items'
						trend='Critical'
						trendUp={false}
					/>
					<StatCard
						icon='people'
						value='$3,240'
						label='Labor Cost'
						trend='+2.1%'
						trendUp={false}
					/>
				</View>
			</View>

			{/* Weather Section */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>
					Weather Forecast
				</Text>
				<View className='bg-surface rounded-lg p-4'>
					<View className='flex-row items-center justify-between'>
						<View>
							<Text className='text-2xl font-bold text-text'>24°C</Text>
							<Text className='text-text-secondary'>Sunny</Text>
						</View>
						<Ionicons name='sunny' size={48} color='#FFB800' />
					</View>
					<View className='mt-4'>
						<Text className='text-text-secondary'>
							Perfect conditions for crop growth. Consider irrigation for
							optimal yield.
						</Text>
					</View>
				</View>
			</View>

			{/* Quick Actions */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>Quick Actions</Text>
				<View className='flex-row flex-wrap justify-between'>
					<ActionButton
						icon='add-circle'
						label='Add Expense'
						onPress={() => {}}
					/>
					<ActionButton icon='leaf' label='Record Yield' onPress={() => {}} />
					<ActionButton
						icon='cube'
						label='Update Inventory'
						onPress={() => {}}
					/>
					<ActionButton icon='people' label='Manage Labor' onPress={() => {}} />
				</View>
			</View>

			{/* Recent Activity */}
			<View className='p-4'>
				<Text className='text-xl font-bold text-text mb-4'>
					Recent Activity
				</Text>
				<View className='space-y-4'>
					<ActivityItem
						icon='cash'
						title='New Expense'
						description='Purchased new irrigation system'
						amount='$2,500'
						time='2 hours ago'
					/>
					<ActivityItem
						icon='leaf'
						title='Yield Recorded'
						description='Wheat harvest completed'
						amount='1,200 kg'
						time='5 hours ago'
					/>
					<ActivityItem
						icon='cube'
						title='Inventory Update'
						description='Stock level low for fertilizer'
						amount='Critical'
						time='1 day ago'
					/>
				</View>
			</View>
		</ScrollView>
	);
}

function StatCard({
	icon,
	value,
	label,
	trend,
	trendUp,
}: {
	icon: string;
	value: string;
	label: string;
	trend: string;
	trendUp: boolean;
}) {
	return (
		<View className='w-[48%] bg-surface p-4 rounded-lg mb-4'>
			<Ionicons name={icon as any} size={24} color='#4CAF50' />
			<Text className='text-2xl font-bold text-text mt-2'>{value}</Text>
			<Text className='text-text-secondary'>{label}</Text>
			<View className='flex-row items-center mt-1'>
				<Ionicons
					name={trendUp ? 'trending-up' : 'trending-down'}
					size={16}
					color={trendUp ? '#4CAF50' : '#EF4444'}
				/>
				<Text
					className={`text-sm ml-1 ${
						trendUp ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{trend}
				</Text>
			</View>
		</View>
	);
}

function ActionButton({
	icon,
	label,
	onPress,
}: {
	icon: string;
	label: string;
	onPress: () => void;
}) {
	return (
		<TouchableOpacity
			className='w-[48%] bg-surface p-4 rounded-lg mb-4 items-center'
			onPress={onPress}
		>
			<Ionicons name={icon as any} size={24} color='#4CAF50' />
			<Text className='text-text mt-2 text-center'>{label}</Text>
		</TouchableOpacity>
	);
}

function ActivityItem({
	icon,
	title,
	description,
	amount,
	time,
}: {
	icon: string;
	title: string;
	description: string;
	amount: string;
	time: string;
}) {
	return (
		<View className='bg-surface p-4 rounded-lg flex-row items-center'>
			<Ionicons name={icon as any} size={24} color='#4CAF50' />
			<View className='flex-1 ml-4'>
				<Text className='font-semibold text-text'>{title}</Text>
				<Text className='text-text-secondary text-sm'>{description}</Text>
				<Text className='text-text-secondary text-xs mt-1'>{time}</Text>
			</View>
			<Text className='font-semibold text-text'>{amount}</Text>
		</View>
	);
}
