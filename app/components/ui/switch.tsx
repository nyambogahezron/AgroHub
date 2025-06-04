import { Switch as RNSwitch } from 'react-native';
import { cn } from '@/lib/utils';

interface SwitchProps {
	value: boolean;
	onValueChange?: (value: boolean) => void;
	disabled?: boolean;
	className?: string;
}

export function Switch({
	value,
	onValueChange,
	disabled = false,
	className,
}: SwitchProps) {
	return (
		<RNSwitch
			value={value}
			onValueChange={onValueChange}
			disabled={disabled}
			className={cn(
				'h-6 w-11 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
				className
			)}
		/>
	);
}
