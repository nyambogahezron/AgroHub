import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
	return (
		<ScrollView className='flex-1 bg-background'>
			{/* Hero Section */}
			<View className='p-4 bg-primary'>
				<Text className='text-3xl font-bold text-white mb-2'>
					About AgroHub
				</Text>
				<Text className='text-white/90 text-lg'>
					Revolutionizing Agricultural Commerce
				</Text>
			</View>

			{/* Mission Section */}
			<View className='p-4'>
				<Text className='text-2xl font-bold text-text mb-4'>Our Mission</Text>
				<Text className='text-text-secondary text-base leading-relaxed'>
					AgroHub is dedicated to transforming agricultural commerce by
					connecting farmers directly with buyers, providing powerful analytics
					tools, and fostering sustainable farming practices. We believe in
					creating a more efficient, transparent, and profitable agricultural
					ecosystem for everyone involved.
				</Text>
			</View>

			{/* Features Section */}
			<View className='p-4 bg-surface'>
				<Text className='text-2xl font-bold text-text mb-4'>Key Features</Text>
				<View className='space-y-4'>
					<FeatureCard
						icon='cart'
						title='Direct Marketplace'
						description='Connect directly with buyers and sellers without intermediaries'
					/>
					<FeatureCard
						icon='bar-chart'
						title='Price Analytics'
						description='Track and analyze price trends across regions and seasons'
					/>
					<FeatureCard
						icon='checkmark-circle'
						title='Quality Verification'
						description='Verified products with detailed quality information'
					/>
					<FeatureCard
						icon='calendar'
						title='Seasonal Insights'
						description='Understand seasonal variations and plan accordingly'
					/>
					<FeatureCard
						icon='shield-checkmark'
						title='Secure Transactions'
						description='Safe and transparent payment processing'
					/>
					<FeatureCard
						icon='document-text'
						title='Market Reports'
						description='Downloadable market reports and analytics'
					/>
				</View>
			</View>

			{/* Contact Section */}
			<View className='p-4'>
				<Text className='text-2xl font-bold text-text mb-4'>Contact Us</Text>
				<View className='space-y-4'>
					<ContactItem icon='mail' title='Email' value='support@agrohub.com' />
					<ContactItem icon='call' title='Phone' value='+1 (555) 123-4567' />
					<ContactItem
						icon='location'
						title='Address'
						value='123 Agriculture Street, Farming City, FC 12345'
					/>
				</View>
			</View>
		</ScrollView>
	);
}

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
		<View className='bg-background p-4 rounded-lg'>
			<Ionicons name={icon as any} size={24} color='#4CAF50' />
			<Text className='text-lg font-semibold text-text mt-2'>{title}</Text>
			<Text className='text-text-secondary mt-1'>{description}</Text>
		</View>
	);
}

function ContactItem({
	icon,
	title,
	value,
}: {
	icon: string;
	title: string;
	value: string;
}) {
	return (
		<View className='flex-row items-center bg-surface p-4 rounded-lg'>
			<Ionicons name={icon as any} size={24} color='#4CAF50' />
			<View className='ml-4'>
				<Text className='font-semibold text-text'>{title}</Text>
				<Text className='text-text-secondary'>{value}</Text>
			</View>
		</View>
	);
}
