import create from 'zustand';

export interface LaborEntry {
	id: string;
	worker: string;
	hours: number;
	rate: number;
	date: string;
}

interface LaborState {
	labor: LaborEntry[];
	addLabor: (entry: LaborEntry) => void;
	removeLabor: (id: string) => void;
}

export const useLaborStore = create<LaborState>((set) => ({
	labor: [],
	addLabor: (entry) => set((state) => ({ labor: [...state.labor, entry] })),
	removeLabor: (id) =>
		set((state) => ({ labor: state.labor.filter((l) => l.id !== id) })),
}));
