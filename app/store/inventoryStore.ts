import { create } from 'zustand';

export interface InventoryItem {
	id: string;
	name: string;
	quantity: number;
	unit: string;
}

export interface InventoryState {
	inventory: InventoryItem[];
	addItem: (item: InventoryItem) => void;
	removeItem: (id: string) => void;
}

export const useInventoryStore = create<InventoryState>()((set) => ({
	inventory: [],
	addItem: (item: InventoryItem) =>
		set((state: InventoryState) => ({ inventory: [...state.inventory, item] })),
	removeItem: (id: string) =>
		set((state: InventoryState) => ({
			inventory: state.inventory.filter((i: InventoryItem) => i.id !== id),
		})),
}));
