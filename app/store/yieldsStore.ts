import { create } from 'zustand';

export interface Yield {
	id: string;
	crop: string;
	quantity: number;
	date: string;
	unit: string;
	field: string;
}

export interface YieldsState {
	yields: Yield[];
	addYield: (yieldEntry: Yield) => void;
	removeYield: (id: string) => void;
}

export const useYieldsStore = create<YieldsState>((set) => ({
	yields: [],
	addYield: (yieldEntry: Yield) =>
		set((state: YieldsState) => ({ yields: [...state.yields, yieldEntry] })),
	removeYield: (id: string) =>
		set((state: YieldsState) => ({
			yields: state.yields.filter((y: Yield) => y.id !== id),
		})),
}));
