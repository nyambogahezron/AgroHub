import { create } from 'zustand';

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
	// ... existing code ...
}));
