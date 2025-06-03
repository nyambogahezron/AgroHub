import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';

interface ProtectedRouteProps {
	children: ReactNode;
	requiredPermissions?: string[];
	fallbackUrl?: string;
}

export default function ProtectedRoute({
	children,
	requiredPermissions = [],
	fallbackUrl = '/login',
}: ProtectedRouteProps) {
	const navigate = useNavigate();
	const { isAuthenticated, user, hasPermission, isLoading } = useAuthStore();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate(fallbackUrl, { replace: true });
			return;
		}

		if (!isLoading && isAuthenticated && requiredPermissions.length > 0) {
			const hasAllPermissions = requiredPermissions.every((permission) =>
				hasPermission(permission)
			);

			if (!hasAllPermissions) {
				navigate('/unauthorized', { replace: true });
			}
		}
	}, [
		isAuthenticated,
		isLoading,
		requiredPermissions,
		navigate,
		fallbackUrl,
		hasPermission,
	]);

	if (isLoading) {
		return <div>Loading...</div>; // Replace with your loading component
	}

	if (!isAuthenticated) {
		return null;
	}

	if (
		requiredPermissions.length > 0 &&
		!requiredPermissions.every((permission) => hasPermission(permission))
	) {
		return null;
	}

	return <>{children}</>;
}
