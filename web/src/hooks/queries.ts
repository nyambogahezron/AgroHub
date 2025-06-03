import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '../store/use-store';
import { Product } from '@/data/products';
import { PriceData } from '@/data/pricing';
import { Testimonial } from '@/data/testimonials';

// Types for API responses
interface ApiResponse<T> {
	data: T;
	message?: string;
	error?: string;
}

// Data type definitions
interface MarketPrice {
	id: string;
	crop: string;
	price: number;
	date: string;
	market: string;
}

interface InventoryItem {
	id: string;
	name: string;
	category: string;
	quantity: number;
	unit: string;
	lastUpdated: string;
}

interface Expense {
	id: string;
	date: string;
	category: string;
	amount: number;
	description: string;
}

interface Yield {
	id: string;
	date: string;
	crop: string;
	quantity: number;
	unit: string;
	field: string;
}

interface Labor {
	id: string;
	name: string;
	role: string;
	hours: number;
	date: string;
	rate: number;
}

// API endpoints (replace with your actual API endpoints)
const API_ENDPOINTS = {
	products: '/api/products',
	priceTrends: '/api/price-trends',
	marketPrices: '/api/market-prices',
	testimonials: '/api/testimonials',
	inventory: '/api/inventory',
	expenses: '/api/expenses',
	yields: '/api/yields',
	labor: '/api/labor',
} as const;

// Products Queries
export function useProducts(filters?: {
	category?: string;
	search?: string;
	location?: string;
	season?: string;
	minPrice?: number;
	maxPrice?: number;
	organic?: boolean;
}) {
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	return useQuery({
		queryKey: ['products', filters],
		queryFn: async () => {
			try {
				setLoading(true);
				const queryParams = new URLSearchParams();
				if (filters) {
					Object.entries(filters).forEach(([key, value]) => {
						if (value !== undefined) {
							queryParams.append(key, value.toString());
						}
					});
				}
				const response = await fetch(
					`${API_ENDPOINTS.products}?${queryParams}`
				);
				if (!response.ok) throw new Error('Failed to fetch products');
				const data: ApiResponse<Product[]> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Failed to fetch products';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
	});
}

export function useProduct(id: string) {
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	return useQuery({
		queryKey: ['product', id],
		queryFn: async () => {
			try {
				setLoading(true);
				const response = await fetch(`${API_ENDPOINTS.products}/${id}`);
				if (!response.ok) throw new Error('Failed to fetch product');
				const data: ApiResponse<Product> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Failed to fetch product';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
	});
}

// Price Trends Queries
export function usePriceTrends(product?: string) {
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	return useQuery({
		queryKey: ['priceTrends', product],
		queryFn: async () => {
			try {
				setLoading(true);
				const url = product
					? `${API_ENDPOINTS.priceTrends}?product=${product}`
					: API_ENDPOINTS.priceTrends;
				const response = await fetch(url);
				if (!response.ok) throw new Error('Failed to fetch price trends');
				const data: ApiResponse<PriceData[]> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: 'Failed to fetch price trends';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
	});
}

// Market Prices Queries
export function useMarketPrices(market?: string) {
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	return useQuery({
		queryKey: ['marketPrices', market],
		queryFn: async () => {
			try {
				setLoading(true);
				const url = market
					? `${API_ENDPOINTS.marketPrices}?market=${market}`
					: API_ENDPOINTS.marketPrices;
				const response = await fetch(url);
				if (!response.ok) throw new Error('Failed to fetch market prices');
				const data: ApiResponse<MarketPrice[]> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: 'Failed to fetch market prices';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
	});
}

// Testimonials Queries
export function useTestimonials(userType?: 'farmer' | 'buyer') {
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	return useQuery({
		queryKey: ['testimonials', userType],
		queryFn: async () => {
			try {
				setLoading(true);
				const url = userType
					? `${API_ENDPOINTS.testimonials}?userType=${userType}`
					: API_ENDPOINTS.testimonials;
				const response = await fetch(url);
				if (!response.ok) throw new Error('Failed to fetch testimonials');
				const data: ApiResponse<Testimonial[]> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: 'Failed to fetch testimonials';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
	});
}

// Inventory Mutations
export function useInventoryMutations() {
	const queryClient = useQueryClient();
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	const addInventoryItem = useMutation({
		mutationFn: async (newItem: Omit<InventoryItem, 'id'>) => {
			try {
				setLoading(true);
				const response = await fetch(API_ENDPOINTS.inventory, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newItem),
				});
				if (!response.ok) throw new Error('Failed to add inventory item');
				const data: ApiResponse<InventoryItem> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: 'Failed to add inventory item';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['inventory'] });
		},
	});

	const updateInventoryItem = useMutation({
		mutationFn: async ({
			id,
			updates,
		}: {
			id: string;
			updates: Partial<InventoryItem>;
		}) => {
			try {
				setLoading(true);
				const response = await fetch(`${API_ENDPOINTS.inventory}/${id}`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updates),
				});
				if (!response.ok) throw new Error('Failed to update inventory item');
				const data: ApiResponse<InventoryItem> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: 'Failed to update inventory item';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['inventory'] });
		},
	});

	return { addInventoryItem, updateInventoryItem };
}

// Expenses Mutations
export function useExpenseMutations() {
	const queryClient = useQueryClient();
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	const addExpense = useMutation({
		mutationFn: async (newExpense: Omit<Expense, 'id'>) => {
			try {
				setLoading(true);
				const response = await fetch(API_ENDPOINTS.expenses, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newExpense),
				});
				if (!response.ok) throw new Error('Failed to add expense');
				const data: ApiResponse<Expense> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Failed to add expense';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['expenses'] });
		},
	});

	return { addExpense };
}

// Yields Mutations
export function useYieldMutations() {
	const queryClient = useQueryClient();
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	const addYield = useMutation({
		mutationFn: async (newYield: Omit<Yield, 'id'>) => {
			try {
				setLoading(true);
				const response = await fetch(API_ENDPOINTS.yields, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newYield),
				});
				if (!response.ok) throw new Error('Failed to add yield');
				const data: ApiResponse<Yield> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Failed to add yield';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['yields'] });
		},
	});

	return { addYield };
}

// Labor Mutations
export function useLaborMutations() {
	const queryClient = useQueryClient();
	const setLoading = useAppStore((state) => state.setLoading);
	const setError = useAppStore((state) => state.setError);

	const addLabor = useMutation({
		mutationFn: async (newLabor: Omit<Labor, 'id'>) => {
			try {
				setLoading(true);
				const response = await fetch(API_ENDPOINTS.labor, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newLabor),
				});
				if (!response.ok) throw new Error('Failed to add labor record');
				const data: ApiResponse<Labor> = await response.json();
				setError(null);
				return data.data;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Failed to add labor record';
				setError(message);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['labor'] });
		},
	});

	return { addLabor };
}
