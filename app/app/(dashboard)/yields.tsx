import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useYieldsStore } from '@/store/yieldsStore';
import { useForm } from '@/hooks/use-form';
import { yieldSchema, type YieldFormData } from '@/lib/schemas';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Form } from '@/components/ui/form';
import { BarChart3, Plus, Search } from 'lucide-react-native';

export default function Yields() {
	const { yields, addYield } = useYieldsStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { form, handleSubmit } = useForm(yieldSchema);

	// Filter yields based on search query
	const filteredYields = yields.filter(
		(yieldEntry) =>
			yieldEntry.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
			yieldEntry.field.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const onSubmit = async (data: YieldFormData) => {
		const newYield = {
			id: Date.now().toString(), // Generate a unique ID
			date: data.date!,
			crop: data.crop!,
			quantity: data.quantity!,
			unit: data.unit!,
			field: data.field!,
		};
		addYield(newYield);
		setIsModalOpen(false);
		form.reset();
	};

	// Process data for charts - group by crop
	const cropTotals: Record<string, number> = {};
	yields.forEach((yieldEntry) => {
		if (cropTotals[yieldEntry.crop]) {
			cropTotals[yieldEntry.crop] += yieldEntry.quantity;
		} else {
			cropTotals[yieldEntry.crop] = yieldEntry.quantity;
		}
	});

	const chartData = Object.entries(cropTotals).map(([name, value]) => ({
		name,
		value,
	}));

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View className='flex-row justify-between items-center'>
					<View>
						<Text className='text-2xl font-bold tracking-tight'>
							Yield Management
						</Text>
						<Text className='text-muted-foreground'>
							Track and analyze your crop yields.
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => setIsModalOpen(true)}
						className='bg-primary p-2 rounded-lg'
					>
						<Plus className='h-4 w-4 text-white' />
					</TouchableOpacity>
				</View>

				<View className='flex-row items-center space-x-2 bg-muted p-2 rounded-lg'>
					<Search className='h-4 w-4 text-muted-foreground' />
					<TextInput
						placeholder='Search yields...'
						value={searchQuery}
						onChangeText={setSearchQuery}
						className='flex-1'
					/>
				</View>

				<View className='space-y-4'>
					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium mb-2'>Yield Breakdown</Text>
							<View className='h-[240px] items-center justify-center'>
								<View className='items-center'>
									<BarChart3 className='h-10 w-10 mb-2' />
									<Text className='text-muted-foreground'>
										Yield visualization
									</Text>
									<Text className='text-sm text-muted-foreground'>
										(Showing real data in final implementation)
									</Text>
								</View>
							</View>
						</View>
					</Card>

					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium mb-2'>Recent Yields</Text>
							<View className='space-y-2'>
								{filteredYields.slice(0, 5).map((yieldEntry, index) => (
									<View
										key={index}
										className='flex-row justify-between items-center p-2 bg-muted/50 rounded-lg'
									>
										<View>
											<Text className='font-medium'>{yieldEntry.crop}</Text>
											<Text className='text-sm text-muted-foreground'>
												{yieldEntry.field} Field
											</Text>
										</View>
										<View className='items-end'>
											<Text className='font-medium'>
												{yieldEntry.quantity} {yieldEntry.unit}
											</Text>
											<Text className='text-sm text-muted-foreground'>
												{new Date(yieldEntry.date).toLocaleDateString()}
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
				title='Add New Yield'
			>
				<Form {...form}>
					<View className='space-y-4'>
						<View>
							<Text className='text-sm font-medium mb-1'>Date</Text>
							<Input
								type='date'
								value={form.watch('date')}
								onChangeText={(value) => form.setValue('date', value)}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Crop</Text>
							<Input
								placeholder='Crop name'
								value={form.watch('crop')}
								onChangeText={(value) => form.setValue('crop', value)}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Quantity</Text>
							<Input
								keyboardType='numeric'
								placeholder='0'
								value={form.watch('quantity')?.toString()}
								onChangeText={(value) =>
									form.setValue('quantity', parseFloat(value))
								}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Unit</Text>
							<Select
								value={form.watch('unit')}
								onValueChange={(value) => form.setValue('unit', value)}
								items={[
									{ label: 'Kilograms (kg)', value: 'kg' },
									{ label: 'Tons', value: 'ton' },
									{ label: 'Bushels', value: 'bushel' },
								]}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Field</Text>
							<Select
								value={form.watch('field')}
								onValueChange={(value) => form.setValue('field', value)}
								items={[
									{ label: 'North Field', value: 'North' },
									{ label: 'South Field', value: 'South' },
									{ label: 'East Field', value: 'East' },
									{ label: 'West Field', value: 'West' },
								]}
							/>
						</View>

						<Button onPress={form.handleSubmit(onSubmit)}>Save Yield</Button>
					</View>
				</Form>
			</Modal>
		</ScrollView>
	);
}
