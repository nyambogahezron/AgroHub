import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cn } from '@/lib/utils';

interface TooltipProps {
	content: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<View className='relative'>
			<TouchableOpacity
				onPressIn={() => setIsVisible(true)}
				onPressOut={() => setIsVisible(false)}
			>
				{children}
			</TouchableOpacity>
			{isVisible && (
				<View
					className={cn(
						'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
						className
					)}
				>
					<Text>{content}</Text>
				</View>
			)}
		</View>
	);
}
