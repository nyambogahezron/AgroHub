import { TextInput, View } from 'react-native';
import { cn } from '@/lib/utils';

interface InputProps {
	value?: string;
	onChangeText?: (text: string) => void;
	placeholder?: string;
	className?: string;
	keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
	type?: 'text' | 'email' | 'password' | 'number' | 'date';
	disabled?: boolean;
}

export function Input({
	value,
	onChangeText,
	placeholder,
	className,
	keyboardType = 'default',
	type = 'text',
	disabled = false,
}: InputProps) {
	return (
		<View className='relative'>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				editable={!disabled}
				keyboardType={keyboardType}
				secureTextEntry={type === 'password'}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
			/>
		</View>
	);
}
