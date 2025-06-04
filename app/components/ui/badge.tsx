import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface BadgeProps {
	variant?: 'default' | 'secondary' | 'destructive' | 'outline';
	children: React.ReactNode;
	className?: string;
}

export function Badge({
	variant = 'default',
	children,
	className,
}: BadgeProps) {
	const variants = {
		default: 'bg-primary text-primary-foreground hover:bg-primary/80',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
		destructive:
			'bg-destructive text-destructive-foreground hover:bg-destructive/80',
		outline:
			'text-foreground border border-input hover:bg-accent hover:text-accent-foreground',
	};

	return (
		<View
			className={cn(
				'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
				variants[variant],
				className
			)}
		>
			<Text className='text-xs font-semibold'>{children}</Text>
		</View>
	);
}
