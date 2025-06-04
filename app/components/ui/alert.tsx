import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react-native';

interface AlertProps {
	variant?: 'default' | 'destructive' | 'success' | 'info';
	title?: string;
	children?: React.ReactNode;
	className?: string;
}

export function Alert({
	variant = 'default',
	title,
	children,
	className,
}: AlertProps) {
	const variants = {
		default: 'bg-background border-border',
		destructive: 'bg-destructive/15 text-destructive border-destructive/50',
		success: 'bg-green-50 text-green-800 border-green-200',
		info: 'bg-blue-50 text-blue-800 border-blue-200',
	};

	const icons = {
		default: AlertCircle,
		destructive: XCircle,
		success: CheckCircle,
		info: Info,
	};

	const Icon = icons[variant];

	return (
		<View
			className={cn(
				'relative w-full rounded-lg border p-4',
				variants[variant],
				className
			)}
		>
			<View className='flex-row items-start gap-4'>
				<Icon className='h-5 w-5' />
				<View className='flex-1'>
					{title && (
						<Text className='mb-1 font-medium leading-none tracking-tight'>
							{title}
						</Text>
					)}
					{children && (
						<Text className='text-sm leading-normal'>{children}</Text>
					)}
				</View>
			</View>
		</View>
	);
}
