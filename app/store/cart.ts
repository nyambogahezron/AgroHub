import { create } from 'zustand';
import { Product } from './marketplace';

interface CartItem {
	product: Product;
	quantity: number;
}

interface CartStore {
	items: CartItem[];
	addItem: (product: Product, quantity?: number) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getTotal: () => number;
	getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
	items: [],

	addItem: (product, quantity = 1) => {
		set((state) => {
			const existingItem = state.items.find(
				(item) => item.product.id === product.id
			);

			if (existingItem) {
				return {
					items: state.items.map((item) =>
						item.product.id === product.id
							? { ...item, quantity: item.quantity + quantity }
							: item
					),
				};
			}

			return {
				items: [...state.items, { product, quantity }],
			};
		});
	},

	removeItem: (productId) => {
		set((state) => ({
			items: state.items.filter((item) => item.product.id !== productId),
		}));
	},

	updateQuantity: (productId, quantity) => {
		set((state) => ({
			items: state.items.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item
			),
		}));
	},

	clearCart: () => {
		set({ items: [] });
	},

	getTotal: () => {
		return get().items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	},

	getItemCount: () => {
		return get().items.reduce((count, item) => count + item.quantity, 0);
	},
}));
