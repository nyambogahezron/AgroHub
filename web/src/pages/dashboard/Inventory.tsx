import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useForm } from '@/hooks/use-form';
import { inventorySchema, type InventoryFormData } from '@/lib/schemas';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Package, Plus, Search, AlertTriangle } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';

export default function Inventory() {
	const { inventory, addInventoryItem, updateInventoryItem } = useStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<string | null>(null);

	const { form, handleSubmit } = useForm(inventorySchema);

	// Filter inventory based on search query
	const filteredInventory = inventory.filter(
		(item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.category.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const onSubmit = async (data: InventoryFormData) => {
		if (editingItem) {
			updateInventoryItem(editingItem, data);
			setEditingItem(null);
		} else {
			const newItem = {
				name: data.name!,
				category: data.category!,
				quantity: data.quantity!,
				unit: data.unit!,
				lastUpdated: new Date().toISOString().split('T')[0],
			};
			addInventoryItem(newItem);
		}
		setIsDialogOpen(false);
		form.reset();
	};

	const handleEdit = (item: (typeof inventory)[0]) => {
		setEditingItem(item.id);
		form.reset({
			name: item.name,
			category: item.category,
			quantity: item.quantity,
			unit: item.unit,
			lastUpdated: item.lastUpdated,
		});
		setIsDialogOpen(true);
	};

	// Calculate low stock items
	const lowStockItems = inventory.filter((item) => item.quantity < 100);

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Inventory Management
					</h1>
					<p className='text-muted-foreground'>
						Track and manage your farm inventory.
					</p>
				</div>

				<Dialog
					open={isDialogOpen}
					onOpenChange={(open) => {
						setIsDialogOpen(open);
						if (!open) {
							setEditingItem(null);
							form.reset();
						}
					}}
				>
					<DialogTrigger asChild>
						<Button>
							<Plus className='h-4 w-4 mr-2' />
							Add Item
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingItem ? 'Edit Item' : 'Add New Item'}
							</DialogTitle>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-4'
							>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Item Name</FormLabel>
											<FormControl>
												<Input placeholder='Item name' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='category'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select category' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='Seeds'>Seeds</SelectItem>
													<SelectItem value='Fertilizer'>Fertilizer</SelectItem>
													<SelectItem value='Pesticides'>Pesticides</SelectItem>
													<SelectItem value='Fuel'>Fuel</SelectItem>
													<SelectItem value='Equipment'>Equipment</SelectItem>
													<SelectItem value='Other'>Other</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='quantity'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quantity</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='0'
													{...field}
													onChange={(e) =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='unit'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Unit</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select unit' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='kg'>Kilograms (kg)</SelectItem>
													<SelectItem value='liters'>Liters</SelectItem>
													<SelectItem value='pcs'>Pieces</SelectItem>
													<SelectItem value='units'>Units</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<Button type='submit'>
										{editingItem ? 'Update Item' : 'Add Item'}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			{lowStockItems.length > 0 && (
				<Card className='border-amber-200 bg-amber-50'>
					<CardHeader className='pb-2'>
						<CardTitle className='text-md font-medium text-amber-800'>
							Low Stock Alert
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex flex-wrap gap-2'>
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
						</div>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-md font-medium'>Inventory Items</CardTitle>
					<div className='relative'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Search inventory...'
							className='pl-8'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Item</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Last Updated</TableHead>
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredInventory.length > 0 ? (
								filteredInventory.map((item) => (
									<TableRow key={item.id}>
										<TableCell className='font-medium'>
											<div className='flex items-center'>
												<Package className='h-4 w-4 mr-2 text-muted-foreground' />
												{item.name}
											</div>
										</TableCell>
										<TableCell>{item.category}</TableCell>
										<TableCell>
											<div className='flex items-center'>
												{item.quantity} {item.unit}
												{item.quantity < 100 && (
													<AlertTriangle className='h-4 w-4 ml-2 text-amber-500' />
												)}
											</div>
										</TableCell>
										<TableCell>{item.lastUpdated}</TableCell>
										<TableCell className='text-right'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => handleEdit(item)}
											>
												Edit
											</Button>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={5}
										className='text-center text-muted-foreground'
									>
										No inventory items found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
