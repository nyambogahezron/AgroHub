import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useForm } from '@/hooks/use-form';
import { yieldSchema, type YieldFormData } from '@/lib/schemas';
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
import { BarChart, LineChart } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, Plus, Search, BarChart3 } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export default function Yields() {
	const { yields, addYield } = useStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { form, handleSubmit } = useForm(yieldSchema);

	// Filter yields based on search query
	const filteredYields = yields.filter(
		(yieldEntry) =>
			yieldEntry.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
			yieldEntry.field.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const onSubmit = async (data: YieldFormData) => {
		const newYield = {
			date: data.date!,
			crop: data.crop!,
			quantity: data.quantity!,
			unit: data.unit!,
			field: data.field!,
		};
		addYield(newYield);
		setIsDialogOpen(false);
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
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Yield Management
					</h1>
					<p className='text-muted-foreground'>
						Track and analyze your crop yields.
					</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className='h-4 w-4 mr-2' />
							Add Yield
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Yield</DialogTitle>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-4'
							>
								<FormField
									control={form.control}
									name='date'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date</FormLabel>
											<FormControl>
												<Input type='date' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='crop'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Crop</FormLabel>
											<FormControl>
												<Input placeholder='Crop name' {...field} />
											</FormControl>
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
													<SelectItem value='ton'>Tons</SelectItem>
													<SelectItem value='bushel'>Bushels</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='field'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Field</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select field' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='North'>North Field</SelectItem>
													<SelectItem value='South'>South Field</SelectItem>
													<SelectItem value='East'>East Field</SelectItem>
													<SelectItem value='West'>West Field</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<Button type='submit'>Save Yield</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-md font-medium'>
							Yield Breakdown
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='h-[240px] flex items-center justify-center'>
							<div className='text-center text-muted-foreground'>
								<BarChart3 className='h-10 w-10 mx-auto mb-2' />
								<p>Yield visualization</p>
								<p className='text-sm'>
									(Showing real data in final implementation)
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-md font-medium'>
							Productivity Metrics
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue='by-crop'>
							<TabsList className='mb-4'>
								<TabsTrigger value='by-crop'>By Crop</TabsTrigger>
								<TabsTrigger value='by-field'>By Field</TabsTrigger>
							</TabsList>
							<TabsContent value='by-crop'>
								<div className='space-y-2'>
									{Object.entries(cropTotals).map(([crop, total]) => (
										<div
											key={crop}
											className='flex items-center justify-between'
										>
											<div className='flex items-center'>
												<Sprout className='h-4 w-4 mr-2 text-farm-green' />
												<span>{crop}</span>
											</div>
											<span className='font-medium'>{total} kg</span>
										</div>
									))}
								</div>
							</TabsContent>
							<TabsContent value='by-field'>
								<p className='text-muted-foreground text-center py-8'>
									Field productivity analysis will be available in the next
									update.
								</p>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-md font-medium'>Yield History</CardTitle>
					<div className='relative'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Search yields...'
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
								<TableHead>Date</TableHead>
								<TableHead>Crop</TableHead>
								<TableHead>Field</TableHead>
								<TableHead className='text-right'>Quantity</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredYields.length > 0 ? (
								filteredYields.map((yieldEntry) => (
									<TableRow key={yieldEntry.id}>
										<TableCell>{yieldEntry.date}</TableCell>
										<TableCell>
											<div className='flex items-center'>
												<Sprout className='h-4 w-4 mr-2 text-muted-foreground' />
												{yieldEntry.crop}
											</div>
										</TableCell>
										<TableCell>{yieldEntry.field}</TableCell>
										<TableCell className='text-right font-medium'>
											{yieldEntry.quantity} {yieldEntry.unit}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={4}
										className='text-center text-muted-foreground'
									>
										No yields found
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
