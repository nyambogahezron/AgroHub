import { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
	const [farmName, setFarmName] = useState('Green Valley Farm');
	const [ownerName, setOwnerName] = useState('Farm Manager');
	const [email, setEmail] = useState('manager@example.com');
	const [notifications, setNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [weatherAlerts, setWeatherAlerts] = useState(true);
	const [marketAlerts, setMarketAlerts] = useState(true);

	const handleSaveProfile = () => {
		console.log('Saving profile...');
		alert('Profile settings saved!');
	};

	const handleSavePreferences = () => {
		console.log('Saving preferences...');
		alert('Preferences saved!');
	};

	return (
		<ScrollView className='flex-1 bg-background'>
			<View className='p-4 space-y-6'>
				<View>
					<Text className='text-2xl font-bold tracking-tight'>Settings</Text>
					<Text className='text-muted-foreground'>
						Manage your account settings and preferences.
					</Text>
				</View>

				<View className='h-px bg-border' />

				<View className='space-y-4'>
					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium'>Profile Settings</Text>
							<Text className='text-sm text-muted-foreground mb-4'>
								Update your farm and personal information.
							</Text>
							<View className='space-y-4'>
								<View>
									<Text className='text-sm font-medium mb-1'>Farm Name</Text>
									<Input
										value={farmName}
										onChangeText={setFarmName}
										placeholder='Enter farm name'
									/>
								</View>
								<View>
									<Text className='text-sm font-medium mb-1'>
										Owner/Manager Name
									</Text>
									<Input
										value={ownerName}
										onChangeText={setOwnerName}
										placeholder='Enter owner name'
									/>
								</View>
								<View>
									<Text className='text-sm font-medium mb-1'>
										Email Address
									</Text>
									<Input
										value={email}
										onChangeText={setEmail}
										placeholder='Enter email'
										keyboardType='email-address'
									/>
								</View>
								<Button onPress={handleSaveProfile}>Save Profile</Button>
							</View>
						</View>
					</Card>

					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium'>Preferences</Text>
							<Text className='text-sm text-muted-foreground mb-4'>
								Customize your application experience.
							</Text>
							<View className='space-y-4'>
								<View className='flex-row items-center justify-between'>
									<Text className='flex-1'>Enable Notifications</Text>
									<Switch
										value={notifications}
										onValueChange={setNotifications}
									/>
								</View>
								<View className='flex-row items-center justify-between'>
									<Text className='flex-1'>Dark Mode</Text>
									<Switch value={darkMode} onValueChange={setDarkMode} />
								</View>
								<View className='flex-row items-center justify-between'>
									<Text className='flex-1'>Weather Alerts</Text>
									<Switch
										value={weatherAlerts}
										onValueChange={setWeatherAlerts}
									/>
								</View>
								<View className='flex-row items-center justify-between'>
									<Text className='flex-1'>Market Price Alerts</Text>
									<Switch
										value={marketAlerts}
										onValueChange={setMarketAlerts}
									/>
								</View>
								<Button onPress={handleSavePreferences}>
									Save Preferences
								</Button>
							</View>
						</View>
					</Card>

					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium'>Data Management</Text>
							<Text className='text-sm text-muted-foreground mb-4'>
								Manage your farm data and account options.
							</Text>
							<View className='space-y-4'>
								<View>
									<Text className='text-lg font-medium mb-2'>Export Data</Text>
									<Text className='text-sm text-muted-foreground mb-4'>
										Download all your farm records and data.
									</Text>
									<Button variant='outline'>Export All Data</Button>
								</View>
								<View>
									<Text className='text-lg font-medium mb-2'>
										Account Actions
									</Text>
									<Text className='text-sm text-muted-foreground mb-4'>
										Manage your account status.
									</Text>
									<View className='flex-row gap-2'>
										<Button variant='outline'>Reset Password</Button>
										<Button variant='destructive'>Delete Account</Button>
									</View>
								</View>
							</View>
						</View>
					</Card>

					<Card>
						<View className='p-4'>
							<Text className='text-lg font-medium'>About AgroHub</Text>
							<Text className='text-sm text-muted-foreground mt-2'>
								Version 1.0.0 (Beta)
							</Text>
							<Text className='text-sm text-muted-foreground mt-2'>
								© 2025 AgroHub - Smart Farm Management Solution
							</Text>
						</View>
					</Card>
				</View>
			</View>
		</ScrollView>
	);
}
