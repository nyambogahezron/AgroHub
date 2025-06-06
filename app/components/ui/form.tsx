import { View } from 'react-native';
import { z } from 'zod';

export interface FormProps {
	children: React.ReactNode;
	values: Record<string, any>;
	errors: Record<string, string>;
	setValue: (key: string, value: any) => void;
	watch: (key: string) => any;
	handleSubmit: (fn: (data: any) => void) => () => void;
	reset: () => void;
}

export function Form({
	children,
	values,
	errors,
	setValue,
	watch,
	handleSubmit,
	reset,
}: FormProps) {
	return <View>{children}</View>;
}
