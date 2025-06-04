import { TextInput, View } from 'react-native';
import { cn } from '@/lib/utils';

interface TextareaProps {
	value?: string;
	onChangeText?: (text: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export function Textarea({
	value,
	onChangeText,
	placeholder,
	className,
	disabled = false,
}: TextareaProps) {
	return (
		<View className='relative'>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				multiline
				numberOfLines={4}
				editable={!disabled}
				className={cn(
					'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
			/>
		</View>
	);
}
