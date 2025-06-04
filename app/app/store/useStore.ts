import { create } from 'zustand';

interface Yield {
	date: string;
	crop: string;
	quantity: number;
	unit: string;
	field: string;
}

interface Store {
	yields: Yield[];
	addYield: (yield_: Yield) => void;
}

export const useStore = create<Store>((set) => ({
	yields: [],
	addYield: (yield_) => set((state) => ({ yields: [...state.yields, yield_] })),
}));
