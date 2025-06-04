import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#4CAF50',
				tabBarInactiveTintColor: 'gray',
				tabBarStyle: {
					backgroundColor: 'white',
					borderTopWidth: 1,
					borderTopColor: '#e0e0e0',
					height: 60,
					paddingBottom: 5,
				},
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='home' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='analytics'
				options={{
					title: 'Analytics',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='analytics' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='weather'
				options={{
					title: 'Weather',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='cloud' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='market'
				options={{
					title: 'Market',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='store' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='inventory'
				options={{
					title: 'Inventory',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='inventory' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='labor'
				options={{
					title: 'Labor',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='people' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='yields'
				options={{
					title: 'Yields',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='agriculture' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: 'Settings',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name='settings' size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
