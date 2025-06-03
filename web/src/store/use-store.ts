import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
	// Add your state properties here
	isLoading: boolean;
	error: string | null;
	// Actions
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	reset: () => void;
}

const initialState = {
	isLoading: false,
	error: null,
};

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
				...initialState,
				setLoading: (loading) => set({ isLoading: loading }),
				setError: (error) => set({ error }),
				reset: () => set(initialState),
			}),
			{
				name: 'app-storage', // unique name for localStorage
			}
		)
	)
);

// Example of a selector hook
export const useAppLoading = () => useAppStore((state) => state.isLoading);
export const useAppError = () => useAppStore((state) => state.error);
