import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DrawerIconProps = {
	color: string;
	size: number;
};

export default function DrawerLayout() {
	const colorScheme = useColorScheme();

	return (
		<Drawer
			screenOptions={{
				headerStyle: {
					backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
				},
				headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
				drawerStyle: {
					backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
				},
				drawerActiveTintColor: '#4CAF50',
				drawerInactiveTintColor: colorScheme === 'dark' ? '#666' : '#999',
			}}
		>
			<Drawer.Screen
				name='index'
				options={{
					title: 'Home',
					drawerIcon: ({ color, size }: DrawerIconProps) => (
						<Ionicons name='home' size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name='marketplace'
				options={{
					title: 'Marketplace',
					drawerIcon: ({ color, size }: DrawerIconProps) => (
						<Ionicons name='cart' size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name='analytics'
				options={{
					title: 'Analytics',
					drawerIcon: ({ color, size }: DrawerIconProps) => (
						<Ionicons name='bar-chart' size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name='dashboard'
				options={{
					title: 'Dashboard',
					drawerIcon: ({ color, size }: DrawerIconProps) => (
						<Ionicons name='stats-chart' size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name='about'
				options={{
					title: 'About',
					drawerIcon: ({ color, size }: DrawerIconProps) => (
						<Ionicons name='information-circle' size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name='profile'
				options={{
					title: 'Profile',
					drawerIcon: ({ color, size }: DrawerIconProps) => (
						<Ionicons name='person' size={size} color={color} />
					),
				}}
			/>
		</Drawer>
	);
}
