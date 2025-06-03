import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

export const Client = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

interface QueryProviderProps {
	children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
	return (
		<QueryClientProvider client={Client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
