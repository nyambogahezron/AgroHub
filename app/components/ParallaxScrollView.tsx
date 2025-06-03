import { useRef } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated';

interface ParallaxScrollViewProps {
	headerImage: React.ReactNode;
	children: React.ReactNode;
	headerHeight?: number;
}

export function ParallaxScrollView({
	headerImage,
	children,
	headerHeight = 300,
}: ParallaxScrollViewProps) {
	const { width } = useWindowDimensions();
	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const headerAnimatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(
			scrollY.value,
			[-headerHeight, 0, headerHeight],
			[2, 1, 1],
			Extrapolate.CLAMP
		);

		const translateY = interpolate(
			scrollY.value,
			[-headerHeight, 0, headerHeight],
			[headerHeight / 2, 0, -headerHeight / 2],
			Extrapolate.CLAMP
		);

		const opacity = interpolate(
			scrollY.value,
			[0, headerHeight / 2],
			[1, 0],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ scale }, { translateY }],
			opacity,
		};
	});

	const contentAnimatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			scrollY.value,
			[0, headerHeight],
			[0, -headerHeight / 2],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ translateY }],
		};
	});

	return (
		<View style={styles.container}>
			<Animated.ScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				bounces={true}
				style={styles.scrollView}
			>
				<View style={[styles.header, { height: headerHeight }]}>
					<Animated.View style={[styles.headerImage, headerAnimatedStyle]}>
						{headerImage}
					</Animated.View>
				</View>
				<Animated.View style={[styles.content, contentAnimatedStyle]}>
					{children}
				</Animated.View>
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	header: {
		overflow: 'hidden',
	},
	headerImage: {
		width: '100%',
		height: '100%',
	},
	content: {
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginTop: -20,
		paddingTop: 20,
		minHeight: '100%',
	},
});
