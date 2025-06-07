import { create } from 'zustand';

export interface InventoryItem {
	id: string;
	name: string;
	quantity: number;
	unit: string;
	category: string;
	reorderLevel: number;
}

interface InventoryStore {
	inventory: InventoryItem[];
	addItem: (item: InventoryItem) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
	inventory: [],
	addItem: (item) =>
		set((state) => ({ inventory: [...state.inventory, item] })),
	removeItem: (id) =>
		set((state) => ({
			inventory: state.inventory.filter((item) => item.id !== id),
		})),
	updateQuantity: (id, quantity) =>
		set((state) => ({
			inventory: state.inventory.map((item) =>
				item.id === id ? { ...item, quantity } : item
			),
		})),
}));
