import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withSpring,
	interpolate,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

interface CollapsibleProps {
	title: string;
	children: React.ReactNode;
	initiallyExpanded?: boolean;
}

export function Collapsible({
	title,
	children,
	initiallyExpanded = false,
}: CollapsibleProps) {
	const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
	const animation = useSharedValue(initiallyExpanded ? 1 : 0);
	const rotation = useSharedValue(initiallyExpanded ? 180 : 0);

	const toggleExpand = () => {
		const newValue = !isExpanded;
		setIsExpanded(newValue);
		animation.value = withSpring(newValue ? 1 : 0, {
			damping: 15,
			stiffness: 120,
		});
		rotation.value = withTiming(newValue ? 180 : 0, { duration: 300 });
	};

	const animatedStyle = useAnimatedStyle(() => ({
		height: interpolate(animation.value, [0, 1], [0, 500]),
		opacity: animation.value,
	}));

	const iconStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleExpand} style={styles.header}>
				<ThemedText style={styles.title}>{title}</ThemedText>
				<Animated.View style={iconStyle}>
					<Ionicons name='chevron-down' size={24} color='#666' />
				</Animated.View>
			</TouchableOpacity>
			<Animated.View style={[styles.content, animatedStyle]}>
				{children}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		borderRadius: 8,
		overflow: 'hidden',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: 'rgba(0,0,0,0.05)',
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
	},
	content: {
		overflow: 'hidden',
	},
});
