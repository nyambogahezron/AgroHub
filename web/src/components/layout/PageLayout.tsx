import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function PageLayout() {
	return (
		<div className='flex h-screen bg-background'>
			<Sidebar />
			<main className='flex-1 overflow-auto p-4 md:p-6 lg:p-8'>
				{<Outlet />}
			</main>
		</div>
	);
}
