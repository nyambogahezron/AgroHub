import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4'>
				{/* Header Section */}
				<View className='mb-6'>
					<Text className='text-3xl font-bold text-text'>
						Welcome to AgroHub
					</Text>
					<Text className='text-text-secondary mt-2'>
						Your farming companion
					</Text>
				</View>

				{/* Quick Actions */}
				<View className='flex-row flex-wrap justify-between mb-6'>
					<TouchableOpacity className='w-[48%] bg-primary p-4 rounded-lg mb-4'>
						<Ionicons name='cart' size={24} color='white' />
						<Text className='text-white font-semibold mt-2'>Marketplace</Text>
					</TouchableOpacity>

					<TouchableOpacity className='w-[48%] bg-secondary p-4 rounded-lg mb-4'>
						<Ionicons name='stats-chart' size={24} color='white' />
						<Text className='text-white font-semibold mt-2'>Dashboard</Text>
					</TouchableOpacity>

					<TouchableOpacity className='w-[48%] bg-accent p-4 rounded-lg'>
						<Ionicons name='calendar' size={24} color='white' />
						<Text className='text-white font-semibold mt-2'>Schedule</Text>
					</TouchableOpacity>

					<TouchableOpacity className='w-[48%] bg-primary p-4 rounded-lg'>
						<Ionicons name='help-circle' size={24} color='white' />
						<Text className='text-white font-semibold mt-2'>Support</Text>
					</TouchableOpacity>
				</View>

				{/* Recent Activity */}
				<View className='bg-surface p-4 rounded-lg'>
					<Text className='text-xl font-semibold text-text mb-4'>
						Recent Activity
					</Text>
					<View className='space-y-4'>
						{/* Activity items would go here */}
						<Text className='text-text-secondary'>No recent activity</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
