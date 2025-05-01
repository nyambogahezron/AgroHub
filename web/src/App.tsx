import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import PAGES from './pages';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<PAGES.Home />} />
						<Route path='/marketplace' element={<PAGES.Marketplace />} />
						<Route path='/product/:id' element={<PAGES.ProductDetails />} />
						<Route path='/analytics' element={<PAGES.Analytics />} />
						<Route path='/dashboard' element={<PageLayout />}>
							<Route index element={<PAGES.Dashboard />} />
							<Route path='expenses' element={<PAGES.Expenses />} />
							<Route path='yields' element={<PAGES.Yields />} />
							<Route path='labor' element={<PAGES.Labor />} />
							<Route path='inventory' element={<PAGES.Inventory />} />
							<Route path='market' element={<PAGES.Market />} />
							<Route path='settings' element={<PAGES.Settings />} />
						</Route>

						<Route path='*' element={<PAGES.NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	);
}
