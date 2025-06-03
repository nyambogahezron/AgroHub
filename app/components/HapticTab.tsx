import { Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface HapticTabProps {
	onPress: () => void;
	children: React.ReactNode;
	style?: any;
}

export function HapticTab({ onPress, children, style }: HapticTabProps) {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handlePressIn = () => {
		scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	const handlePressOut = () => {
		scale.value = withSpring(1, { damping: 15, stiffness: 150 });
	};

	return (
		<AnimatedPressable
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={[animatedStyle, style]}
		>
			{children}
		</AnimatedPressable>
	);
}
