import create from 'zustand';

export interface InventoryItem {
	id: string;
	name: string;
	quantity: number;
	unit: string;
}

interface InventoryState {
	inventory: InventoryItem[];
	addItem: (item: InventoryItem) => void;
	removeItem: (id: string) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
	inventory: [],
	addItem: (item) =>
		set((state) => ({ inventory: [...state.inventory, item] })),
	removeItem: (id) =>
		set((state) => ({ inventory: state.inventory.filter((i) => i.id !== id) })),
}));
