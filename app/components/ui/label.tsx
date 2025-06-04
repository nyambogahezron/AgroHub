import { Text, TouchableOpacity } from 'react-native';
import { cn } from '@/lib/utils';

interface LabelProps {
	children: React.ReactNode;
	className?: string;
	onPress?: () => void;
}

export function Label({ children, className, onPress }: LabelProps) {
	const Component = onPress ? TouchableOpacity : Text;

	return (
		<Component
			className={cn(
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				className
			)}
			onPress={onPress}
		>
			{children}
		</Component>
	);
}
