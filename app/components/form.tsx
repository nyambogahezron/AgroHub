import { View } from 'react-native';

interface FormProps {
	children: React.ReactNode;
	[key: string]: any;
}

export function Form({ children, ...props }: FormProps) {
	return <View {...props}>{children}</View>;
}
