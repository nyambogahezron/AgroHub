import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useInventoryStore, type InventoryItem } from '@/store/inventoryStore';
import { useForm } from '@/hooks/use-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Form } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, AlertTriangle } from 'lucide-react-native';
import { z } from 'zod';

const inventorySchema = z.object({
	name: z.string().min(1, 'Name is required'),
	quantity: z.number().min(0, 'Quantity must be positive'),
	unit: z.string().min(1, 'Unit is required'),
	category: z.string().min(1, 'Category is required'),
});

type InventoryFormData = z.infer<typeof inventorySchema>;

export default function Inventory() {
	const { inventory, addItem } = useInventoryStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<string | null>(null);

	const { form, handleSubmit } = useForm(inventorySchema);

	// Filter inventory based on search query
	const filteredInventory = inventory.filter((item: InventoryItem) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const onSubmit = async (data: InventoryFormData) => {
		if (editingItem) {
			// TODO: Implement update functionality in store
			setEditingItem(null);
		} else {
			const newItem: InventoryItem = {
				id: Date.now().toString(),
				name: data.name,
				quantity: data.quantity,
				unit: data.unit,
				category: data.category,
				minQuantity: 100,
				lastUpdated: new Date().toISOString(),
			};
			addItem(newItem);
		}
		setIsModalOpen(false);
		form.reset();
	};

	const handleEdit = (item: InventoryItem) => {
		setEditingItem(item.id);
		form.setValue('name', item.name);
		form.setValue('quantity', item.quantity);
		form.setValue('unit', item.unit);
		form.setValue('category', item.category);
		setIsModalOpen(true);
	};

	// Calculate low stock items
	const lowStockItems = inventory.filter(
		(item: InventoryItem) => item.quantity < 100
	);

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View className='flex-row justify-between items-center'>
					<View>
						<Text className='text-2xl font-bold tracking-tight'>
							Inventory Management
						</Text>
						<Text className='text-muted-foreground'>
							Track and manage your farm inventory.
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
						placeholder='Search inventory...'
						value={searchQuery}
						onChangeText={setSearchQuery}
						className='flex-1'
					/>
				</View>

				{lowStockItems.length > 0 && (
					<Card className='border-amber-200 bg-amber-50'>
						<View className='p-4'>
							<Text className='text-lg font-medium text-amber-800 mb-2'>
								Low Stock Alert
							</Text>
							<View className='flex-row flex-wrap gap-2'>
								{lowStockItems.map((item) => (
									<Badge
										key={item.id}
										variant='outline'
										className='bg-amber-100 text-amber-800'
									>
										<AlertTriangle className='h-3 w-3 mr-1' />
										{item.name}: {item.quantity} {item.unit}
									</Badge>
								))}
							</View>
						</View>
					</Card>
				)}

				<View className='space-y-4'>
					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium mb-2'>Inventory Items</Text>
							<View className='space-y-2'>
								{filteredInventory.map((item) => (
									<TouchableOpacity
										key={item.id}
										onPress={() => handleEdit(item)}
										className='flex-row justify-between items-center p-2 bg-muted/50 rounded-lg'
									>
										<View>
											<Text className='font-medium'>{item.name}</Text>
											<Text className='text-sm text-muted-foreground'>
												{item.category}
											</Text>
										</View>
										<View className='items-end'>
											<Text className='font-medium'>
												{item.quantity} {item.unit}
											</Text>
											<Text className='text-sm text-muted-foreground'>
												Last updated: {item.lastUpdated}
											</Text>
										</View>
									</TouchableOpacity>
								))}
							</View>
						</View>
					</Card>
				</View>
			</View>

			<Modal
				visible={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setEditingItem(null);
					form.reset();
				}}
				title={editingItem ? 'Edit Item' : 'Add New Item'}
			>
				<Form {...form}>
					<View className='space-y-4'>
						<View>
							<Text className='text-sm font-medium mb-1'>Item Name</Text>
							<Input
								placeholder='Item name'
								value={form.watch('name')}
								onChangeText={(value) => form.setValue('name', value)}
							/>
						</View>

						<View>
							<Text className='text-sm font-medium mb-1'>Category</Text>
							<Select
								value={form.watch('category')}
								onValueChange={(value) => form.setValue('category', value)}
								items={[
									{ label: 'Seeds', value: 'Seeds' },
									{ label: 'Fertilizer', value: 'Fertilizer' },
									{ label: 'Pesticides', value: 'Pesticides' },
									{ label: 'Fuel', value: 'Fuel' },
									{ label: 'Equipment', value: 'Equipment' },
									{ label: 'Other', value: 'Other' },
								]}
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
									{ label: 'Liters', value: 'liters' },
									{ label: 'Pieces', value: 'pcs' },
									{ label: 'Units', value: 'units' },
								]}
							/>
						</View>

						<Button onPress={form.handleSubmit(onSubmit)}>
							{editingItem ? 'Update Item' : 'Add Item'}
						</Button>
					</View>
				</Form>
			</Modal>
		</ScrollView>
	);
}
