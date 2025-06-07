import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function ProductsLayout() {
	return (
		<Stack>
			<Stack.Screen name='cart' options={{ title: 'Cart' }} />
			<Stack.Screen name='checkout' options={{ title: 'Checkout' }} />
			<Stack.Screen name='[id]' options={{ title: 'Product' }} />
		</Stack>
	);
}
