import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useLaborStore, type LaborEntry } from '@/store/laborStore';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Search, RefreshCw } from 'lucide-react-native';

function Market() {
	const { labor } = useLaborStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedWorker, setSelectedWorker] = useState('all');
	const [selectedDate, setSelectedDate] = useState('all');

	// Filter labor entries based on search and filters
	const filteredLabor = labor.filter((entry: LaborEntry) => {
		const matchesSearch = entry.worker
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesWorker =
			selectedWorker === 'all' || entry.worker === selectedWorker;
		const matchesDate = selectedDate === 'all' || entry.date === selectedDate;

		return matchesSearch && matchesWorker && matchesDate;
	});

	// Calculate total labor cost
	const totalCost = filteredLabor.reduce(
		(sum: number, entry: LaborEntry) => sum + entry.hours * entry.rate,
		0
	);

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View className='flex-row justify-between items-center'>
					<View>
						<Text className='text-2xl font-bold tracking-tight'>
							Labor Management
						</Text>
						<Text className='text-muted-foreground'>
							Track and manage labor costs.
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => console.log('Refresh')}
						className='bg-muted p-2 rounded-lg'
					>
						<RefreshCw className='h-4 w-4' />
					</TouchableOpacity>
				</View>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-2'>Labor Summary</Text>
						<View className='flex-row justify-between items-center'>
							<Text className='text-2xl font-bold'>
								${totalCost.toFixed(2)}
							</Text>
							<Text className='text-muted-foreground'>Total Cost</Text>
						</View>
					</View>
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-2'>Labor Entries</Text>
						<View className='space-y-2'>
							<View className='flex-row items-center space-x-2 bg-muted p-2 rounded-lg'>
								<Search className='h-4 w-4 text-muted-foreground' />
								<TextInput
									placeholder='Search workers...'
									value={searchQuery}
									onChangeText={setSearchQuery}
									className='flex-1'
								/>
							</View>
							<Select
								value={selectedWorker}
								onValueChange={setSelectedWorker}
								items={[
									{ label: 'All Workers', value: 'all' },
									...Array.from(
										new Set(labor.map((l: LaborEntry) => l.worker))
									).map((worker) => ({
										label: worker as string,
										value: worker as string,
									})),
								]}
							/>
						</View>

						<View className='mt-4 space-y-2'>
							{filteredLabor.length > 0 ? (
								filteredLabor.map((entry: LaborEntry) => (
									<View
										key={entry.id}
										className='flex-row justify-between items-center p-2 bg-muted/50 rounded-lg'
									>
										<View>
											<Text className='font-medium'>{entry.worker}</Text>
											<Text className='text-sm text-muted-foreground'>
												{entry.date}
											</Text>
										</View>
										<View className='items-end'>
											<Text className='font-medium'>
												${(entry.hours * entry.rate).toFixed(2)}
											</Text>
											<Text className='text-sm text-muted-foreground'>
												{entry.hours} hours @ ${entry.rate}/hr
											</Text>
										</View>
									</View>
								))
							) : (
								<Text className='text-center text-muted-foreground'>
									No labor entries found
								</Text>
							)}
						</View>
					</View>
				</Card>
			</View>
		</ScrollView>
	);
}

export default Market;
