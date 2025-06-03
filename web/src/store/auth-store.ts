import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/lib/auth-api';

export type UserRole = 'admin' | 'farmer' | 'buyer';

export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	permissions: string[];
	avatar?: string;
}

export interface AuthState {
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
	hasPermission: (permission: string) => boolean;
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set, get) => ({
			...initialState,

			login: async (email: string, password: string) => {
				try {
					set({ isLoading: true, error: null });
					const { user, token } = await authApi.login(email, password);
					set({
						user,
						token,
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
					const { user, token } = await authApi.register(data);
					set({
						user,
						token,
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
				set({ user: null, token: null, error: null });
			},

			requestPasswordReset: async (email: string) => {
				try {
					set({ isLoading: true, error: null });
					await authApi.requestPasswordReset(email);
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
					await authApi.resetPassword(token, newPassword);
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

			hasPermission: (permission: string) => {
				const { user } = get();
				return user?.permissions.includes(permission) ?? false;
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token,
			}),
		}
	)
);
