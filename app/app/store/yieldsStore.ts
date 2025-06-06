import { create } from 'zustand';

interface Yield {
	id: string;
	date: string;
	crop: string;
	quantity: number;
	unit: string;
	field: string;
}

interface YieldsStore {
	yields: Yield[];
	addYield: (yield_: Yield) => void;
	removeYield: (id: string) => void;
}

export const useYieldsStore = create<YieldsStore>((set) => ({
	yields: [],
	addYield: (yield_) => set((state) => ({ yields: [...state.yields, yield_] })),
	removeYield: (id) =>
		set((state) => ({
			yields: state.yields.filter((yield_) => yield_.id !== id),
		})),
}));
