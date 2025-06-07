import { create } from 'zustand';

interface LaborEntry {
	id: string;
	date: string;
	worker: string;
	hours: number;
	rate: number;
	task: string;
}

interface LaborStore {
	labor: LaborEntry[];
	addEntry: (entry: LaborEntry) => void;
	removeEntry: (id: string) => void;
	updateEntry: (id: string, entry: Partial<LaborEntry>) => void;
}

const useLaborStore = create<LaborStore>((set) => ({
	labor: [],
	addEntry: (entry) => set((state) => ({ labor: [...state.labor, entry] })),
	removeEntry: (id) =>
		set((state) => ({
			labor: state.labor.filter((entry) => entry.id !== id),
		})),
	updateEntry: (id, updatedEntry) =>
		set((state) => ({
			labor: state.labor.map((entry) =>
				entry.id === id ? { ...entry, ...updatedEntry } : entry
			),
		})),
}));

export default useLaborStore;
