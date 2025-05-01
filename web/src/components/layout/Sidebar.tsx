import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Home,
	Package,
	Users,
	TrendingUp,
	Menu,
	X,
	Sprout,
	DollarSign,
	Settings,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard', icon: Home },
	{ href: '/dashboard/expenses', label: 'Expenses', icon: DollarSign },
	{ href: '/dashboard/yields', label: 'Yields', icon: Sprout },
	{ href: '/dashboard/labor', label: 'Labor', icon: Users },
	{ href: '/dashboard/inventory', label: 'Inventory', icon: Package },
	{ href: '/dashboard/market', label: 'Market', icon: TrendingUp },
	{ href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
	const location = useLocation();
	const isMobile = useIsMobile();
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => setIsOpen(!isOpen);

	return (
		<>
			{/* Mobile menu button */}
			{isMobile && (
				<Button
					variant='ghost'
					size='icon'
					className='fixed top-4 left-4 z-50'
					onClick={toggleSidebar}
				>
					{isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
				</Button>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					'h-screen bg-sidebar flex flex-col border-r transition-all duration-300',
					isMobile
						? isOpen
							? 'fixed inset-y-0 left-0 w-64 z-40 shadow-xl'
							: 'fixed inset-y-0 -left-64 w-64 z-40'
						: 'w-64 sticky top-0'
				)}
			>
				<div className='flex items-center h-16 px-4 border-b'>
					<Link
						to='/'
						className='flex items-center gap-2 font-semibold text-lg'
					>
						<Sprout className='h-6 w-6 text-farm-green-dark' />
						<span>AgroHub</span>
					</Link>
				</div>

				<nav className='flex-1 overflow-auto p-3 pt-5'>
					<ul className='space-y-2'>
						{navItems.map((item) => {
							const isActive = location.pathname === item.href;
							const Icon = item.icon;

							return (
								<li key={item.href}>
									<Link
										to={item.href}
										className={cn(
											'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
											isActive
												? 'bg-primary text-primary-foreground'
												: 'hover:bg-secondary hover:text-secondary-foreground'
										)}
										onClick={isMobile ? () => setIsOpen(false) : undefined}
									>
										<Icon className='h-4 w-4' />
										<span>{item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className='p-4 border-t'>
					<div className='flex items-center gap-3 px-3 py-2'>
						<div className='rounded-full bg-muted h-8 w-8 flex items-center justify-center'>
							<span className='text-sm font-medium'>FM</span>
						</div>
						<div>
							<p className='text-sm font-medium'>Farm Manager</p>
							<p className='text-xs text-muted-foreground'>Green Valley Farm</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
