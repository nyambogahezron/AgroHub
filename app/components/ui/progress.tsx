import { View } from 'react-native';
import { cn } from '@/lib/utils';

interface ProgressProps {
	value?: number;
	className?: string;
}

export function Progress({ value = 0, className }: ProgressProps) {
	return (
		<View
			className={cn(
				'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
				className
			)}
		>
			<View
				className='h-full w-full flex-1 bg-primary transition-all'
				style={{ transform: [{ translateX: `${value}%` }] }}
			/>
		</View>
	);
}
