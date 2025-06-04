import { create } from 'zustand';

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	location: string;
	seasonality: string[];
	organic: boolean;
	image: string;
	rating: number;
	reviews: number;
	unit: string;
	featured: boolean;
}

export interface FilterOptions {
	search: string;
	category: string | null;
	location: string | null;
	season: string | null;
	minPrice: number;
	maxPrice: number;
	organic: boolean;
}

interface MarketplaceStore {
	products: Product[];
	filteredProducts: Product[];
	viewMode: 'grid' | 'list';
	filters: FilterOptions;
	setProducts: (products: Product[]) => void;
	setViewMode: (mode: 'grid' | 'list') => void;
	setFilters: (filters: FilterOptions) => void;
	applyFilters: () => void;
}

export const useMarketplaceStore = create<MarketplaceStore>((set, get) => ({
	products: [],
	filteredProducts: [],
	viewMode: 'grid',
	filters: {
		search: '',
		category: null,
		location: null,
		season: null,
		minPrice: 0,
		maxPrice: 1000,
		organic: false,
	},

	setProducts: (products) => set({ products, filteredProducts: products }),

	setViewMode: (viewMode) => set({ viewMode }),

	setFilters: (filters) => set({ filters }),

	applyFilters: () => {
		const { products, filters } = get();
		let filtered = [...products];

		// Filter by search text
		if (filters.search) {
			const searchTerm = filters.search.toLowerCase();
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(searchTerm) ||
					product.description.toLowerCase().includes(searchTerm)
			);
		}

		// Filter by category
		if (filters.category) {
			filtered = filtered.filter(
				(product) => product.category === filters.category
			);
		}

		// Filter by location
		if (filters.location) {
			filtered = filtered.filter(
				(product) => product.location === filters.location
			);
		}

		// Filter by season
		if (filters.season) {
			filtered = filtered.filter((product) =>
				product.seasonality.includes(filters.season as string)
			);
		}

		// Filter by price range
		filtered = filtered.filter(
			(product) =>
				product.price >= filters.minPrice && product.price <= filters.maxPrice
		);

		// Filter by organic
		if (filters.organic) {
			filtered = filtered.filter((product) => product.organic);
		}

		set({ filteredProducts: filtered });
	},
}));
