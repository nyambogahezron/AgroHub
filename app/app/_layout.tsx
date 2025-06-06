import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import './global.css';
import Animated, { FadeIn } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		// Add your custom fonts
	});

	const colorScheme = useColorScheme();

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Animated.View
			entering={FadeIn.duration(800).delay(200)}
			style={{ flex: 1 }}
		>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
					},
					headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				<Stack.Screen
					name='(home)'
					options={{
						headerShown: false,
						animation: 'fade',
					}}
				/>
				<Stack.Screen
					name='(auth)'
					options={{
						headerShown: false,
						animation: 'fade',
					}}
				/>
			</Stack>
		</Animated.View>
	);
}
