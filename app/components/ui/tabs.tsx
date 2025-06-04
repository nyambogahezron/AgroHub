import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { cn } from '@/lib/utils';

interface TabsProps {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	children: React.ReactNode;
	className?: string;
}

interface TabsListProps {
	children: React.ReactNode;
	className?: string;
}

interface TabsTriggerProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

interface TabsContentProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

export function Tabs({
	defaultValue,
	value,
	onValueChange,
	children,
	className,
}: TabsProps) {
	const [selectedValue, setSelectedValue] = useState(defaultValue);

	const handleValueChange = (newValue: string) => {
		setSelectedValue(newValue);
		onValueChange?.(newValue);
	};

	return <View className={cn('w-full', className)}>{children}</View>;
}

export function TabsList({ children, className }: TabsListProps) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className={cn(
				'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
				className
			)}
		>
			{children}
		</ScrollView>
	);
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
	return (
		<TouchableOpacity
			className={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
				className
			)}
		>
			<Text>{children}</Text>
		</TouchableOpacity>
	);
}

export function TabsContent({ value, children, className }: TabsContentProps) {
	return (
		<View
			className={cn(
				'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				className
			)}
		>
			{children}
		</View>
	);
}
