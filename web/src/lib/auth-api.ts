import { User, UserRole } from '@/store/auth-store';

interface AuthResponse {
	user: {
		id: string;
		email: string;
		name: string;
		role: UserRole;
		permissions: string[];
	};
	token: string;
}

class AuthApi {
	private baseUrl = '/api/auth';

	async login(email: string, password: string): Promise<AuthResponse> {
		const response = await fetch(`${this.baseUrl}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Login failed');
		}

		return response.json();
	}

	async register(data: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}): Promise<AuthResponse> {
		const response = await fetch(`${this.baseUrl}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Registration failed');
		}

		return response.json();
	}

	async requestPasswordReset(email: string): Promise<void> {
		const response = await fetch(`${this.baseUrl}/forgot-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to request password reset');
		}
	}

	async resetPassword(token: string, newPassword: string): Promise<void> {
		const response = await fetch(`${this.baseUrl}/reset-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, newPassword }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to reset password');
		}
	}
}

export const authApi = new AuthApi();
