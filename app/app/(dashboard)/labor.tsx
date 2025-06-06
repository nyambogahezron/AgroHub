import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useLaborStore, type LaborEntry } from '@/store/laborStore';
import { useForm } from '@/hooks/use-form';
import { laborSchema, type LaborFormData } from '@/lib/schemas';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Form } from '@/components/ui/form';
import { Plus, Search, Download, Clock } from 'lucide-react-native';

export default function Labor() {
	const { labor, addLabor } = useLaborStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { form, handleSubmit } = useForm(laborSchema);

	// Filter labor records based on search query
	const filteredLabor = labor.filter((entry: LaborEntry) =>
		entry.worker.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const onSubmit = async (data: LaborFormData) => {
		const newLabor: LaborEntry = {
			id: Date.now().toString(), // Generate a unique ID
			worker: data.name!,
			hours: data.hours!,
			rate: data.rate!,
			date: data.date!,
		};
		addLabor(newLabor);
		setIsModalOpen(false);
		form.reset();
	};

	// Calculate total hours and labor cost
	const totalHours = labor.reduce(
		(total: number, entry: LaborEntry) => total + entry.hours,
		0
	);
	const totalLaborCost = labor.reduce(
		(total: number, entry: LaborEntry) => total + entry.hours * entry.rate,
		0
	);

	// Count workers by role
	const workerCount = new Set(labor.map((entry: LaborEntry) => entry.worker))
		.size;

	const handleExport = () => {
		console.log('Exporting labor logs...');
		alert('Labor logs would be exported as CSV in the full implementation.');
	};

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View className='flex-row justify-between items-center'>
					<View>
						<Text className='text-2xl font-bold tracking-tight'>
							Labor Management
						</Text>
						<Text className='text-muted-foreground'>
							Track worker hours and manage labor costs.
						</Text>
					</View>

					<View className='flex-row gap-2'>
						<TouchableOpacity
							onPress={handleExport}
							className='bg-muted p-2 rounded-lg'
						>
							<Download className='h-4 w-4' />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => setIsModalOpen(true)}
							className='bg-primary p-2 rounded-lg'
						>
							<Plus className='h-4 w-4 text-white' />
						</TouchableOpacity>
					</View>
				</View>

				<View className='flex-row items-center space-x-2 bg-muted p-2 rounded-lg'>
					<Search className='h-4 w-4 text-muted-foreground' />
					<TextInput
						placeholder='Search labor records...'
						value={searchQuery}
						onChangeText={setSearchQuery}
						className='flex-1'
					/>
				</View>

				<View className='space-y-4'>
					<View className='flex-row gap-4'>
						<Card className='flex-1'>
							<View className='p-4'>
								<Text className='text-lg font-medium mb-2'>Workers</Text>
								<Text className='text-3xl font-bold'>{workerCount}</Text>
							</View>
						</Card>

						<Card className='flex-1'>
							<View className='p-4'>
								<Text className='text-lg font-medium mb-2'>Total Hours</Text>
								<Text className='text-3xl font-bold'>{totalHours}</Text>
							</View>
						</Card>
					</View>

					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium mb-2'>
								Recent Labor Records
							</Text>
							<View className='space-y-2'>
								{filteredLabor
									.slice(0, 5)
									.map((entry: LaborEntry, index: number) => (
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
												<Text className='font-medium'>{entry.hours} hours</Text>
												<Text className='text-sm text-muted-foreground'>
													${entry.hours * entry.rate}
												</Text>
											</View>
										</View>
									))}
							</View>
						</View>
					</Card>
				</View>
			</View>

			<Modal
				visible={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title='Log Labor Hours'
			>
				<Form {...form}>
					<View className='space-y-4'>
						<View>
							<Text className='text-sm font-medium mb-1'>Worker Name</Text>
							<Input
								placeholder='Full name'
								value={form.watch('name')}
								onChangeText={(value) => form.setValue('name', value)}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Date</Text>
							<Input
								type='date'
								value={form.watch('date')}
								onChangeText={(value) => form.setValue('date', value)}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Hours Worked</Text>
							<Input
								keyboardType='numeric'
								placeholder='0'
								value={form.watch('hours')?.toString()}
								onChangeText={(value) =>
									form.setValue('hours', parseFloat(value))
								}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Hourly Rate ($)</Text>
							<Input
								keyboardType='numeric'
								placeholder='0.00'
								value={form.watch('rate')?.toString()}
								onChangeText={(value) =>
									form.setValue('rate', parseFloat(value))
								}
							/>
						</View>

						<Button onPress={form.handleSubmit(onSubmit)}>Save</Button>
					</View>
				</Form>
			</Modal>
		</ScrollView>
	);
}
