import { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';

interface ToastProps {
	title?: string;
	description?: string;
	duration?: number;
	onClose?: () => void;
	className?: string;
}

export function Toast({
	title,
	description,
	duration = 3000,
	onClose,
	className,
}: ToastProps) {
	const [opacity] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.delay(duration),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start(() => {
			onClose?.();
		});
	}, [duration, onClose]);

	return (
		<Animated.View
			style={{ opacity }}
			className={cn(
				'pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg border bg-background p-4 shadow-lg',
				className
			)}
		>
			<View className='flex flex-row items-start gap-4'>
				<View className='flex-1'>
					{title && (
						<Text className='mb-1 font-medium leading-none tracking-tight'>
							{title}
						</Text>
					)}
					{description && (
						<Text className='text-sm leading-normal'>{description}</Text>
					)}
				</View>
				<TouchableOpacity
					onPress={onClose}
					className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
				>
					<X className='h-4 w-4' />
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
}
