import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#4CAF50',
				tabBarInactiveTintColor: colorScheme === 'dark' ? '#666' : '#999',
				tabBarStyle: {
					backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='home' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='marketplace'
				options={{
					title: 'Marketplace',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='cart' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='dashboard'
				options={{
					title: 'Dashboard',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='stats-chart' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='person' size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
