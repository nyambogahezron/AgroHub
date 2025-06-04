import { View } from 'react-native';
import { cn } from '@/lib/utils';

interface SeparatorProps {
	className?: string;
	orientation?: 'horizontal' | 'vertical';
}

export function Separator({
	className,
	orientation = 'horizontal',
}: SeparatorProps) {
	return (
		<View
			className={cn(
				'shrink-0 bg-border',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				className
			)}
		/>
	);
}
