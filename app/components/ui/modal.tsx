import { View, Text, Modal as RNModal, TouchableOpacity } from 'react-native';

interface ModalProps {
	visible: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export function Modal({ visible, onClose, title, children }: ModalProps) {
	return (
		<RNModal
			visible={visible}
			transparent
			animationType='slide'
			onRequestClose={onClose}
		>
			<View className='flex-1 justify-center items-center bg-black/50'>
				<View className='bg-background w-[90%] max-w-md rounded-lg p-6'>
					<View className='flex-row justify-between items-center mb-4'>
						<Text className='text-xl font-bold'>{title}</Text>
						<TouchableOpacity onPress={onClose}>
							<Text className='text-muted-foreground'>✕</Text>
						</TouchableOpacity>
					</View>
					{children}
				</View>
			</View>
		</RNModal>
	);
}
