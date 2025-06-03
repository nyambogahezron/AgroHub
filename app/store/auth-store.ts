import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'buyer' | 'farmer' | 'admin';

interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

interface AuthActions {
	login: (email: string, password: string) => Promise<void>;
	register: (data: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}) => Promise<void>;
	logout: () => void;
	requestPasswordReset: (email: string) => Promise<void>;
	resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

const API_URL = 'http://localhost:5000/api/auth'; // Update this with your actual API URL

export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set) => ({
			...initialState,

			login: async (email: string, password: string) => {
				try {
					set({ isLoading: true, error: null });
					const response = await fetch(`${API_URL}/login`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email, password }),
					});

					if (!response.ok) {
						const error = await response.json();
						throw new Error(error.message || 'Login failed');
					}

					const data = await response.json();
					set({
						user: data.user,
						token: data.token,
						isAuthenticated: true,
						isLoading: false,
					});
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : 'Failed to login',
						isLoading: false,
					});
					throw error;
				}
			},

			register: async (data) => {
				try {
					set({ isLoading: true, error: null });
					const response = await fetch(`${API_URL}/register`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(data),
					});

					if (!response.ok) {
						const error = await response.json();
						throw new Error(error.message || 'Registration failed');
					}

					const responseData = await response.json();
					set({
						user: responseData.user,
						token: responseData.token,
						isAuthenticated: true,
						isLoading: false,
					});
				} catch (error) {
					set({
						error:
							error instanceof Error ? error.message : 'Failed to register',
						isLoading: false,
					});
					throw error;
				}
			},

			logout: () => {
				set({ user: null, token: null, error: null, isAuthenticated: false });
			},

			requestPasswordReset: async (email: string) => {
				try {
					set({ isLoading: true, error: null });
					const response = await fetch(`${API_URL}/forgot-password`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email }),
					});

					if (!response.ok) {
						const error = await response.json();
						throw new Error(
							error.message || 'Failed to request password reset'
						);
					}

					set({ isLoading: false });
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Failed to request password reset',
						isLoading: false,
					});
					throw error;
				}
			},

			resetPassword: async (token: string, newPassword: string) => {
				try {
					set({ isLoading: true, error: null });
					const response = await fetch(`${API_URL}/reset-password`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ token, newPassword }),
					});

					if (!response.ok) {
						const error = await response.json();
						throw new Error(error.message || 'Failed to reset password');
					}

					set({ isLoading: false });
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Failed to reset password',
						isLoading: false,
					});
					throw error;
				}
			},
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
