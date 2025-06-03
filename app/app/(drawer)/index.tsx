import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
	return (
		<ScrollView className='flex-1 bg-background'>
			{/* Hero Section */}
			<View className='p-4 bg-primary'>
				<Text className='text-3xl font-bold text-white mb-2'>
					Welcome to AgroHub
				</Text>
				<Text className='text-white/90 text-lg'>Your farming companion</Text>
			</View>

			{/* Features Section */}
			<View className='p-4'>
				<Text className='text-2xl font-bold text-text mb-4'>Features</Text>
				<View className='space-y-4'>
					<FeatureCard
						icon='leaf'
						title='Smart Farming'
						description='Access modern farming techniques and best practices'
					/>
					<FeatureCard
						icon='cart'
						title='Marketplace'
						description='Buy and sell agricultural products'
					/>
					<FeatureCard
						icon='stats-chart'
						title='Analytics'
						description="Track your farm's performance"
					/>
				</View>
			</View>

			{/* Statistics Section */}
			<View className='p-4 bg-surface'>
				<Text className='text-2xl font-bold text-text mb-4'>Statistics</Text>
				<View className='flex-row flex-wrap justify-between'>
					<StatCard number='1000+' label='Farmers' />
					<StatCard number='500+' label='Products' />
					<StatCard number='98%' label='Satisfaction' />
				</View>
			</View>

			{/* CTA Section */}
			<View className='p-4'>
				<View className='bg-primary p-6 rounded-lg'>
					<Text className='text-2xl font-bold text-white mb-2'>
						Start Your Journey
					</Text>
					<Text className='text-white/90 mb-4'>
						Join our community of farmers and buyers today
					</Text>
					<Link href='/register' asChild>
						<TouchableOpacity className='bg-white py-3 rounded-lg'>
							<Text className='text-primary text-center font-semibold'>
								Get Started
							</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
}

// Helper Components
function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: string;
	title: string;
	description: string;
}) {
	return (
		<View className='bg-surface p-4 rounded-lg'>
			<Ionicons name={icon as any} size={24} color='#4CAF50' />
			<Text className='text-lg font-semibold text-text mt-2'>{title}</Text>
			<Text className='text-text-secondary mt-1'>{description}</Text>
		</View>
	);
}

function StatCard({ number, label }: { number: string; label: string }) {
	return (
		<View className='w-[48%] bg-background p-4 rounded-lg mb-4'>
			<Text className='text-2xl font-bold text-primary'>{number}</Text>
			<Text className='text-text-secondary'>{label}</Text>
		</View>
	);
}
