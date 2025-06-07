import { create } from 'zustand';

interface Yield {
	id: string;
	date: string;
	crop: string;
	quantity: number;
	unit: string;
}

interface YieldsStore {
	yields: Yield[];
	addYield: (yieldEntry: Yield) => void;
	removeYield: (id: string) => void;
}

const useYieldsStore = create<YieldsStore>((set) => ({
	yields: [],
	addYield: (yieldEntry) =>
		set((state) => ({ yields: [...state.yields, yieldEntry] })),
	removeYield: (id) =>
		set((state) => ({
			yields: state.yields.filter((yieldEntry) => yieldEntry.id !== id),
		})),
}));

export default useYieldsStore;
