import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react-native';

interface SelectItem {
	label: string;
	value: string;
}

interface SelectProps {
	value?: string;
	onValueChange?: (value: string) => void;
	items: SelectItem[];
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export function Select({
	value,
	onValueChange,
	items,
	placeholder = 'Select an option',
	className,
	disabled = false,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const selectedItem = items.find((item) => item.value === value);

	return (
		<View className={cn('relative', className)}>
			<TouchableOpacity
				onPress={() => !disabled && setIsOpen(true)}
				disabled={disabled}
				className={cn(
					'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					disabled && 'opacity-50'
				)}
			>
				<Text className='text-foreground'>
					{selectedItem ? selectedItem.label : placeholder}
				</Text>
				<ChevronDown size={16} className='text-muted-foreground' />
			</TouchableOpacity>

			<Modal
				visible={isOpen}
				transparent
				animationType='slide'
				onRequestClose={() => setIsOpen(false)}
			>
				<View className='flex-1 justify-end bg-black/50'>
					<View className='bg-background rounded-t-xl p-4'>
						<View className='flex-row justify-between items-center mb-4'>
							<Text className='text-lg font-medium'>Select an option</Text>
							<TouchableOpacity onPress={() => setIsOpen(false)}>
								<Text className='text-primary'>Done</Text>
							</TouchableOpacity>
						</View>
						<FlatList
							data={items}
							keyExtractor={(item) => item.value}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										onValueChange?.(item.value);
										setIsOpen(false);
									}}
									className={cn(
										'p-3 rounded-md',
										value === item.value && 'bg-accent'
									)}
								>
									<Text
										className={cn(
											'text-foreground',
											value === item.value && 'text-accent-foreground'
										)}
									>
										{item.label}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}
