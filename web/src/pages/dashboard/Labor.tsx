import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useForm } from '@/hooks/use-form';
import { laborSchema, type LaborFormData } from '@/lib/schemas';
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
import { Users, Plus, Search, Download, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export default function Labor() {
	const { labor, addLabor } = useStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { form, handleSubmit } = useForm(laborSchema);

	// Filter labor records based on search query
	const filteredLabor = labor.filter(
		(entry) =>
			entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			entry.role.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const onSubmit = async (data: LaborFormData) => {
		const newLabor = {
			name: data.name!,
			role: data.role!,
			hours: data.hours!,
			date: data.date!,
			rate: data.rate!,
		};
		addLabor(newLabor);
		setIsDialogOpen(false);
		form.reset();
	};

	// Calculate total hours and labor cost
	const totalHours = labor.reduce((total, entry) => total + entry.hours, 0);
	const totalLaborCost = labor.reduce(
		(total, entry) => total + entry.hours * entry.rate,
		0
	);

	// Count workers by role
	const roleCount: Record<string, number> = {};
	labor.forEach((entry) => {
		if (roleCount[entry.role]) {
			roleCount[entry.role]++;
		} else {
			roleCount[entry.role] = 1;
		}
	});

	// Simulate export function (would connect to actual export in real app)
	const handleExport = () => {
		console.log('Exporting labor logs...');
		// In a real app, this would generate and download a CSV or Excel file
		alert('Labor logs would be exported as CSV in the full implementation.');
	};

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Labor Management
					</h1>
					<p className='text-muted-foreground'>
						Track worker hours and manage labor costs.
					</p>
				</div>

				<div className='flex gap-2'>
					<Button variant='outline' onClick={handleExport}>
						<Download className='h-4 w-4 mr-2' />
						Export
					</Button>

					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className='h-4 w-4 mr-2' />
								Add Labor
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Log Labor Hours</DialogTitle>
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
												<FormLabel>Worker Name</FormLabel>
												<FormControl>
													<Input placeholder='Full name' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='role'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Role</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select role' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value='Harvester'>Harvester</SelectItem>
														<SelectItem value='Field Worker'>
															Field Worker
														</SelectItem>
														<SelectItem value='Equipment Operator'>
															Equipment Operator
														</SelectItem>
														<SelectItem value='Supervisor'>
															Supervisor
														</SelectItem>
														<SelectItem value='Other'>Other</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

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
										name='hours'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Hours Worked</FormLabel>
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
										name='rate'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Hourly Rate ($)</FormLabel>
												<FormControl>
													<Input
														type='number'
														placeholder='0.00'
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

									<DialogFooter>
										<Button type='submit'>Save</Button>
									</DialogFooter>
								</form>
							</Form>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className='grid gap-6 md:grid-cols-3'>
				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-md font-medium'>Workers</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-3xl font-bold'>
							{new Set(labor.map((entry) => entry.name)).size}
						</div>
						<p className='text-sm text-muted-foreground'>
							Across {Object.keys(roleCount).length} different roles
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-md font-medium'>Total Hours</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-3xl font-bold'>{totalHours}</div>
						<p className='text-sm text-muted-foreground'>Logged this week</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-md font-medium'>Labor Cost</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-3xl font-bold'>${totalLaborCost}</div>
						<p className='text-sm text-muted-foreground'>
							Based on current rates
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-md font-medium'>Worker Roles</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-wrap gap-2'>
						{Object.entries(roleCount).map(([role, count]) => (
							<Badge key={role} variant='outline' className='bg-muted/50'>
								<Users className='h-3 w-3 mr-1' /> {role}: {count}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-md font-medium'>Labor Logs</CardTitle>
					<div className='relative'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Search workers or roles...'
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
								<TableHead>Worker</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Date</TableHead>
								<TableHead className='text-center'>Hours</TableHead>
								<TableHead className='text-right'>Cost</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredLabor.length > 0 ? (
								filteredLabor.map((entry) => (
									<TableRow key={entry.id}>
										<TableCell className='font-medium'>{entry.name}</TableCell>
										<TableCell>
											<div className='flex items-center'>
												<Users className='h-4 w-4 mr-2 text-muted-foreground' />
												{entry.role}
											</div>
										</TableCell>
										<TableCell>{entry.date}</TableCell>
										<TableCell className='text-center'>
											<div className='flex items-center justify-center'>
												<Clock className='h-4 w-4 mr-1 text-muted-foreground' />
												{entry.hours}
											</div>
										</TableCell>
										<TableCell className='text-right font-medium'>
											${(entry.hours * entry.rate).toFixed(2)}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={5}
										className='text-center text-muted-foreground'
									>
										No labor records found
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
