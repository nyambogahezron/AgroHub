import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useForm } from '@/hooks/use-form';
import { expenseSchema, type ExpenseFormData } from '@/lib/schemas';
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
import { DollarSign, Plus, Search } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export default function Expenses() {
	const { expenses, addExpense } = useStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { form, handleSubmit } = useForm(expenseSchema);

	// Filter expenses based on search query
	const filteredExpenses = expenses.filter(
		(expense) =>
			expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			expense.category.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const onSubmit = async (data: ExpenseFormData) => {
		const newExpense = {
			date: data.date!,
			category: data.category!,
			amount: data.amount!,
			description: data.description!,
		};
		addExpense(newExpense);
		setIsDialogOpen(false);
		form.reset();
	};

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>Expense Tracker</h1>
					<p className='text-muted-foreground'>
						Track and manage your farm expenses.
					</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className='h-4 w-4 mr-2' />
							Add Expense
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Expense</DialogTitle>
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
													<SelectItem value='Labor'>Labor</SelectItem>
													<SelectItem value='Other'>Other</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='amount'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount ($)</FormLabel>
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

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input
													placeholder='Description of the expense'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter>
									<Button type='submit'>Save Expense</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-md font-medium'>Expense History</CardTitle>
					<div className='relative'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Search expenses...'
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
								<TableHead>Category</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className='text-right'>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredExpenses.length > 0 ? (
								filteredExpenses.map((expense) => (
									<TableRow key={expense.id}>
										<TableCell>{expense.date}</TableCell>
										<TableCell>
											<div className='flex items-center'>
												<DollarSign className='h-4 w-4 mr-2 text-muted-foreground' />
												{expense.category}
											</div>
										</TableCell>
										<TableCell>{expense.description}</TableCell>
										<TableCell className='text-right font-medium'>
											${expense.amount}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={4}
										className='text-center text-muted-foreground'
									>
										No expenses found
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
