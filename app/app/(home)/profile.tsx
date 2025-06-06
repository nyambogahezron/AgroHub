import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, User, Shield } from 'lucide-react-native';

export default function Profile() {
	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View>
					<Text className='text-2xl font-bold tracking-tight'>Profile</Text>
					<Text className='text-muted-foreground'>
						Manage your account settings and preferences.
					</Text>
				</View>

				<Card>
					<View className='p-4 space-y-4'>
						<View className='flex-row items-center space-x-4'>
							<View className='w-16 h-16 rounded-full bg-primary/10 items-center justify-center'>
								<User className='w-8 h-8 text-primary' />
							</View>
							<View>
								<Text className='text-lg font-medium'>John Doe</Text>
								<Text className='text-muted-foreground'>
									john.doe@example.com
								</Text>
							</View>
						</View>

						<View className='space-y-2'>
							<TouchableOpacity className='flex-row items-center space-x-2 p-2 rounded-lg bg-muted/50'>
								<Settings className='w-5 h-5 text-muted-foreground' />
								<Text>Account Settings</Text>
							</TouchableOpacity>

							<TouchableOpacity className='flex-row items-center space-x-2 p-2 rounded-lg bg-muted/50'>
								<Shield className='w-5 h-5 text-muted-foreground' />
								<Text>Privacy & Security</Text>
							</TouchableOpacity>

							<TouchableOpacity className='flex-row items-center space-x-2 p-2 rounded-lg bg-muted/50'>
								<LogOut className='w-5 h-5 text-muted-foreground' />
								<Text>Sign Out</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Card>

				<Card>
					<View className='p-4'>
						<Text className='text-lg font-medium mb-4'>Preferences</Text>
						<View className='space-y-4'>
							<View>
								<Text className='text-sm font-medium mb-1'>Notifications</Text>
								<Text className='text-muted-foreground'>
									Manage your notification preferences
								</Text>
							</View>
							<View>
								<Text className='text-sm font-medium mb-1'>Language</Text>
								<Text className='text-muted-foreground'>English (US)</Text>
							</View>
							<View>
								<Text className='text-sm font-medium mb-1'>Theme</Text>
								<Text className='text-muted-foreground'>System Default</Text>
							</View>
						</View>
					</View>
				</Card>

				<Button variant='destructive' className='w-full'>
					Delete Account
				</Button>
			</View>
		</ScrollView>
	);
}
