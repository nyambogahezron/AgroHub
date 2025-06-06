import { View, Text, ScrollView } from 'react-native';
import { useExpensesStore } from '@/store/expensesStore';
import { useYieldsStore } from '@/store/yieldsStore';
import { useInventoryStore, type InventoryItem } from '@/store/inventoryStore';
import { useLaborStore } from '@/store/laborStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { YieldChart } from '@/components/dashboard/YieldChart';
import { DollarSign, Sprout, Package, Users } from 'lucide-react-native';

export default function Dashboard() {
	const expenses = useExpensesStore(
		(state: { expenses: Array<{ amount: number }> }) => state.expenses
	);
	const yields = useYieldsStore(
		(state: { yields: Array<{ quantity: number }> }) => state.yields
	);
	const inventory = useInventoryStore(
		(state: { inventory: InventoryItem[] }) => state.inventory
	);
	const labor = useLaborStore(
		(state: { labor: Array<{ hours: number; rate: number }> }) => state.labor
	);

	// Calculate total expenses
	const totalExpenses = expenses.reduce(
		(total: number, expense: { amount: number }) => total + expense.amount,
		0
	);

	// Calculate total yield
	const totalYield = yields.reduce(
		(total: number, yieldEntry: { quantity: number }) =>
			total + yieldEntry.quantity,
		0
	);

	// Calculate low stock items
	const lowStockItems = inventory.filter(
		(item: InventoryItem) => item.quantity < 100
	).length;

	// Calculate total labor cost
	const totalLaborCost = labor.reduce(
		(total: number, entry: { hours: number; rate: number }) =>
			total + entry.hours * entry.rate,
		0
	);

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View>
					<Text className='text-2xl font-bold tracking-tight'>Dashboard</Text>
					<Text className='text-muted-foreground'>
						Welcome to your farm management dashboard.
					</Text>
				</View>

				<View className='flex-row flex-wrap gap-4'>
					<StatCard
						title='Total Expenses'
						value={`$${totalExpenses}`}
						icon={DollarSign}
						description='This month'
						trend={{ value: 12, positive: false }}
					/>
					<StatCard
						title='Total Yield'
						value={`${totalYield} kg`}
						icon={Sprout}
						description='This month'
						trend={{ value: 18, positive: true }}
					/>
					<StatCard
						title='Low Stock Items'
						value={lowStockItems.toString()}
						icon={Package}
						description='Items needing restock'
					/>
					<StatCard
						title='Labor Cost'
						value={`$${totalLaborCost}`}
						icon={Users}
						description='This week'
						trend={{ value: 5, positive: false }}
					/>
				</View>

				<View className='space-y-4'>
					<WeatherCard />
					<View className='space-y-4'>
						<View className='bg-primary/10 p-4 rounded-lg'>
							<Text className='font-medium'>Upcoming Tasks</Text>
							<View className='mt-2 space-y-2'>
								<View className='flex-row justify-between items-center'>
									<Text>Fertilize North Field</Text>
									<Text className='text-muted-foreground'>Due Today</Text>
								</View>
								<View className='flex-row justify-between items-center'>
									<Text>Irrigation Check</Text>
									<Text className='text-muted-foreground'>Due Tomorrow</Text>
								</View>
								<View className='flex-row justify-between items-center'>
									<Text>Equipment Maintenance</Text>
									<Text className='text-muted-foreground'>April 18</Text>
								</View>
							</View>
						</View>
						<View className='bg-accent p-4 rounded-lg'>
							<Text className='font-medium'>Alerts</Text>
							<View className='mt-2 space-y-2'>
								<View className='flex-row items-center'>
									<Text className='text-amber-600'>
										Low Corn Seeds inventory
									</Text>
								</View>
								<View className='flex-row items-center'>
									<Text className='text-blue-600'>
										Rainfall expected tomorrow
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				<View className='space-y-4'>
					<ExpenseChart />
					<YieldChart />
				</View>
			</View>
		</ScrollView>
	);
}
