import { create } from 'zustand';

export interface Expense {
	id: string;
	amount: number;
	description: string;
}

interface ExpensesState {
	expenses: Expense[];
	addExpense: (expense: Expense) => void;
	removeExpense: (id: string) => void;
}

export const useExpensesStore = create<ExpensesState>((set) => ({
	expenses: [],
	addExpense: (expense) =>
		set((state) => ({ expenses: [...state.expenses, expense] })),
	removeExpense: (id) =>
		set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
}));
