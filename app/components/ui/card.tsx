import { View } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

export function Card({ children, className }: CardProps) {
	return (
		<View
			className={cn(
				'rounded-lg border border-border bg-card p-4 shadow-sm',
				className
			)}
		>
			{children}
		</View>
	);
}
