import { create } from 'zustand';

interface Expense {
	id: string;
	date: string;
	description: string;
	amount: number;
	category: string;
}

interface ExpensesStore {
	expenses: Expense[];
	addExpense: (expense: Expense) => void;
	removeExpense: (id: string) => void;
}

const useExpensesStore = create<ExpensesStore>((set) => ({
	expenses: [],
	addExpense: (expense) =>
		set((state) => ({ expenses: [...state.expenses, expense] })),
	removeExpense: (id) =>
		set((state) => ({
			expenses: state.expenses.filter((expense) => expense.id !== id),
		})),
}));

export default useExpensesStore;
